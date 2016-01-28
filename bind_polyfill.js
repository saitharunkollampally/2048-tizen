Function.prototype.bind = Function.prototype.bind || function(b) {
    var a = this;
    return function(c) {
        if (!(c instanceof Array)) {
            c = [c];
        }
        a.apply(b, c);
    };
};
