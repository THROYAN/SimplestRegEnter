// Перечень стандартных валидаторов.
var validators = {
    'required': { // поле обязательно для заполнения
        isValid: function( e ) {
            return e.value != null && e.value.length > 0;
        },
        defErrorMessage: trans('Field can\'t be empty')
    },
    'email': { // поле является email адресом
        isValid: function( e ) {
            // e.value = e.value.replace(/^\s+|\s+$/g, ''); // удаляем пробелы
            return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(e.value);
        },
        defErrorMessage: trans('Invalid email address')
    },
    'minLength': { // минимальная допустимая длина
        isValid: function( e, minLength ) {
            return e.value.length >= parseInt( minLength );
        },
        defErrorMessage: trans('Minimum possible length is {0}')
    },
    'maxLength': { // максимально допустимая длина
        isValid: function( e, maxLength ) {
            return e.value.length <= parseInt( maxLength );
        },
        defErrorMessage: trans('Maximum possible length is {0}')
    },
    'startsWithAlpha': { // поле начинается с буквы
        isValid: function( e ) {
            return (/^[a-z]+/i).test(e.value);
        },
        defErrorMessage: trans('This field must starts with alpha')
    },
    'equals': { // указывает, что поле должно быть равно другому полю в этой же форме
        isValid: function( e, otherField ) {
            return e.value == e.form.elements[otherField].value;
        },
        defErrorMessage: trans('Value must be equals with \'{0}\' field')
    },
    'isMonthDay': { // проверка на правильное количество дней в соответствующем месяце
                    // месяц выбирается с помощью select, начиная со 2 элемента
        isValid: function( e, monthField ) {
                // количество дней должно соотвествовать выбранному месяцу
            return (e.value <= monthes[e.form.elements[monthField].selectedIndex - 1] && e.value >= 0) ||
                // либо может быть не выбран ниодин месяц и день
                (e.form.elements[monthField].selectedIndex == 0 && e.value == '');
        },
        defErrorMessage: trans('Invalid days count at this month')
    },
    'isImage': { // проверка расширения файла на расширения допустимых изображений
        isValid: function( e ) {
            // либо картинка, либо ничего
            // чтобы картинка точно была, необходимо еще использовать unique
            return e.value == null || e.value == '' || (/(\.gif|\.jpg|\.png)$/i).test(e.value);
        },
        defErrorMessage: trans('File is not a valid image file')
    }
}

// заглушка, если вдруг не используется перевод
if( typeof lang == 'undefined' ) {
    trans = function(text) {
        return text;
    }
}

// фукнция для выполнения одного валидатора на элементе.
function validate( e, validator ) {
    var ev = getValidator( e, validator );

    if ( ev != null ) {

        // проверяем валидатор, если он не проходит, то возвращаем сообщение об ошибке.
        if ( !validators[validator].isValid( e, ev.value ) ) {
            return ev.message.format(ev.value);
        }
    }
    return true;
}

// Возвращает параметры валидатора конкретного элемента.
function getValidator( element, validator ) {
    // Допускается валидация в виде addValidator(element, 'minLength', {value = 16, errorMessage = 'Длина должна быть не меньше {0}' });
    // или в виде html аттрибутов.
    var ev = element.getAttribute(validator);
    if (ev == null) {
        ev = element[validator];
    }

    if (ev == null || typeof ev == 'undefined' || (ev == false && typeof ev == 'boolean') ) {

        return null;
    }


    var value = ev;
    if( ev.value != null) {
        value = ev.value;
    }

    // возвращаем либо сообщение об ошибке по-умолчанию,
    // либо то, которое мы указали в методе addValidator
    if( ev.errorMessage != null ) {
        return { value: value, message: ev.errorMessage };
    } else {
        return { value: value, message: validators[validator].defErrorMessage };
    }
}

// Добавляет валидатор с параметрами.

function addValidator( element, validator, attrs ) {
    if (attrs == null) {
        attrs = true;
    }
    element[validator] = attrs;

    // Т.к. html аттрибуты более приоритетны,
    // то при вызове этой функции необходимо убрать соотвествующий html аттрибут.
    element.removeAttribute( validator );
}

// Функция перебирает все валидаторы и если она находит у элемента аттрибут с таким же именем, то применяет валидатор.
// После чего возвращает ошибки валидации.
function elementErrors( element ) {
    var errors = [], i = 0;
    for ( var validator in validators ) {
        var e = validate( element, validator );
        if (e != true) {
            errors[i++] = e;
        }
    }
    return errors;
}

// Проверка элемента формы на валидность.
function isValidElement( element ) {
    for ( var validator in validators ) {
        if (validate( element, validator ) != true) {
            return false;
        }
    }
    return true;
}

// Проверка всей формы на валидность.
function isValidForm( form ) {
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (!isValidElement( e )) {
            return false;
        }
    }
    return true;
}

// Функция, которая возвращаем все ошибки элементов формы.
// Возвращает объект формата:
// {
//  	'elementName1':'errorsArray1',
//		'elementName2':'errorArray2',
//	... }
function formErrors( form ) {
    errors = {};
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i], es = elementErrors( e );
        if (es.length > 0) {
            errors[e.name] = es;
        }
    }
    return errors;
}

var monthes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];