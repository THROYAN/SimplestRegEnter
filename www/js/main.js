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
	
	addValidator( form.email, 'email' );
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
	}
		
}