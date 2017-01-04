var Cookie = require('/common/js_widget/cookie.js');
var Storage = require('/common/js_widget/storage.js');
var Uuid = require('/common/js_widget/uuid.js');

var storage = new Storage('tracker');
var logTracker = window.dm.logTracker ? window.dm.logTracker  : {};

var urlParams = parseQueryString(window.location.search);
var server   = 'analytics.doumi.com';
var cookieDomain = '.doumi.com';
var dmch     = $('head').data('dmch') || logTracker.dmch || '-';
var sid      = getSessionId() || '-';
var ifid     = Cookie.get('ifid') || getIfid() || '-';
//var caInfo   = $('head').data('cainfo') || getCaInfo() || Cookie.get('cainfo') || {};
var caInfo   = getCaInfo() || {};
//var userId   = userInfo.user_id;
var userId   = getUserID();
var ua       = getUaInfo();
var refer    = window.dm.referInfo || (document.referrer ? encodeURIComponent(document.referrer) : '-');
var caName   = encodeURIComponent(caInfo.ca_name || '-');
var caSource = encodeURIComponent(caInfo.ca_source || '-');
var caFrom = encodeURIComponent(caInfo.ca_from || '-');
var caKw     = encodeURIComponent(caInfo.ca_kw || '-');
var caId     = encodeURIComponent(caInfo.ca_id || '-');
var caN     = encodeURIComponent(caInfo.ca_n || '-');
var caS     = encodeURIComponent(caInfo.ca_s || '-');
var caI     = encodeURIComponent(caInfo.ca_i || '-');


function getCity() {
    return Cookie.get('i_citydomain') || '-';
}

function getFrom() {
    return Cookie.get('dm_fm') || '-';
}

function getCampaign() {
    return Cookie.get('dm_ca_campaign') || '-';
}

function getUuid () {

    var uuid = Cookie.get('dm_uuid');

    if (!uuid) {
        uuid = storage.get('dm_uuid');
    }else{
        storage.set('dm_uuid', uuid);
    }

    //setCookie 1 years
    if (!uuid) {
        //generateUUIDV4
        uuid = Uuid.generateUUIDV4();

        Cookie.set('dm_uuid', uuid, {
            expires: 1*365*8640,
            path: '/',
            domain: cookieDomain
        });
        storage.set('dm_uuid', uuid);
    }else{
        storage.set('dm_uuid', uuid);
    }
    return uuid || '-';
}


function getIfid () {
    return urlParams.ifid;
}

function getCaInfo () {
    //url parse
    var ca_source = urlParams.ca_source || '-';
    var ca_from = urlParams.ca_from || '-';
    var ca_name = urlParams.ca_name || '-';
    var ca_kw = urlParams.ca_kw || '-';
    var ca_id = urlParams.ca_id || '-';
    var ca_n = urlParams.ca_n || '-';
    var ca_s = urlParams.ca_s || '-';
    var ca_i = urlParams.ca_s || '-';

    var cainfo = {};
    if(ca_source && ca_name){
        //setcookie
        cainfo = {
            ca_source: ca_source,
            ca_from: ca_from,
            ca_name: ca_name,
            ca_kw: ca_kw,
            ca_id: ca_id,
            ca_n: ca_n,
            ca_s: ca_s,
            ca_i: ca_i
        };

    }
    return cainfo;
}

function parseQueryString (query) {
    return query.replace(/^\?/, '')
        .split('&')
        .map(function (pair) {
            return pair.split('=');
        })
        .reduce(function (obj, pair) {
            if (pair[0].trim()) {
                obj[pair[0]] = pair[1];
            }

            return obj;
        }, {});
}

function guid(){
    var d1 = new Date(), time=d1.getTime(), d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0);
    return (time - d2.getTime()) * 1000 + parseInt(Math.random()*(9999-1000+1)+1000, 10);
}

/*
 function _dm_parse(s) {
 var _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
 _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
 _VALUES  = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
 _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,
 _UNSAFE = /[^\],:{}\s]/,
 _escapeException = function (c) {
 return '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
 };
 s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);

 if (!_UNSAFE.test(s.replace(_ESCAPES,'@').
 replace(_VALUES,']').
 replace(_BRACKETS,''))) {

 return eval('(' + s + ')');
 }

 throw new SyntaxError('JSON.parse');
 }
 */

/**
 * 将json字符串解析为js对象
 *
 * @method GJ.jsonDecode
 * @param {string} jsonString 要解析的字符串
 * @return {object} 返回解析出来的js对象
 * @example
 * <script type="text/javascript">
 * GJ.use('json', function(){
 *     var obj = GJ.jsonDecode('{"key1":"val1","key2":"val2"}');
 * });
 * </script>
 */
/*
 function _DM_jsonDecode(s) {
 if(typeof s !== 'string'){
 s += '';
 }
 return _dm_parse(s);
 }
 */
function _dm_getCookie(name) {
    try {
        var cookie = Cookie.get('_gl_tracker'), ret = cookie ? JSON.parse(decodeURIComponent(cookie)) : {};
        return name ? (ret[name] || null) : ret;
    }
    catch (e){
        return null;
    }
}

function _dm_setCookie(name, value) {
    var cookie = _dm_getCookie();
    cookie[name] = value;
    var d = encodeURIComponent(JSON.stringify(cookie));
    Cookie.set('_gl_tracker', d, {domain: cookieDomain});
}

function getSessionId(){
    var sessionId = _dm_getCookie('sid');
    if (!sessionId) {
        sessionId = guid();
        _dm_setCookie('sid', sessionId);
        //isLanding = true;
    }
    return sessionId;
}

