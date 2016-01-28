function HTMLActuator() {
    this.tileContainer = document.querySelector(".tile-container");
    this.scoreContainer = document.querySelector(".score-container");
    this.bestContainer = document.querySelector(".best-container");
    this.messageContainer = document.querySelector(".game-message");
    this.score = 0;
}
HTMLActuator.prototype.actuate = function(c, b) {
    var a = this;
    window.requestAnimationFrame(function() {
        a.clearContainer(a.tileContainer);
        c.cells.forEach(function(d) {
            d.forEach(function(e) {
                if (e) {
                    a.addTile(e);
                }
            });
        });
        a.updateScore(b.score);
        a.updateBestScore(b.bestScore);
        if (b.terminated) {
            if (b.over) {
                a.message(false);
            } else {
                if (b.won) {
                    a.message(true);
                }
            }
        }
    });
};
HTMLActuator.prototype.continueGame = function() {
    this.clearMessage();
};
HTMLActuator.prototype.clearContainer = function(a) {
    while (a.firstChild) {
        a.removeChild(a.firstChild);
    }
};
HTMLActuator.prototype.addTile = function(e) {
    var c = this;
    var g = document.createElement("div");
    var b = document.createElement("div");
    var a = e.previousPosition || {
        x: e.x,
        y: e.y
    };
    var f = this.positionClass(a);
    var d = ["tile", "tile-" + e.value, f];
    if (e.value > 2048) {
        d.push("tile-super");
    }
    this.applyClasses(g, d);
    b.classList.add("tile-inner");
    b.textContent = e.value;
    if (e.previousPosition) {
        window.requestAnimationFrame(function() {
            d[2] = c.positionClass({
                x: e.x,
                y: e.y
            });
            c.applyClasses(g, d);
        });
    } else {
        if (e.mergedFrom) {
            d.push("tile-merged");
            this.applyClasses(g, d);
            e.mergedFrom.forEach(function(h) {
                c.addTile(h);
            });
        } else {
            d.push("tile-new");
            this.applyClasses(g, d);
        }
    }
    g.appendChild(b);
    this.tileContainer.appendChild(g);
};
HTMLActuator.prototype.applyClasses = function(b, a) {
    b.setAttribute("class", a.join(" "));
};
HTMLActuator.prototype.normalizePosition = function(a) {
    return {
        x: a.x + 1,
        y: a.y + 1
    };
};
HTMLActuator.prototype.positionClass = function(a) {
    a = this.normalizePosition(a);
    return "tile-position-" + a.x + "-" + a.y;
};
HTMLActuator.prototype.updateScore = function(b) {
    this.clearContainer(this.scoreContainer);
    var c = b - this.score;
    this.score = b;
    this.scoreContainer.textContent = this.score;
    if (c > 0) {
        var a = document.createElement("div");
        a.classList.add("score-addition");
        a.textContent = "+" + c;
        this.scoreContainer.appendChild(a);
    }
};
HTMLActuator.prototype.updateBestScore = function(a) {
    this.bestContainer.textContent = a;
};
HTMLActuator.prototype.message = function(c) {
    var a = c ? "game-won" : "game-over";
    var b = c ? "You win!" : "Game over!";
    this.messageContainer.classList.add(a);
    this.messageContainer.getElementsByTagName("p")[0].textContent = b;
};
HTMLActuator.prototype.clearMessage = function() {
    this.messageContainer.classList.remove("game-won");
    this.messageContainer.classList.remove("game-over");
};
