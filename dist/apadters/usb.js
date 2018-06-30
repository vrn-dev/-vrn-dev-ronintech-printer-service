"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array && function (d, b) {
            d.__proto__ = b;
        }) ||
        function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
var adapter_1 = __importDefault(require("./adapter"));
var usb_1 = require("usb");
var PRINTER_CLASS = 0x07;
var Usb = /** @class */ (function (_super) {
    __extends(Usb, _super);

    function Usb(vid, pid) {
        var _this = _super.call(this) || this;
        _this.vid = vid;
        _this.pid = pid;
        usb_1.on('detach', function (device) {
            if (device === _this.device)
                _this.device.close();
        });
        return _this;
    }

    Usb.findDeviceOrThrow = function (vid, pid) {
        if (vid && pid)
            return usb_1.findByIds(vid, pid);
        else {
            var devices = Usb.getPrinterDevices(vid);
            if (devices.length > 0) {
                return devices[0];
            }
        }
        throw new Error('No printer found');
    };
    Usb.getPrinterDevices = function (vid) {
        return usb_1.getDeviceList()
            .filter(function (device) {
                return !vid || device.deviceDescriptor.idVendor === vid;
            })
            .filter(function (device) {
                try {
                    device.open();
                    return device.interfaces.some(function (iface) {
                        return iface.descriptor.bInterfaceClass === PRINTER_CLASS;
                    });
                }
                catch (e) {
                    console.log(e); // Make Logger
                    return false;
                }
                finally {
                    device.close();
                }
            });
    };
    Usb.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                    _this.device = Usb.findDeviceOrThrow(_this.vid, _this.pid);
                    _this.device.open();
                    _this.device.interfaces.forEach(function (iface) {
                        iface.claim();
                        iface.endpoints.filter(function (endpoint) {
                            if (endpoint.direction === 'out') {
                                _this.endpoint = endpoint;
                                resolve();
                            }
                        });
                    });
                    _this.throwIfNeeded('Cannot open printer');
                })];
            });
        });
    };
    Usb.prototype.write = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                    _this.throwIfNeeded();
                    if (_this.endpoint)
                        _this.endpoint.transfer(new Buffer(data), function (err) {
                            if (err)
                                throw new Error('Failed to write data to USB device');
                            resolve();
                        });
                })];
            });
        });
    };
    Usb.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.throwIfNeeded();
                if (this.device)
                    this.device.close();
                this.device = null;
                this.endpoint = null;
                return [2 /*return*/];
            });
        });
    };
    Usb.prototype.throwIfNeeded = function (reason) {
        if (!this.device || !this.endpoint) {
            throw new Error(reason || 'USB Device is not open');
        }
    };
    return Usb;
}(adapter_1.default));
exports.default = Usb;
//# sourceMappingURL=usb.js.map