function getUserID() {
    //userInfo = JSON.parse(Cookie.get('dm_userinfo') || '{}');
    return Cookie.get('dm_userinfo') || '-';
}

function getUaInfo () {
    var ua = window.navigator.userAgent || '';
    var match = ua.match(/Mozilla\/5.0 \((.*)\) AppleWebKit(.*?) .*like Gecko\)([\S]*) (.*) Safari.*/);
    var device, os;

    if (!match || !match[1]) {
        return 'UNKNOW ' + ua;
    }
    try {
        if (/like Mac OS X/.test(match[1])) {
            os = 'iOS ' + ((match[1].match(/([\d_]*)* like Mac OS X/) || [])[1] || '');
        } else if (/Android/.test(match[1])) {
            os = (match[1].match(/Android.*?;/) || [])[0];
        } else {
            os = 'unknow';
        }

        device = (match[1].match(/^(iPad[^;]*|iPhone[^;]*|iPod[^;]*)/) || match[1].match('.*;(.*)') || [])[1];
        device = device ? device.trim() : '';

        ua = [
            'device:' + device,
            'os:' + os,
            'webkit:' + (match[2] || '').replace('/', ''),
            'browser:' + match[4],
            'lang:' + (window.navigator.language || window.navigator.browserLanguage)
        ].join('|');
        return ua;
    } catch (ex) {
        return 'UNKNOW ' + ua;
    }
}

exports.listen = function () {
    $('body').on('tap', '[data-dmalog]', function (e) {
        var dmalog = $(e.currentTarget).attr('data-dmalog') || '';
        //var match;
        //if ((match = /^(\d*)$/.exec(dmalog.split('@')[0])) && match[1].substr(-2)[0] === '1') {
        //exports.send(dmalog.replace(/\d{8}($|@)/, '00000010$1'));
        //} else if (dmalog.indexOf('atype=click') !== -1) {
        if (dmalog.indexOf('atype=click') !== -1 || dmalog.indexOf('atype=show|click') !== -1) {
            exports.send(dmalog);
        }
    });
};

var showLogCache = {};
exports.sendShow = function() {
    $('[data-dmalog]').each(function() {
        var dmalog = $(this).data('dmalog');
        //var match;
        if (showLogCache[dmalog]) {
            return;
        }

        showLogCache[dmalog] = true;

        //if ((match = /^(\d*)$/.exec(dmalog.split('@')[0])) && match[1].substr(-1)[0] === '1') {
        //exports.send(dmalog.replace(/\d{8}($|@)/, '00000001$1'));
        //} else if (dmalog.indexOf('atype=') !== -1) {
        if (dmalog.indexOf('atype=') !== -1) {
            var arr = dmalog.split('atype=');
            if(arr[1] && arr[1].indexOf('show') !== -1) {
                exports.send(dmalog);
            }
        }
    });
};

exports.send = function (dmalog, cb) {
    var img = new Image();
    var done = false;
    var url = '//' + server + '/wape.gif?';

    /*
     if (dmalog && /^\d*$/.test(dmalog.split('@')[0])) {
     dmalog = 'ge=' + dmalog;
     } else {
     dmalog = 'dmalog=' + dmalog;
     }
     */
    dmalog = 'dmalog=' + dmalog;

    url += [
        'dmch=' + dmch,
        dmalog,
        'city=' + getCity(),
        'from=' + getFrom(),
        'ca_campaign=' + getCampaign(),
        'uuid=' + getUuid(),
        'dmuser=' + userId,
        'sid=' + sid,
        'ca_name=' + caName,
        'ca_source=' + caSource,
        'ca_from=' + caFrom,
        'ca_kw=' + caKw,
        'ca_id=' + caId,
        'ca_n=' + caN,
        'ca_s=' + caS,
        'ca_i=' + caI,
        'refer=' + refer,
        'ua=' + ua,
        'ifid=' + ifid,
        'rnd=' + Math.random()
    ].join('&');

    function callback (err) {
        if (done) {
            return;
        }

        done = true;
        if (cb) {
            cb(err || null);
        }
    }

    img.onload = function () {
        callback();
    };

    img.onerror = function () {
        callback(new Error('network error'));
    };

    setTimeout(function () {
        callback(new Error('timeout'));
    }, 10000);

    img.src = url;
};

exports.psend = function (dmchNew, cb) {
    var img = new Image();
    var done = false;
    var url = '//' + server + '/wapp.gif?';

    dmch = dmchNew || dmch;

    url += [
        'dmch=' + dmch,
        'city=' + getCity(),
        'from=' + getFrom(),
        'ca_campaign=' + getCampaign(),
        'uuid=' + getUuid(),
        'dmuser=' + userId,
        'sid=' + sid,
        'ca_name=' + caName,
        'ca_source=' + caSource,
        'ca_from=' + caFrom,
        'ca_kw=' + caKw,
        'ca_id=' + caId,
        'ca_n=' + caN,
        'ca_s=' + caS,
        'ca_i=' + caI,
        'refer=' + refer,
        'ua=' + ua,
        'ifid=' + ifid,
        'rnd=' + Math.random()
    ].join('&');

    function callback (err) {
        if (done) {
            return;
        }

        done = true;
        if (cb) {
            cb(err || null);
        }
    }

    img.onload = function () {
        callback();
    };

    img.onerror = function () {
        callback(new Error('network error'));
    };

    setTimeout(function () {
        callback(new Error('timeout'));
    }, 10000);

    img.src = url;
};
