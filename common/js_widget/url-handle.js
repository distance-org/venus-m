/**
* url处理组件
*/
function getParams(url){
    if(url == '') return {};
    var options = {};
    var name,value,i;
    var paramsStart = url.indexOf('?')+1;
    var paramsEnd = url.indexOf('#')==-1?url.length:url.indexOf('#');
    var str = url.slice(paramsStart, paramsEnd);
    var arrtmp = str.split('&');
    for(var i=0 , len = arrtmp.length;i < len;i++){
        var paramCount = arrtmp[i].indexOf('=');
        if(paramCount > 0){
            name = arrtmp[i].substring(0 , paramCount);
            value = arrtmp[i].substr(paramCount + 1);
            try{
                if (value.indexOf('+') > -1) value= value.replace(/\+/g,' ')
                options[name] = decodeURIComponent(value);
            }catch(exp){}
        }
    }
    delete options['frm'];
    return options;
}

function http_build_query (formdata, numeric_prefix, arg_separator) {
    var value, key, tmp = [];

    var _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = "1";
        } else if (val === false) {
            val = "0";
        }
        if (val != null) {
            if(typeof val === "object") {
                for (k in val) {
                    if (val[k] != null) {
                        tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                    }
                }
                return tmp.join(arg_separator);
            } else if (typeof val !== "function") {
                return encodeURIComponent(key) + "=" + encodeURIComponent(val);
            } else {
                throw new Error('There was an error processing for http_build_query().');
            }
        } else {
            return '';
        }
    };

    if (!arg_separator) {
        arg_separator = "&";
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        var query=_http_build_query_helper(key, value, arg_separator);
        if(query !== '') {
            tmp.push(query);
        }
    }

    return tmp.join(arg_separator);
}
exports.buildUrlParam = http_build_query;
exports.getParams = getParams;
exports.getUrlParams = function() {
    return getParams(window.location.search);
}
