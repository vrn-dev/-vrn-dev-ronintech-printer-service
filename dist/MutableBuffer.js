"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var MutableBuffer = /** @class */ (function () {
    function MutableBuffer(size) {
        if (size === void 0) {
            size = 1024;
        }
        this.size = size;
        this.buffer = new Uint8Array(size);
        this.clear();
    }

    MutableBuffer.prototype.clear = function () {
        this.size = 0;
    };
    MutableBuffer.prototype.flush = function () {
        var buffer = new Uint8Array(this.buffer.slice(0, this.size));
        this.clear();
        return buffer;
    };
    MutableBuffer.prototype.write = function (data) {
        this.resizeIfNeeded(data.length);
        this.buffer.set(data, this.size);
        this.size += data.length;
        return this;
    };
    MutableBuffer.prototype.writeUInt32LE = function (value, noAssert) {
        this.resizeIfNeeded(4);
        this.buffer[this.size++] = (value) & 0xFF;
        this.buffer[this.size++] = (value >> 8) & 0xFF;
        this.buffer[this.size++] = (value >> 16) & 0xFF;
        this.buffer[this.size++] = (value >> 24) & 0xFF;
        return this;
    };
    MutableBuffer.prototype.writeUInt16LE = function (value, noAssert) {
        this.resizeIfNeeded(2);
        this.buffer[this.size++] = (value) & 0xFF;
        this.buffer[this.size++] = (value >> 8) & 0xFF;
        return this;
    };
    MutableBuffer.prototype.writeUInt8 = function (value, noAssert) {
        this.resizeIfNeeded(1);
        this.buffer[this.size++] = (value) & 0xFF;
        return this;
    };
    MutableBuffer.prototype.resizeIfNeeded = function (need) {
        var remaining = this.buffer.length - this.size;
        if (remaining < need) {
            var oldBuffer = this.buffer;
            var factor = Math.ceil((need - remaining) / oldBuffer.length) + 1;
            this.buffer = new Uint8Array(oldBuffer.length * factor);
            this.buffer.set(oldBuffer, 0);
        }
    };
    return MutableBuffer;
}());
exports.default = MutableBuffer;
//# sourceMappingURL=MutableBuffer.js.map