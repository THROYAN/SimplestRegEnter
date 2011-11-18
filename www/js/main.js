// Обновляет позиции некоторых динамических элементов страницы.
function refreshPositions() {
	placeTopBar(); // помещаем верхнюю панельку наверх.
	if (!isHidden( $('enter-dialog') )) {
		toCenter( $('enter-dialog') ); // центрируем диалоги
	}
	if (!isHidden( $('reg-dialog') )) {
		toCenter( $('reg-dialog') );   // входа и регистрации
	}
	
	window.setTimeout("refreshPositions()", 100); // обновляем каждую 0.1 секунды
}

function setValidators() {
	var form = $('reg-form');
	
	addValidator( form.email, 'email' );
	addValidator( form.name, 'minLength', { value: 4, errorMessage: 'Имя должно быть не короче {0} символов' });
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
	if (!isValidForm(form)) {
		var errors = formErrors( form );
		for (var e in errors) {
			popupHint( form.elements[e], errors[e][0], 'error-message', 1000 );
		}
	}
		
}