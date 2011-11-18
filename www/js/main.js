// Перечень стандартных валидаторов.
var validators = {
	'email': {
		isValid: function( e ) {
			return isValidEmail( e.value );
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
	},
	// фукнция для выполнения одного валидатора на элементе.
	_validate: function( e, validator ) {
		var ev = e.getAttribute(validator);
		
		if ( ev != null ) {
		
			// Допускается валидация в виде addValidator(element, 'minLength', {value = 16, message = 'Длина должна быть не меньше {0}' });
			var value = ev;
			if ( ev.value != null ) {
				value = ev.value;
			}
			
			// проверяем валидатор, если он не проходит, то возвращаем либо сообщение об ошибке по-умолчанию,
			// либо то, которое мы указали в методе addValidator
			if ( !validators[validator].isValid( e, value ) ) {
				return ev.errorMessage != null
					? ev.errorMessage.format( value )
					: validators[validator].defErrorMessage.format( value );
			}
		}
		return true;
	}
}

function addValidator( element, validator, attrs ) {
	element.setAttribute(validator, attrs);
}

// Проверка элемента формы на валидность.
function isValidElement( element ) {
	for ( var validator in validators ) {
		if (validators._validate( element, validator) != true) {
			return false;
		}
	}
	return true;
}

// Функция перебирает все валидаторы и если она находит у элемента аттрибут с таким же именем, то применяет валидатор.
// После чего возвращает ошибки валидации.
function elementErrors( element ) {
	var errors = [], i = 0;
	for ( var validator in validators ) {
		var e = validators._validate( element, validator );
		if (e != true) {
			errors[i++] = e;
		}
	}
	return errors;
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

// Обновляет позиции некоторых динамических элементов страницы.
function refreshPositions() {
	placeTopBar(); // помещаем верхнюю панельку наверх.
	toCenter( $('enter-dialog') ); // центрируем диалоги
	toCenter( $('reg-dialog') );   // входа и регистрации
	
	window.setTimeout("refreshPositions()", 100); // обновляем каждую 0.1 секунды
}

// Свернуть reg диалог и свернуть/показать enter диалог
// Нажатие на Enter(Вход)
function enter() {
	hide($('reg-dialog'));
	toggle($('enter-dialog'));
}

// Свернуть enter диалог и свернуть/показать reg диалог
// Нажатие на Register(Регистрация)
function reg() {
	hide($('enter-dialog'));
	toggle($('reg-dialog'));
}

// Проверка на корректность ввода полей регистрационной формы.
function checkRegFields() {
	
	var form = $('reg-form');
	if (isValidForm(form))
		alert('ya');
		
}