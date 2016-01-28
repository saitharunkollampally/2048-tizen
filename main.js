var startTime;
var checkTime;
var init = function() {
    console.log("init() called");
    document.addEventListener("tizenhwkey", function(b) {
        if (b.keyName == "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (a) {
                console.error("getCurrentApplication(): " + a.message);
            }
        }
    });
};
window.onload = init;

function startTime() {
    var b = new Date();
    var e = b.getHours();
    var a = b.getMinutes();
    var d = b.getSeconds();
    a = checkTime(a);
    d = checkTime(d);
    document.getElementById("divbutton1").innerHTML = "Current time: " + e + ":" + a + ":" + d;
    var c = setTimeout(startTime, 250);
}

function checkTime(a) {
    if (a < 10) {
        a = "0" + a;
    }
    return a;
}
