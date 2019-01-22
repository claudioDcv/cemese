exports.parseCookies = (request) => {
    var list = {},
        rc = request.headers.cookie;
        // console.log(request.headers)
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}