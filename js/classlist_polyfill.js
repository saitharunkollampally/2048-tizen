(function() {
    if (typeof window.Element === "undefined" || "classList" in document.documentElement) {
        return;
    }
    var c = Array.prototype,
        b = c.push,
        f = c.splice,
        d = c.join;

    function e(j) {
        this.el = j;
        var h = j.className.replace(/^\s+|\s+$/g, "").split(/\s+/);
        for (var g = 0; g < h.length; g++) {
            b.call(this, h[g]);
        }
    }
    e.prototype = {
        add: function(g) {
            if (this.contains(g)) {
                return;
            }
            b.call(this, g);
            this.el.className = this.toString();
        },
        contains: function(g) {
            return this.el.className.indexOf(g) != -1;
        },
        item: function(g) {
            return this[g] || null;
        },
        remove: function(h) {
            if (!this.contains(h)) {
                return;
            }
            for (var g = 0; g < this.length; g++) {
                if (this[g] == h) {
                    break;
                }
            }
            f.call(this, g, 1);
            this.el.className = this.toString();
        },
        toString: function() {
            return d.call(this, " ");
        },
        toggle: function(g) {
            if (!this.contains(g)) {
                this.add(g);
            } else {
                this.remove(g);
            }
            return this.contains(g);
        }
    };
    window.DOMTokenList = e;

    function a(h, i, g) {
        if (Object.defineProperty) {
            Object.defineProperty(h, i, {get: g
            });
        } else {
            h.__defineGetter__(i, g);
        }
    }
    a(HTMLElement.prototype, "classList", function() {
        return new e(this);
    });
})();
