// Перечень стандартных валидаторов.
var validators = {
    'required': {
        isValid: function( e ) {
            return e.value != null && e.value.length > 0;
        },
        defErrorMessage: 'Field can\'t be empty'
    },
    'email': {
        isValid: function( e ) {
            // e.value = e.value.replace(/^\s+|\s+$/g, ''); // удаляем пробелы
            return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(e.value);
        },
        defErrorMessage: 'Invalid email address'
    },
    'minLength': {
        isValid: function( e, minLength ) {
            return e.value.length >= parseInt( minLength );
        },
        defErrorMessage: 'Minimum possible length is {0}'
    },
    'maxLength': {
        isValid: function( e, maxLength ) {
            return e.value.length <= parseInt( maxLength );
        },
        defErrorMessage: 'Maximum possible length is {0}'
    },
    'startsWithAlpha': {
        isValid: function( e ) {
            return (/^[a-z]+/i).test(e.value);
        },
        defErrorMessage: 'This field must starts with alpha'
    },
    'equals': {
        isValid: function( e, otherField ) {
            return e.value == e.form.elements[otherField].value;
        },
        defErrorMessage: 'Value must be equals with \'{0}\' field'
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

        return;
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