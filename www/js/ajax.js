// Возвращает новый объект XHR
function newXHR() {
    var xhrObj;
    if (window.XMLHttpRequest) {// IE7+, Firefox, Chrome, Opera, Safari
        xhrObj=new XMLHttpRequest();
    }
    else
    {// IE6, IE5
        try {
            xhrObj=new ActiveXObject("Microsoft.xhrObj");
        } catch(e) { // не поддерживается AJAX
            return null;
        }
    }
    return xhrObj;
}

// Отправка POST запроса
// url - адрес
// data - параметры в виде объекта {`param`: `value`, ... }
// callback - функция-обработчик запроса
// errorCallback - фукнция-обработчик ошибки запроса
function post( url, data, callback, errorCallback, elseUrl ) {
    var xhrObj = newXHR();

    // если не поддерживается ajax, то переходим на саму страницу
    if (xhrObj == null) {

    }

    xhrObj.onreadystatechange = function() {
        if (xhrObj.readyState==4) {
            if (xhrObj.status==200) { // если запрос успешно отправлен

                if (callback != null) {
                    callback( JSONToObj(xhrObj.responseText) );
                }

            } else { // если произошла ошибка

                if (errorCallback != null) {
                    errorCallback( xhrObj.responseText );
                }

            }
        }
    };

    var paramsString = '';
    if (data != null) {
        // переводим параметр data в строку, чтобы передать через post
        paramsString = 'data={0}'.format(objToString( data ));
    }

    xhrObj.open("POST", url, true);
    xhrObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrObj.send( paramsString );
    return paramsString;
}

// переводит объект js в строку, которую потом можно будет декодировать
// с помощью php json_decode.
function objToString( obj ) {
    var s = '';
    if (typeof obj === 'object') { // если это объект, то рекурсивно применяем эту функцию к его свойствам.
        s += '{';
        for (var i in obj) {
            s += '"{0}":{1},'.format(i, objToString(obj[i]));
        }
        // обрезаем последнюю запятую
        s = s.substr(0, s.length - 1);
        s += '}';
    } else { // если это не объект, то просто переводим его в строку.
        if (typeof obj === 'string') { // если строка, то добавляем ковычки.
            var temp_s = (obj.toString() + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0'); // и экранируем слеши
            s = '"{0}"'.format(temp_s);
            //s = '"{0}"'.format(obj.toString());
        } else {
            s = obj.toString();
        }
    }
    return s;
}

function JSONToObj( json ) {

    if (json == null || json == '') {
        return null;
    }

    eval('var res = ' + json);
    return res;
}

function prepareFile( inputElement, callback ) {

    var form = document.createElement('form');
    form.method = 'POST';
    form.id = 'get-file-form';
    form.action = '/system/getfilename.php';
    form.setAttribute('enctype', 'multipart/form-data')
    form.style.display = 'none';

    var tempName = inputElement.name;

    inputElement.name = 'file';
    var parent = inputElement.parentNode;
    parent.removeChild(inputElement);

    form.appendChild(inputElement);

    var frame = document.createElement('iframe');

    frame.id = 'get-file-frame';
    frame.src = 'javascript:false'
    frame.style.display = "none";

    document.body.appendChild(frame);

    var frameBody = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body;
    frameBody.appendChild(form);

    form.submit();
    inputElement.name = tempName;
    form.removeChild(inputElement);
    parent.appendChild(inputElement);

    frame.onload = function() {
        frameBody = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body;
        callback( JSONToObj(frameBody.innerHTML) );
        document.body.removeChild(frame);
    }
}