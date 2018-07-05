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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
var iconv = __importStar(require("iconv-lite"));
var MutableBuffer_1 = __importDefault(require("./MutableBuffer"));
var custom_biz_1 = require("./commands/custom-biz");
var Printer = /** @class */ (function () {
    function Printer(adapter, encoding) {
        if (encoding === void 0) {
            encoding = 'ascii';
        }
        this.adapter = adapter;
        this.encoding = encoding;
        this.buffer = new MutableBuffer_1.default();
    }
    Printer.prototype.setEncoding = function (encoding) {
        this.encoding = encoding;
        return this;
    };
    Printer.prototype.init = function () {
        this.write(custom_biz_1.Basic.INIT);
        return this;
    };
    Printer.prototype.feed = function (feed) {
        if (feed === void 0) {
            feed = 1;
        }
        this.write(new Uint8Array([0x1B, 0x64]));
        this.write(feed);
        return this;
    };
    Printer.prototype.resetToDefault = function () {
        this.setBold(false);
        this.setItalic(false);
        this.setUnderline(custom_biz_1.Underline.None);
        this.setAlignment(custom_biz_1.Align.Left);
        this.setTextSize();
        this.setFont();
        return this;
    };
    Printer.prototype.setBold = function (bold) {
        if (bold === void 0) {
            bold = true;
        }
        this.write(new Uint8Array([0x1B, 0x45]));
        this.write(bold ? custom_biz_1.Bold.On : custom_biz_1.Bold.Off);
        return this;
    };
    Printer.prototype.setItalic = function (italic) {
        if (italic === void 0) {
            italic = true;
        }
        this.write(new Uint8Array([0x1B, 0x34]));
        this.write(italic ? custom_biz_1.Italic.On : custom_biz_1.Italic.Off);
        return this;
    };
    Printer.prototype.setUnderline = function (value) {
        this.write(new Uint8Array([0x1B, 0x2D]));
        this.write(value);
        return this;
    };
    Printer.prototype.setAlignment = function (value) {
        this.write(new Uint8Array([0x1B, 0x61]));
        this.write(value);
        return this;
    };
    Printer.prototype.setFont = function (value) {
        if (value === void 0) {
            value = custom_biz_1.Font.A;
        }
        this.write(new Uint8Array([0x1B, 0x21]));
        this.write(value);
        return this;
    };
    Printer.prototype.cut = function (partial) {
        if (partial === void 0) {
            partial = false;
        }
        this.write(partial ? custom_biz_1.Cut.PARTIAL : custom_biz_1.Cut.FULL);
        return this;
    };
    Printer.prototype.setTextSize = function (value) {
        if (value === void 0) {
            value = custom_biz_1.Size.Normal;
        }
        this.write(value);
        return this;
    };
    Printer.prototype.barcode = function (code, type, position, height, width) {
        if (type === void 0) {
            type = custom_biz_1.Barcode.EAN13;
        }
        if (position === void 0) {
            position = custom_biz_1.Position.Below;
        }
        if (height === void 0) {
            height = custom_biz_1.BarcodeDims.Default_h;
        }
        if (width === void 0) {
            width = custom_biz_1.BarcodeDims.Default_w;
        }
        // Set position
        this.write(new Uint8Array([0x1D, 0x48]));
        this.write(position);
        // Set height
        this.write(custom_biz_1.BarcodeDims.Height);
        this.write(height);
        // Set width
        this.write(custom_biz_1.BarcodeDims.Width);
        this.write(width);
        // Print Barcode
        this.write(new Uint8Array([0x1D, 0x6B]));
        this.write(type);
        this.write(code);
        this.write(custom_biz_1.Basic.DATA_END);
        return this;
    };
    Printer.prototype.qr = function (code, errorCorrect, size) {
        if (errorCorrect === void 0) {
            errorCorrect = custom_biz_1.QRErrorCorrectionLevel.AUTO;
        }
        if (size === void 0) {
            size = custom_biz_1.QRSize.AUTO;
        }
        // Save code in barcode save area
        this.write(new Uint8Array([0x1D, 0x28, 0x6B]));
        this.buffer.writeUInt16LE(code.length + 3);
        this.write(new Uint8Array([0x31, 0x50, 0x31]));
        this.write(code);
        // Set Error correction
        this.write(new Uint8Array([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x45]));
        this.write(errorCorrect);
        // Set code size
        this.write(new Uint8Array([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x43]));
        this.write(size);
        // Print QR Code
        this.write(new Uint8Array([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x51, 0x31]));
        return this;
    };
    Printer.prototype.raster = function (image, mode) {
        if (mode === void 0) {
            mode = custom_biz_1.RasterMode.Normal;
        }
        var header = new Uint8Array([0x1D, 0x70, 0x04, mode]);
        var raster = image.toRaster();
        this.buffer.write(header);
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    };
    Printer.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.adapter.write(this.buffer.flush())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Printer.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.adapter.open()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Printer.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.flush()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adapter.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Printer.prototype.clearBuffer = function () {
        this.buffer.clear();
        return this;
    };
    Printer.prototype.writeLine = function (value, encoding) {
        return this.write(value + "\n", encoding);
    };
    Printer.prototype.writeList = function (values, encoding) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            this.writeLine(value, encoding);
        }
        return this;
    };
    Printer.prototype.write = function (value, encoding) {
        if (typeof value === 'number')
            this.buffer.writeUInt8(value);
        else if (typeof value === 'string')
            this.buffer.write(iconv.encode(value, encoding || this.encoding));
        else
            this.buffer.write(value);
        return this;
    };
    return Printer;
}());
exports.default = Printer;
//# sourceMappingURL=printer.js.map