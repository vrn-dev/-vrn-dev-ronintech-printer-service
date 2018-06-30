"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var Basic;
(function (Basic) {
    Basic["INIT"] = "\u001B@";
    Basic[Basic["FEED"] = 10] = "FEED";
    Basic[Basic["DATA_END"] = 0] = "DATA_END";
})(Basic = exports.Basic || (exports.Basic = {}));
var Cut;
(function (Cut) {
    Cut["FULL"] = "\u001Bi";
    Cut["PARTIAL"] = "\u001Bm";
})(Cut = exports.Cut || (exports.Cut = {}));
var Size;
(function (Size) {
    Size["Normal"] = "\u001D!\0\u001D!\0";
    Size["Double"] = "\u001D!\u0001\u001D!\u0010";
})(Size = exports.Size || (exports.Size = {}));
var Underline;
(function (Underline) {
    Underline[Underline["None"] = 0] = "None";
    Underline[Underline["On"] = 1] = "On";
    Underline[Underline["Double"] = 2] = "Double";
})(Underline = exports.Underline || (exports.Underline = {}));
var Bold;
(function (Bold) {
    Bold[Bold["Off"] = 0] = "Off";
    Bold[Bold["On"] = 1] = "On";
})(Bold = exports.Bold || (exports.Bold = {}));
var Italic;
(function (Italic) {
    Italic[Italic["Off"] = 0] = "Off";
    Italic[Italic["On"] = 1] = "On";
})(Italic = exports.Italic || (exports.Italic = {}));
var Font;
(function (Font) {
    Font[Font["A"] = 0] = "A";
    Font[Font["B"] = 1] = "B";
})(Font = exports.Font || (exports.Font = {}));
var Align;
(function (Align) {
    Align[Align["Left"] = 0] = "Left";
    Align[Align["Center"] = 1] = "Center";
    Align[Align["Right"] = 2] = "Right";
})(Align = exports.Align || (exports.Align = {}));
var Barcode;
(function (Barcode) {
    Barcode[Barcode["UPC_A"] = 0] = "UPC_A";
    Barcode[Barcode["UPC_E"] = 1] = "UPC_E";
    Barcode[Barcode["EAN13"] = 2] = "EAN13";
    Barcode[Barcode["EAN8"] = 3] = "EAN8";
    Barcode[Barcode["CODE39"] = 105] = "CODE39";
    Barcode[Barcode["ITF"] = 5] = "ITF";
    Barcode[Barcode["CODEABAR"] = 6] = "CODEABAR";
    Barcode[Barcode["CODE32"] = 7] = "CODE32";
    Barcode[Barcode["CODE93"] = 8] = "CODE93";
    Barcode[Barcode["CODE128"] = 20] = "CODE128";
})(Barcode = exports.Barcode || (exports.Barcode = {}));
var Position;
(function (Position) {
    Position[Position["Off"] = 0] = "Off";
    Position[Position["Above"] = 1] = "Above";
    Position[Position["Below"] = 2] = "Below";
    Position[Position["Both"] = 3] = "Both";
})(Position = exports.Position || (exports.Position = {}));
/**
 * Barcode Dimensions
 * Height Default : 162. 1 <= n <= 255
 * Width Default : 0x03 0.375mm
 */
var BarcodeDims;
(function (BarcodeDims) {
    BarcodeDims[BarcodeDims["_1_25"] = 1] = "_1_25";
    BarcodeDims[BarcodeDims["_0_25"] = 2] = "_0_25";
    BarcodeDims[BarcodeDims["_0_375"] = 3] = "_0_375";
    BarcodeDims[BarcodeDims["_0_5"] = 4] = "_0_5";
    BarcodeDims[BarcodeDims["_0_625"] = 5] = "_0_625";
    BarcodeDims[BarcodeDims["_0_75"] = 6] = "_0_75";
    BarcodeDims["Height"] = "\u001Dh";
    BarcodeDims["Width"] = "\u001Dw";
    BarcodeDims[BarcodeDims["Default_h"] = 42] = "Default_h";
    BarcodeDims[BarcodeDims["Default_w"] = 3] = "Default_w";
    BarcodeDims["DEFAULT"] = "\u001Dh\u00A2\u001Dw\u0003";
})(BarcodeDims = exports.BarcodeDims || (exports.BarcodeDims = {}));
var QRErrorCorrectionLevel;
(function (QRErrorCorrectionLevel) {
    QRErrorCorrectionLevel[QRErrorCorrectionLevel["AUTO"] = 0] = "AUTO";
    QRErrorCorrectionLevel[QRErrorCorrectionLevel["_20"] = 1] = "_20";
    QRErrorCorrectionLevel[QRErrorCorrectionLevel["_37"] = 2] = "_37";
    QRErrorCorrectionLevel[QRErrorCorrectionLevel["_50"] = 3] = "_50";
    QRErrorCorrectionLevel[QRErrorCorrectionLevel["_65"] = 4] = "_65";
})(QRErrorCorrectionLevel = exports.QRErrorCorrectionLevel || (exports.QRErrorCorrectionLevel = {}));
var QRSize;
(function (QRSize) {
    QRSize[QRSize["AUTO"] = 0] = "AUTO";
    QRSize[QRSize["V1"] = 1] = "V1";
    QRSize[QRSize["V3"] = 3] = "V3";
    QRSize[QRSize["V4"] = 4] = "V4";
    QRSize[QRSize["V5"] = 5] = "V5";
    QRSize[QRSize["V6"] = 6] = "V6";
    QRSize[QRSize["V7"] = 7] = "V7";
    QRSize[QRSize["V8"] = 8] = "V8";
})(QRSize = exports.QRSize || (exports.QRSize = {}));
var RasterMode;
(function (RasterMode) {
    RasterMode[RasterMode["Normal"] = 0] = "Normal";
    RasterMode[RasterMode["DoubleWidth"] = 1] = "DoubleWidth";
    RasterMode[RasterMode["DoubleHeight"] = 2] = "DoubleHeight";
    RasterMode[RasterMode["DoubleWidthAndHeight"] = 3] = "DoubleWidthAndHeight";
})(RasterMode = exports.RasterMode || (exports.RasterMode = {}));
/**
 *
 *
 BARCODE: {
        DIMS: {
            HEIGHT: '\x1d\x68\xa2',
            WIDTH: '\x1d\x77\x03'
        },
        TYPE: {
            UPC_A: '\x1d\x6b\x00',
            UPC_E: '\x1d\x6b\x01',
            EAN13: '\x1d\x6b\x02',
            EAN8: '\x1d\x6b\x03',
            CODE39: '\x1d\x6b\x69',
            ITF: '\x1d\x6b\x05',
            CODEABAR: '\x1d\x6b\x06',
            CODE32: '\x1d\x6b\x07',
            CODE93: '\x1d\x6b\x08',
            CODE128: '\x1d\x6b\x14'
        },
        FONT: {
            A: '\x1d\x66\x00',
            B: '\x1d\x66\x01'
        },
        DATA_END: '\x00'
    }
 };
 *
 */
//# sourceMappingURL=custom-biz.js.map