function getClientWidth()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function placeTopBar() { // �������� ������� #user-panel �� ���� ��������
	var userPanel = 'user-panel';
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

// �������� �� ������ �������
function isHidden( element ) {
	return element.style.display == 'none';
}

// ������ �������
function hide( element ) {
	element.style.display = 'none';
}
// �������� ������� �������
function show( element ) {
	element.style.display = 'block';
}
// ���������� ������� ��� �������� ������������ �������
function toggle( element ) {
	if (isHidden(element)) {
		show(element);
	} else {
		hide(element);
	}
}

// ������� �������� �������, id, �������� ��������� � �������, � ����� ���������� ������� - rect
// ��-��������� rect - ������� ������� ������.
function toCenter( element, rect ) {
	
	if ( rect == null ) {
		rect = {
			x: 0,
			y: 0,
			width: getClientWidth(),
			height: getClientHeight()
		}
	}

	element.style.left = (rect.x + (rect.width - element.offsetWidth) / 2) + "px";
	element.style.top = (rect.y + (rect.height - element.offsetHeight) / 2) + "px";
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

function popupHint( element, message, className, lifeTime ) {
	if (lifeTime == null) {
		lifeTime = 1000;
	}
	
	var ugolok = {width: 15, height: 10};
	
	// ����� ��� ���������
	var div = document.createElement('div');
	div.id = element.id + "-hint";
	div.className = 'popup-hint';
	div.style.position = 'absolute';
	// ������������� ���������
	div.style.left = ( position(element).x + element.offsetWidth - ugolok.width ) + "px";
	div.style.top = ( position(element).y - ugolok.height ) + "px";
	
	// ����� �����, � ������� ����� ��������� ��������, ��������, ������ ������ (�������)
	var left = document.createElement('span');
	left.id = div.id + "-left";
	left.className = div.className + '-left';
	left.innerHTML = "&nbsp";
	
	// ������ �����, � ������� ����� ��������� ��������, ��������, ����� ������ (�������� �������
	var right = document.createElement('span');
	right.id = div.id + "-right";
	right.className = div.className + '-right';
	right.innerHTML = "&nbsp";
	
	// ������� �����, � ������� ���������� ���� ���������.
	var middle = document.createElement('span');
	middle.id = div.id + "-middle";
	middle.className = div.className + "-middle";
	middle.innerHTML = message;
	
	div.appendChild(left);
	div.appendChild(middle);
	div.appendChild(right);
	
	if (className != null) {
		div.className += " " + className;
	}
	
	var addTo = document.body;
	addTo.appendChild(div);
	
	setTimeout(function(){
		addTo.removeChild(div);
	}, lifeTime);
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
 
function position (element) {
        var p = {x: element.offsetLeft || 0, y:element.offsetTop || 0};
        while (element = element.offsetParent) {
            p.x += element.offsetLeft;
            p.y += element.offsetTop;
        }
        return p;
    }