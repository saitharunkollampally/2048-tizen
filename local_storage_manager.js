window.fakeStorage = {
    _data: {},
    setItem: function(b, a) {
        return this._data[b] = String(a);
    },
    getItem: function(a) {
        return this._data.hasOwnProperty(a) ? this._data[a] : undefined;
    },
    removeItem: function(a) {
        return delete this._data[a];
    },
    clear: function() {
        return this._data = {};
    }
};

function LocalStorageManager() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";
    var a = this.localStorageSupported();
    this.storage = a ? window.localStorage : window.fakeStorage;
}
LocalStorageManager.prototype.localStorageSupported = function() {
    var c = "test";
    var b = window.localStorage;
    try {
        b.setItem(c, "1");
        b.removeItem(c);
        return true;
    } catch (a) {
        return false;
    }
};
LocalStorageManager.prototype.getBestScore = function() {
    return this.storage.getItem(this.bestScoreKey) || 0;
};
LocalStorageManager.prototype.setBestScore = function(a) {
    this.storage.setItem(this.bestScoreKey, a);
};
LocalStorageManager.prototype.getGameState = function() {
    var a = this.storage.getItem(this.gameStateKey);
    return a ? JSON.parse(a) : null;
};
LocalStorageManager.prototype.setGameState = function(a) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(a));
};
LocalStorageManager.prototype.clearGameState = function() {
    this.storage.removeItem(this.gameStateKey);
};
