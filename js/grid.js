function Grid(b, a) {
    this.size = b;
    this.cells = a ? this.fromState(a) : this.empty();
}
Grid.prototype.empty = function() {
    var b = [];
    for (var a = 0; a < this.size; a++) {
        var c = b[a] = [];
        for (var d = 0; d < this.size; d++) {
            c.push(null);
        }
    }
    return b;
};
Grid.prototype.fromState = function(d) {
    var b = [];
    for (var a = 0; a < this.size; a++) {
        var e = b[a] = [];
        for (var f = 0; f < this.size; f++) {
            var c = d[a][f];
            e.push(c ? new Tile(c.position, c.value) : null);
        }
    }
    return b;
};
Grid.prototype.randomAvailableCell = function() {
    var a = this.availableCells();
    if (a.length) {
        return a[Math.floor(Math.random() * a.length)];
    }
};
Grid.prototype.availableCells = function() {
    var a = [];
    this.eachCell(function(b, d, c) {
        if (!c) {
            a.push({
                x: b,
                y: d
            });
        }
    });
    return a;
};
Grid.prototype.eachCell = function(c) {
    for (var a = 0; a < this.size; a++) {
        for (var b = 0; b < this.size; b++) {
            c(a, b, this.cells[a][b]);
        }
    }
};
Grid.prototype.cellsAvailable = function() {
    return !!this.availableCells().length;
};
Grid.prototype.cellAvailable = function(a) {
    return !this.cellOccupied(a);
};
Grid.prototype.cellOccupied = function(a) {
    return !!this.cellContent(a);
};
Grid.prototype.cellContent = function(a) {
    if (this.withinBounds(a)) {
        return this.cells[a.x][a.y];
    } else {
        return null;
    }
};
Grid.prototype.insertTile = function(a) {
    this.cells[a.x][a.y] = a;
};
Grid.prototype.removeTile = function(a) {
    this.cells[a.x][a.y] = null;
};
Grid.prototype.withinBounds = function(a) {
    return a.x >= 0 && a.x < this.size && a.y >= 0 && a.y < this.size;
};
Grid.prototype.serialize = function() {
    var b = [];
    for (var a = 0; a < this.size; a++) {
        var c = b[a] = [];
        for (var d = 0; d < this.size; d++) {
            c.push(this.cells[a][d] ? this.cells[a][d].serialize() : null);
        }
    }
    return {
        size: this.size,
        cells: b
    };
};
