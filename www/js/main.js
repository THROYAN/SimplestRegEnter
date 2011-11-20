// Обновляет позиции некоторых динамических элементов страницы.
function refreshPositions() {
    placeTopBar(); // помещаем верхнюю панельку наверх.
    if (!isHidden( $('enter-dialog') )) {
        toCenter( $('enter-dialog') ); // центрируем диалоги
    }
    if (!isHidden( $('reg-dialog') )) {
        toCenter( $('reg-dialog') );   // входа и регистрации
    }
    if ($('profile-dialog') != null && !isHidden( $('profile-dialog') )) {
        toCenter( $('profile-dialog') );   // и профиля, если он есть
    }

    window.setTimeout("refreshPositions()", 100); // обновляем каждую 0.1 секунды
}

// установка валидаторов
function setValidators() {
    var form = $('reg-form');

    addValidator( form.email, 'email', {errorMessage: 'Неверный формат email адреса'} );
    addValidator( form.name, 'minLength', {value: 4, errorMessage: 'Имя должно быть не короче {0} символов'});
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

// Регистрация
function reg() {

    var form = $('reg-form');

    if (!isValidForm(form)) { // проверка полей формы на валидность
        var errors = formErrors( form );
        for (var e in errors) {
            // вывод по одной ошибке для каждого поля с ошибкой
            popupHint( form.elements[e], errors[e][0], 'error-message', 1000 );
        }
    } else {

        var userData = {
            email: form.email.value,
            name: form.name.value,
            password: form.password.value
        };

        // запрос на регистрацию
        post( '/controllers/users.php', {'action': 'reg', 'userData': userData}, function( data ){
            if (data.status == 'succesful') { // если всё прошло успешно
                popupHint( $('reg-caption'), data.message); // выдаём об этом сообщение
                setTimeout(function(){
                    $('enter-form').email.value = form.email.value;
                    form.reset();
                    enter_click(); // и переходим к входу
                }, 1000);
            } else { // если были ошибки
                for (var e in data.errors) { // то выводим их точно также, как и выше
                    popupHint( form.elements[e], data.errors[e][0], 'error-message', 1000 );
                }
            }
        });
    }
}

// вход пользователя
function enter() {

    var form = $('enter-form');

    if (!isValidForm(form)) { // проверяем форму на валидность
        var errors = formErrors( form );
        for (var e in errors) { // выводим ошибки
            popupHint( form.elements[e], errors[e][0], 'error-message', 1000 );
        }
        return;
    }

    // если форма валидна отправляем запрос на вход
    post('/controllers/users.php', {'action': 'enter', 'password': form.password.value, 'email': form.email.value}, function( data ) {
        if (data.status == 'succesful') { // если всё хорошо
            popupHint( $('enter-caption'), data.message );
            setTimeout(function(){
                    form.reset();
                    hide($('enter-dialog'));
                    window.location.reload(); // обновляем страницу
                }, 1000);
        } else {
            popupHint( form.password, data.message );
        }
    });
}

// выход пользователя
function exit() {

    post('/controllers/users.php', {'action': 'exit'}, function() {
        window.location.reload(); // обновление по выходу
    });

}

function profile_click() {
    dialog = $('profile-dialog')
    toggle(dialog);

    post('/controllers/users.php', {'action': 'profile'}, function(data) {
        if (data.status == 'succesful') {

            dialog.removeChild($('stuff'));

            var table = document.createElement('table');
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = trans('Name') + ":";
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = data.user.name;
            tr.appendChild(td);
            table.appendChild(tr);

            tr = document.createElement('tr');
            td = document.createElement('td');
            td.innerHTML = trans('Email') + ":";
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = data.user.email;
            tr.appendChild(td);
            table.appendChild(tr);

            tr = document.createElement('tr');
            td = document.createElement('td');
            td.innerHTML = trans('Birth') + ":";
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = data.user.birth;
            tr.appendChild(td);
            table.appendChild(tr);


            table.appendChild(tr);

            dialog.appendChild(table);

        } else {
            if ($('stuff') == null) {
                var stuff = document.createElement('span');
                stuff.id = 'stuff'
                dialog.appendChild(stuff);
            }
            $('stuff').innerHTML = trans('User was nor found');
        }
    });
}