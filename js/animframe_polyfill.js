(function() {
    var b = 0;
    var c = ["webkit", "moz"];
    for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
        window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(g) {
            var d = new Date().getTime();
            var e = Math.max(0, 16 - (d - b));
            var f = window.setTimeout(function() {
                g(d + e);
            }, e);
            b = d + e;
            return f;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(d) {
            clearTimeout(d);
        };
    }
}());
