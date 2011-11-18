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