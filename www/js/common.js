function getClientWidth()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function placeTopBar() { // �������� ������� #user-panel �� ���� ��������
	userPanel = 'user-panel';
	if (!document.all) {// For Mozilla etc.
		$( userPanel ).style.top = window.pageYOffset + "px";
	} else {// For the IE...
		$( userPanel ).style.top = document.documentElement.scrollTop + "px";
	}
}

// ������� ���������� ������� �� id
function $( id ) {
	return document.getElementById( id );
}

// ������ ������� �� id
function hide( id ) {
	$( id ).style.visibility = 'hidden';
}
// �������� ������� ������� �� id
function show( id ) {
	$( id ).style.visibility = 'visible';
}
// ���������� ������� ��� �������� ������������ ������� �� id
function toggle( id ) {
	if ($( id ).style.visibility == 'hidden') {
		$( id ).style.visibility = 'visible';
	} else {
		$( id ).style.visibility = 'hidden';
	}
}

// ��������� email �� ����������.
// ���������� true � ������, ���� ���������� email ������� � ��������.
function isValidEmail (email)
{
	 email = email.replace(/^\s+|\s+$/g, ''); // ������� �������
	 return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
}

// ������� �������� �������, id, �������� ��������� � �������, � ����� ���������� ������� - rect
// ��-��������� rect - ������� ������� ������.
function toCenter( id, rect ) {
	
	if ( rect == null ) {
		rect = {
			x: 0,
			y: 0,
			width: getClientWidth(),
			height: getClientHeight()
		}
	}

	$( id ).style.left = (rect.x + (rect.width - $( id ).offsetWidth) / 2) + "px";
	$( id ).style.top = (rect.y + (rect.height - $( id ).offsetHeight) / 2) + "px";
}

// ��������� � ��������� String ����� format
// ����� ���������� ������ String.Format() � C#
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp( '\\{'+i+'\\}', 'gi' );
        formatted = formatted.replace( regexp, arguments[i] );
    }
    return formatted;
};

function alt( id, message ) {
	var div = document.createElement('div');
	div.id = "";
}

function dumpProps(obj, parent) {
    // Go through all the properties of the passed-in object 
    for (var i in obj) {
       // if a parent (2nd parameter) was passed in, then use that to 
       // build the message. Message includes i (the object's property name) 
       // then the object's property value on a new line 
       if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
       // Display the message. If the user clicks "OK", then continue. If they 
       // click "CANCEL" then quit this level of recursion 
       if (!confirm(msg)) { return; }
       // If this property (i) is an object, then recursively process the object 
       if (typeof obj[i] == "object") { 
          if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
       }
    }
 }