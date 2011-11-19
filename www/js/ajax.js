// ���������� ����� ������ XHR
function newXHR() {
    var xhrObj;
    if (window.XMLHttpRequest) {// IE7+, Firefox, Chrome, Opera, Safari
        xhrObj=new XMLHttpRequest();
    }
    else
    {// IE6, IE5
        try {
            xhrObj=new ActiveXObject("Microsoft.xhrObj");
        } catch(e) { // �� �������������� AJAX
            return null;
        }
    }
    return xhrObj;
}

// �������� POST �������
// url - �����
// data - ��������� � ���� ������� {`param`: `value`, ... }
// callback - �������-���������� �������
// errorCallback - �������-���������� ������ �������
function post( url, data, callback, errorCallback, elseUrl ) {
    var xhrObj = newXHR();

    // ���� �� �������������� ajax, �� ��������� �� ���� ��������
    if (xhrObj == null) {

    }

    xhrObj.onreadystatechange = function() {
        if (xhrObj.readyState==4) {
            if (xhrObj.status==200) { // ���� ������ ������� ���������
                if (callback != null) {
                    callback( JSONToObj(xhrObj.responseText) );
                }
            } else { // ���� ��������� ������
                if (errorCallback != null) {
                    errorCallback( xhrObj.responseText );
                }
            }
        }
    };

    var paramsString = '';
    if (data != null) {
        // ��������� �������� data � ������, ����� �������� ����� post
        paramsString = 'data=' + objToString( data );
    }

    xhrObj.open("POST", url, true);
    xhrObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrObj.send( paramsString );
    return paramsString;
}

// ��������� ������ js � ������, ������� ����� ����� ����� ������������
// � ������� php json_decode.
function objToString( obj ) {
    var s = '';
    if (typeof obj === 'object') { // ���� ��� ������, �� ���������� ��������� ��� ������� � ��� ���������.
        s += '{';
        for (var i in obj) {
            s += '"{0}":{1},'.format(i, objToString(obj[i]));
        }
        // �������� ��������� �������
        s = s.substr(0, s.length - 1);
        s += '}';
    } else { // ���� ��� �� ������, �� ������ ��������� ��� � ������.
        if (typeof obj === 'string') { // ���� ������, �� ��������� �������.
            s = '"{0}"'.format(obj.toString());
        } else {
            s = obj.toString();
        }
    }
    return s;
}

function JSONToObj( json ) {
    eval('var res = ' + json);
    return res;
}