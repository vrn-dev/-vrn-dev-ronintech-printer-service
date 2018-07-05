"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
        label: 0, sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
        }, trys: [], ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;

    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {value: op[1], done: false};
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {value: op[0] ? op[1] : void 0, done: true};
    }
};
Object.defineProperty(exports, "__esModule", {value: true});
var pngjs_1 = require("pngjs");
var utils_1 = require("./utils");
var Image = /** @class */ (function () {
    function Image(pixels, width, height) {
        this.width = width;
        this.height = height;
        this.data = pixels;
    }
    Image.load = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, utils_1.createStreamFromPath(path)];
                    case 1:
                        stream = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                            stream.pipe(new pngjs_1.PNG()).on('parsed', function () {
                                var pixels = new Array(this.width * this.height);
                                for (var y = 0; y < this.height; y++) {
                                    for (var x = 0; x < this.width; x++) {
                                        var idx = (this.width * y + x) * 4;
                                        var value = false;
                                        if (this.data[idx] < 0xE6 || this.data[idx + 1] < 0xE6 || this.data[idx + 2] < 0xE6)
                                            value = true;
                                        if (value && this.data[idx + 3] <= 0x80)
                                            value = false;
                                        pixels[this.width * y + x] = value;
                                    }
                                }
                                resolve(new Image(pixels, this.width, this.height));
                            });
                        })];
                }
            });
        });
    };
    Image.prototype.toRaster = function () {
        var n = Math.ceil(this.width / 8);
        var result = new Uint8Array(this.height * n);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.data[y * this.width + x])
                    result[y * n + (x >> 3)] += (0x80 >> ((x % 8) & 0x7));
            }
        }
        return {
            data: result,
            height: this.height,
            width: n
        };
    };
    return Image;
}());
exports.default = Image;
//# sourceMappingURL=image.js.map