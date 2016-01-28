function GameManager(f, e, h, g) {
    this.size = f;
    this.inputManager = new e;
    this.storageManager = new g;
    this.actuator = new h;
    this.startTiles = 2;
    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));
    this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));
    this.setup();
}
GameManager.prototype.restart = function() {
    this.storageManager.clearGameState();
    this.actuator.continueGame();
    this.setup();
};
GameManager.prototype.keepPlaying = function() {
    this.keepPlaying = true;
    this.actuator.continueGame();
};
GameManager.prototype.isGameTerminated = function() {
    return this.over || (this.won && !this.keepPlaying);
};
GameManager.prototype.setup = function() {
    var b = this.storageManager.getGameState();
    if (b) {
        this.grid = new Grid(b.grid.size, b.grid.cells);
        this.score = b.score;
        this.over = b.over;
        this.won = b.won;
        this.keepPlaying = b.keepPlaying;
    } else {
        this.grid = new Grid(this.size);
        this.score = 0;
        this.over = false;
        this.won = false;
        this.keepPlaying = false;
        this.addStartTiles();
    }
    this.actuate();
};
GameManager.prototype.addStartTiles = function() {
    for (var b = 0; b < this.startTiles; b++) {
        this.addRandomTile();
    }
};
GameManager.prototype.addRandomTile = function() {
    if (this.grid.cellsAvailable()) {
        var c = Math.random() < 0.9 ? 2 : 4;
        var d = new Tile(this.grid.randomAvailableCell(), c);
        this.grid.insertTile(d);
    }
};
GameManager.prototype.actuate = function() {
    if (this.storageManager.getBestScore() < this.score) {
        this.storageManager.setBestScore(this.score);
    }
    if (this.over) {
        this.storageManager.clearGameState();
    } else {
        this.storageManager.setGameState(this.serialize());
    }
    this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won,
        bestScore: this.storageManager.getBestScore(),
        terminated: this.isGameTerminated()
    });
};
GameManager.prototype.serialize = function() {
    return {
        grid: this.grid.serialize(),
        score: this.score,
        over: this.over,
        won: this.won,
        keepPlaying: this.keepPlaying
    };
};
GameManager.prototype.prepareTiles = function() {
    this.grid.eachCell(function(e, f, d) {
        if (d) {
            d.mergedFrom = null;
            d.savePosition();
        }
    });
};
GameManager.prototype.moveTile = function(c, d) {
    this.grid.cells[c.x][c.y] = null;
    this.grid.cells[d.x][d.y] = c;
    c.updatePosition(d);
};
GameManager.prototype.move = function(j) {
    var m = this;
    if (this.isGameTerminated()) {
        return;
    }
    var i, k;
    var h = this.getVector(j);
    var n = this.buildTraversals(h);
    var l = false;
    this.prepareTiles();
    n.x.forEach(function(a) {
        n.y.forEach(function(b) {
            i = {
                x: a,
                y: b
            };
            k = m.grid.cellContent(i);
            if (k) {
                var d = m.findFarthestPosition(i, h);
                var c = m.grid.cellContent(d.next);
                if (c && c.value === k.value && !c.mergedFrom) {
                    var e = new Tile(d.next, k.value * 2);
                    e.mergedFrom = [k, c];
                    m.grid.insertTile(e);
                    m.grid.removeTile(k);
                    k.updatePosition(d.next);
                    m.score += e.value;
                    if (e.value === 2048) {
                        m.won = true;
                    }
                } else {
                    m.moveTile(k, d.farthest);
                } if (!m.positionsEqual(i, k)) {
                    l = true;
                }
            }
        });
    });
    if (l) {
        this.addRandomTile();
        if (!this.movesAvailable()) {
            this.over = true;
        }
        this.actuate();
    }
};
GameManager.prototype.getVector = function(c) {
    var d = {
        0: {
            x: 0,
            y: -1
        },
        1: {
            x: 1,
            y: 0
        },
        2: {
            x: 0,
            y: 1
        },
        3: {
            x: -1,
            y: 0
        }
    };
    return d[c];
};
GameManager.prototype.buildTraversals = function(e) {
    var d = {
        x: [],
        y: []
    };
    for (var f = 0; f < this.size; f++) {
        d.x.push(f);
        d.y.push(f);
    }
    if (e.x === 1) {
        d.x = d.x.reverse();
    }
    if (e.y === 1) {
        d.y = d.y.reverse();
    }
    return d;
};
GameManager.prototype.findFarthestPosition = function(e, d) {
    var f;
    do {
        f = e;
        e = {
            x: f.x + d.x,
            y: f.y + d.y
        };
    } while (this.grid.withinBounds(e) && this.grid.cellAvailable(e));
    return {
        farthest: f,
        next: e
    };
};
GameManager.prototype.movesAvailable = function() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};
GameManager.prototype.tileMatchesAvailable = function() {
    var n = this;
    var m;
    for (var p = 0; p < this.size; p++) {
        for (var k = 0; k < this.size; k++) {
            m = this.grid.cellContent({
                x: p,
                y: k
            });
            if (m) {
                for (var l = 0; l < 4; l++) {
                    var o = n.getVector(l);
                    var i = {
                        x: p + o.x,
                        y: k + o.y
                    };
                    var j = n.grid.cellContent(i);
                    if (j && j.value === m.value) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};
GameManager.prototype.positionsEqual = function(c, d) {
    return c.x === d.x && c.y === d.y;
};
