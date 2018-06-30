export enum Basic {
  INIT = '\x1B\x40',
  FEED = 0x0A,
  DATA_END = 0x00
}

export enum Cut {
  FULL = '\x1B\x69',
  PARTIAL = '\x1B\x6D'
}

export enum Size {
  Normal = '\x1d\x21\x00\x1d\x21\x00',
  Double = '\x1d\x21\x01\x1d\x21\x10'
}

export enum Underline {
  None = 0x00,
  On = 0x01,
  Double = 0x02
}

export enum Bold {
  Off = 0x00,
  On = 0x01
}

export enum Italic {
  Off = 0x00,
  On = 0x01
}

export enum Font {
  A = 0x00,
  B = 0x01
}

export enum Align {
  Left = 0x00,
  Center = 0x01,
  Right = 0x02
}

export enum Barcode {
  UPC_A = 0x00,
  UPC_E = 0x01,
  EAN13 = 0x02,
  EAN8 = 0x03,
  CODE39 = 0x69,
  ITF = 0x05,
  CODEABAR = 0x06,
  CODE32 = 0x07,
  CODE93 = 0x08,
  CODE128 = 0x14
}

export enum Position {
  Off = 0x00,
  Above = 0x01,
  Below = 0x02,
  Both = 0x03
}

/**
 * Barcode Dimensions
 * Height Default : 162. 1 <= n <= 255
 * Width Default : 0x03 0.375mm
 */
export enum BarcodeDims {
  _1_25 = 0x01,
  _0_25 = 0x02,
  _0_375 = 0x03,
  _0_5 = 0x04,
  _0_625 = 0x05,
  _0_75 = 0x06,
  Height = '\x1D\x68',
  Width = '\x1D\x77',
  Default_h = 0x2A,
  Default_w = 0x03,
  DEFAULT = '\x1d\x68\xa2\x1d\x77\x03'
}

export enum QRErrorCorrectionLevel {
  AUTO = 0x00,
  _20 = 0x01,
  _37 = 0x02,
  _50 = 0x03,
  _65 = 0x04
}

export enum QRSize {
  AUTO = 0x00,
  V1 = 0x01,
  V3 = 0x03,
  V4 = 0x04,
  V5 = 0x05,
  V6 = 0x06,
  V7 = 0x07,
  V8 = 0x08
}

export enum RasterMode {
  Normal = 0x00,
  DoubleWidth = 0x01,
  DoubleHeight = 0x02,
  DoubleWidthAndHeight = 0x03
}

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