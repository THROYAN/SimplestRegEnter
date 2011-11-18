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
	if (isValidForm(form))
		alert('ya');
		
}