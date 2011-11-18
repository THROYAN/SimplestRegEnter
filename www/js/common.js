function getClientWidth()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight()
{
  return document.compatMode=='CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function placeTopBar() { // помещает элемент #user-panel на верх страницы
	userPanel = 'user-panel';
	if (!document.all) {// For Mozilla etc.
		$( userPanel ).style.top = window.pageYOffset + "px";
	} else {// For the IE...
		$( userPanel ).style.top = document.documentElement.scrollTop + "px";
	}
}

// функция возвращает элемент по id
function $( id ) {
	return document.getElementById( id );
}

// скрыть элемент по id
function hide( id ) {
	$( id ).style.visibility = 'hidden';
}
// показать скрытый элемент по id
function show( id ) {
	$( id ).style.visibility = 'visible';
}
// показывает скрытый или скрывает отображаемый элемент по id
function toggle( id ) {
	if ($( id ).style.visibility == 'hidden') {
		$( id ).style.visibility = 'visible';
	} else {
		$( id ).style.visibility = 'hidden';
	}
}

// проверяет email на валидность.
// Возвращает true в случае, если переданный email валиден и наоборот.
function isValidEmail (email)
{
	 email = email.replace(/^\s+|\s+$/g, ''); // удаляем пробелы
	 return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(email);
}

// Функция помещает элемент, id, которого переданно в функцию, в центр квадратной области - rect
// По-умолчанию rect - видимая область экрана.
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

// Добавляет к прототипу String метод format
// Метод аналогичен методу String.Format() в C#
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