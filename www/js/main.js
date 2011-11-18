// �������� ����������� �����������.
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
	var e = isValidForm(form);
	
	dumpProps(e);
	
	if( isValidEmail( form.email.value) ) {
	//	alert('���');
	} else {
	//	alert('���');
	}
}