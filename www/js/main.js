// Перечень стандартных валидаторов.
var validators = {
	'email': {
		isValid: function( email ) {
			return isValidEmail( email );
		},
		defErrorMessage: 'Invalid email address'
	},
	'minLength': {
		isValid: function( text, minLength ) {
			return text.length >= minLength;
		},
		defErrorMessage: 'Minimum possible length is {0}'
	},
	'equals': {
		isValid: function( text, otherField ) {
			
		}
	}
}

function isValidElement( element ) {
	for ( var validator in validators ) {
		var ev = element.getAttribute(validator);
		
		if ( ev != null ) {
			if ( !validators[validator].isValid( element.value ) ) {
				return ev.errorMessage != null
					? ev.errorMessage.format( ev.value )
					: validators[validator].defErrorMessage.format( ev );
			}
		}
	}
	return true;
}

function isValidForm( form ) {
	var errors = {};
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		alert(e.name);
		errors[e.name] = isValidElement( e );
	}
	return errors;
}

// Обновляет позиции некоторых динамических элементов страницы.
function refreshPositions() {
	placeTopBar(); // помещаем верхнюю панельку наверх.
	toCenter( 'enter-dialog' ); // центрируем диалоги
	toCenter( 'reg-dialog' );   // входа и регистрации
	
	window.setTimeout("refreshPositions()", 100); // обновляем каждую 0.1 секунды
}

// Нажатие на Enter(Вход)
function enter() {
	hide('reg-dialog');
	toggle('enter-dialog');
}

// Нажатие на Register(Регистрация)
function reg() {
	hide('enter-dialog');
	toggle('reg-dialog');
}

// Проверка на корректность ввода полей регистрационной формы.
function checkRegFields() {
	
	var form = $('reg-form');
	var e = isValidForm(form);
	
	dumpProps(e);
	
	if( isValidEmail( form.email.value) ) {
	//	alert('ага');
	} else {
	//	alert('неа');
	}
}