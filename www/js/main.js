// �������� ����������� �����������.
var validators = {
	'email': {
		isValid: function( email ) {
			return isValidEmail( email );
		},
		defErrorMessage: 'Invalid email address'
	}
	'minLength': {
		isValid: function( text, minLength ) {
			return text.length >= minLength;
		},
		defErrorMessage: 'Minimum possible length is {0}'
	}
}

function isValid( element ) {
	for ( var validator in validators ) {
		var ev = element[validator];
		if ( ev != null ) {
			if ( !validators[validator].isValid(element) ) {
				return ev.errorMessage != null
					? ev.errorMessage.format( ev.value )
					: validators[validator].defErrorMessage( ev );
			}
		}
	}
}

// ��������� ������� ��������� ������������ ��������� ��������.
function refreshPositions() {
	placeTopBar(); // �������� ������� �������� ������.
	toCenter( 'enter-dialog' ); // ���������� �������
	toCenter( 'reg-dialog' );   // ����� � �����������
	
	window.setTimeout("refreshPositions()", 100); // ��������� ������ 0.1 �������
}

// ������� �� Enter(����)
function enter() {
	hide('reg-dialog');
	toggle('enter-dialog');
}

// ������� �� Register(�����������)
function reg() {
	hide('enter-dialog');
	toggle('reg-dialog');
}

// �������� �� ������������ ����� ����� ��������������� �����.
function checkRegFields() {
	
	var form = $('reg-form');
	
	alert(form.email.value);
	
	if( isValidEmail( form.email.value) ) {
		alert('���');
	} else {
		alert('���');
	}
}