function KeyboardInputManager() {
    this.events = {};
    if (window.navigator.msPointerEnabled) {
        this.eventTouchstart = "MSPointerDown";
        this.eventTouchmove = "MSPointerMove";
        this.eventTouchend = "MSPointerUp";
    } else {
        this.eventTouchstart = "touchstart";
        this.eventTouchmove = "touchmove";
        this.eventTouchend = "touchend";
    }
    this.listen();
}
KeyboardInputManager.prototype.on = function(a, b) {
    if (!this.events[a]) {
        this.events[a] = [];
    }
    this.events[a].push(b);
};
KeyboardInputManager.prototype.emit = function(b, c) {
    var a = this.events[b];
    if (a) {
        a.forEach(function(d) {
            d(c);
        });
    }
};
KeyboardInputManager.prototype.listen = function() {
    var b = this;
    var e = {
        38: 0,
        39: 1,
        40: 2,
        37: 3,
        75: 0,
        76: 1,
        74: 2,
        72: 3,
        87: 0,
        68: 1,
        83: 2,
        65: 3
    };
    document.addEventListener("keydown", function(h) {
        var g = h.altKey || h.ctrlKey || h.metaKey || h.shiftKey;
        var f = e[h.which];
        if (!g) {
            if (f !== undefined) {
                h.preventDefault();
                b.emit("move", f);
            }
        }
        if (!g && h.which === 82) {
            b.restart.call(b, h);
        }
    });
    this.bindButtonPress(".retry-button", this.restart);
    this.bindButtonPress(".restart-button", this.restart);
    this.bindButtonPress(".keep-playing-button", this.keepPlaying);
    var d, c;
    var a = document.getElementsByClassName("game-container")[0];
    a.addEventListener(this.eventTouchstart, function(f) {
        if ((!window.navigator.msPointerEnabled && f.touches.length > 1) || f.targetTouches.length > 1) {
            return;
        }
        if (window.navigator.msPointerEnabled) {
            d = f.pageX;
            c = f.pageY;
        } else {
            d = f.touches[0].clientX;
            c = f.touches[0].clientY;
        }
        f.preventDefault();
    });
    a.addEventListener(this.eventTouchmove, function(f) {
        f.preventDefault();
    });
    a.addEventListener(this.eventTouchend, function(j) {
        if ((!window.navigator.msPointerEnabled && j.touches.length > 0) || j.targetTouches.length > 0) {
            return;
        }
        var i, h;
        if (window.navigator.msPointerEnabled) {
            i = j.pageX;
            h = j.pageY;
        } else {
            i = j.changedTouches[0].clientX;
            h = j.changedTouches[0].clientY;
        }
        var g = i - d;
        var l = Math.abs(g);
        var f = h - c;
        var k = Math.abs(f);
        if (Math.max(l, k) > 10) {
            b.emit("move", l > k ? (g > 0 ? 1 : 3) : (f > 0 ? 2 : 0));
        }
    });
};
KeyboardInputManager.prototype.restart = function(a) {
    a.preventDefault();
    this.emit("restart");
};
KeyboardInputManager.prototype.keepPlaying = function(a) {
    a.preventDefault();
    this.emit("keepPlaying");
};
KeyboardInputManager.prototype.bindButtonPress = function(a, c) {
    var b = document.querySelector(a);
    b.addEventListener("click", c.bind(this));
    b.addEventListener(this.eventTouchend, c.bind(this));
};
