// �������� ����������� �����������.
var validators = {
	'email': {
		isValid: function( e ) {
			return isValidEmail( e.value );
		},
		defErrorMessage: 'Invalid email address'
	},
	'minLength': {
		isValid: function( e, minLength ) {
			return e.value.length >= parseInt( minLength );
		},
		defErrorMessage: 'Minimum possible length is {0}'
	},
	'maxLength': {
		isValid: function( e, maxLength ) {
			return e.value.length <= parseInt( maxLength );
		},
		defErrorMessage: 'Maximum possible length is {0}'
	},
	'startsWithAlpha': {
		isValid: function( e ) {
			return (/^[a-z]+/i).test(e.value);
		},
		defErrorMessage: 'This field must starts with alpha'
	},
	'equals': {
		isValid: function( e, otherField ) {
			return e.value == e.form.elements[otherField].value;
		},
		defErrorMessage: 'Value must be equals with \'{0}\' field'
	},
	// ������� ��� ���������� ������ ���������� �� ��������.
	_validate: function( e, validator ) {
		var ev = e.getAttribute(validator);
		
		if ( ev != null ) {
		
			// ����������� ��������� � ���� addValidator(element, 'minLength', {value = 16, message = '����� ������ ���� �� ������ {0}' });
			var value = ev;
			if ( ev.value != null ) {
				value = ev.value;
			}
			
			// ��������� ���������, ���� �� �� ��������, �� ���������� ���� ��������� �� ������ ��-���������,
			// ���� ��, ������� �� ������� � ������ addValidator
			if ( !validators[validator].isValid( e, value ) ) {
				return ev.errorMessage != null
					? ev.errorMessage.format( value )
					: validators[validator].defErrorMessage.format( value );
			}
		}
		return true;
	}
}

function addValidator( element, validator, attrs ) {
	element.setAttribute(validator, attrs);
}

// �������� �������� ����� �� ����������.
function isValidElement( element ) {
	for ( var validator in validators ) {
		if (validators._validate( element, validator) != true) {
			return false;
		}
	}
	return true;
}

// ������� ���������� ��� ���������� � ���� ��� ������� � �������� �������� � ����� �� ������, �� ��������� ���������.
// ����� ���� ���������� ������ ���������.
function elementErrors( element ) {
	var errors = [], i = 0;
	for ( var validator in validators ) {
		var e = validators._validate( element, validator );
		if (e != true) {
			errors[i++] = e;
		}
	}
	return errors;
}

// �������� ���� ����� �� ����������.
function isValidForm( form ) {
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if (!isValidElement( e )) {
			return false;
		}
	}
	return true;
}

// �������, ������� ���������� ��� ������ ��������� �����.
// ���������� ������ �������: 
// {
//  	'elementName1':'errorsArray1',
//		'elementName2':'errorArray2',
//	... }
function formErrors( form ) {
	errors = {};
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i], es = elementErrors( e );
		if (es.length > 0) {
			errors[e.name] = es;
		}
	}
	return errors;
}

// ��������� ������� ��������� ������������ ��������� ��������.
function refreshPositions() {
	placeTopBar(); // �������� ������� �������� ������.
	toCenter( $('enter-dialog') ); // ���������� �������
	toCenter( $('reg-dialog') );   // ����� � �����������
	
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