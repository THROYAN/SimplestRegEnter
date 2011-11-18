// �������� ����������� �����������.
var validators = {
	'email': {
		isValid: function( e ) {
			e.value = e.value.replace(/^\s+|\s+$/g, ''); // ������� �������
			return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(e.value);
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
	'required': {
		isValide: function( e ) {
			return e.value != null && e.value.length > 0;
		},
		defErrorMessage: 'Field can\'t be emplty'
	}
}

// ������� ��� ���������� ������ ���������� �� ��������.
function validate( e, validator ) {
	var ev = getValidator( e, validator );
	
	if ( ev != null ) {
		
		// ��������� ���������, ���� �� �� ��������, �� ���������� ��������� �� ������.
		if ( !validators[validator].isValid( e, ev.value ) ) {
			return ev.message.format(ev.value);
		}
	}
	return true;
}

// ���������� ��������� ���������� ����������� ��������.
function getValidator( element, validator ) {
	// ����������� ��������� � ���� addValidator(element, 'minLength', {value = 16, errorMessage = '����� ������ ���� �� ������ {0}' });
	// ��� � ���� html ����������.
	var ev = element.getAttribute(validator);
	if (ev == null) {
		ev = element[validator];
	}
	
	if (ev == null || typeof ev == 'undefined') {
		return;
	}
	
	var value = ev;
	if( ev.value != null) {
		value = ev.value;
	}
	
	// ���������� ���� ��������� �� ������ ��-���������,
	// ���� ��, ������� �� ������� � ������ addValidator
	if( ev.errorMessage != null ) {
		return { value: value, message: ev.errorMessage };
	} else {
		return { value: value, message: validators[validator].defErrorMessage };
	}
}

// ��������� ��������� � �����������.

function addValidator( element, validator, attrs ) {
	if (attrs == null) {
		attrs = true;
	}
	element[validator] = attrs;
	
	// �.�. html ��������� ����� �����������,
	// �� ��� ������ ���� ������� ���������� ������ �������������� html ��������.
	element.removeAttribute( validator );
}

// ������� ���������� ��� ���������� � ���� ��� ������� � �������� �������� � ����� �� ������, �� ��������� ���������.
// ����� ���� ���������� ������ ���������.
function elementErrors( element ) {
	var errors = [], i = 0;
	for ( var validator in validators ) {
		var e = validate( element, validator );
		if (e != true) {
			errors[i++] = e;
		}
	}
	return errors;
}

// �������� �������� ����� �� ����������.
function isValidElement( element ) {
	for ( var validator in validators ) {
		if (validate( element, validator ) != true) {
			return false;
		}
	}
	return true;
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