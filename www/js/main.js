// ��������� ������� ��������� ������������ ��������� ��������.
function refreshPositions() {
    placeTopBar(); // �������� ������� �������� ������.
    if (!isHidden( $('enter-dialog') )) {
        toCenter( $('enter-dialog') ); // ���������� �������
    }
    if (!isHidden( $('reg-dialog') )) {
        toCenter( $('reg-dialog') );   // ����� � �����������
    }

    window.setTimeout("refreshPositions()", 100); // ��������� ������ 0.1 �������
}

function setValidators() {
    var form = $('reg-form');

    addValidator( form.email, 'email', { errorMessage: '�������� ������ email ������' } );
    addValidator( form.name, 'minLength', { value: 4, errorMessage: '��� ������ ���� �� ������ {0} ��������' });
}

// �������� reg ������ � ��������/�������� enter ������
// ������� �� Enter(����)
function enter() {
    hide($('reg-dialog'));
    toggle($('enter-dialog'));
}

// �������� enter ������ � ��������/�������� reg ������
// ������� �� Register(�����������)
function reg() {
    hide($('enter-dialog'));
    toggle($('reg-dialog'));
}

// �������� �� ������������ ����� ����� ��������������� �����.
function checkRegFields() {

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
                    enter();
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