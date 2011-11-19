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

    addValidator( form.email, 'email', { errorMessage: 'Неверный формат email адреса' } );
    addValidator( form.name, 'minLength', { value: 4, errorMessage: 'Имя должно быть не короче {0} символов' });
}

// Свернуть reg диалог и свернуть/показать enter диалог
// Нажатие на Enter(Вход)
function enter_click() {
    hide($('reg-dialog'));
    toggle($('enter-dialog'));
}

// Свернуть enter диалог и свернуть/показать reg диалог
// Нажатие на Register(Регистрация)
function reg_click() {
    hide($('enter-dialog'));
    toggle($('reg-dialog'));
}

// Проверка на корректность ввода полей регистрационной формы.
function reg() {

    var form = $('reg-form');
    if (!isValidForm(form)) {
        var errors = formErrors( form );
        for (var e in errors) {
            popupHint( form.elements[e], errors[e][0], 'error-message', 1000 );
        }
    } else {

        var userData = {
            email: form.email.value,
            name: form.name.value,
            password: form.password.value
        };

        post( '/controllers/users.php', {'action': 'reg', 'userData': userData}, function( data ){
            if (data.status == 'succesful') {
                popupHint( $('reg-caption'), data.message);
                setTimeout(function(){
                    form.reset();
                    enter_click();
                }, 1000);
            } else {
                for (var e in data.errors) {
                    popupHint( form.elements[e], data.errors[e][0], 'error-message', 1000 );
                }
            }
        }, function( data ) {
            alert( 'Error connection:' + data );
        });
    }
}

// вход пользователя
function enter() {

    var form = $('enter-form');

    post('/controllers/users.php', {'action': 'enter', 'password': form.password.value, 'email': form.email.value}, function( data ) {
        if (data.status == 'succesful') {
            popupHint( $('enter-caption'), data.message );
            setTimeout(function(){
                    form.reset();
                    hide($('enter-dialog'));
                    window.location.reload();
                }, 1000);
        } else {
            popupHint( form.password, data.message );
        }
    });
}

function exit() {

    post('/controllers/users.php', {'action': 'exit'}, function() {
        window.location.reload();
    });

}