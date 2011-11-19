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
        paramsString = 'data=' + objToString( data );
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