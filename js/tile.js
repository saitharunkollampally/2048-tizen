function Tile(a, b) {
    this.x = a.x;
    this.y = a.y;
    this.value = b || 2;
    this.previousPosition = null;
    this.mergedFrom = null;
}
Tile.prototype.savePosition = function() {
    this.previousPosition = {
        x: this.x,
        y: this.y
    };
};
Tile.prototype.updatePosition = function(a) {
    this.x = a.x;
    this.y = a.y;
};
Tile.prototype.serialize = function() {
    return {
        position: {
            x: this.x,
            y: this.y
        },
        value: this.value
    };
};
