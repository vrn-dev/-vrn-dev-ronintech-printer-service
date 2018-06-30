export declare enum Basic {
  INIT = '\u001B@',
  FEED = 10,
  DATA_END = 0,
}

export declare enum Cut {
  FULL = '\u001Bi',
  PARTIAL = '\u001Bm',
}

export declare enum Size {
  Normal = '\u001D!\0\u001D!\0',
  Double = '\u001D!\u0001\u001D!\u0010',
}

export declare enum Underline {
  None = 0,
  On = 1,
  Double = 2,
}

export declare enum Bold {
  Off = 0,
  On = 1,
}

export declare enum Italic {
  Off = 0,
  On = 1,
}

export declare enum Font {
  A = 0,
  B = 1,
}

export declare enum Align {
  Left = 0,
  Center = 1,
  Right = 2,
}

export declare enum Barcode {
  UPC_A = 0,
  UPC_E = 1,
  EAN13 = 2,
  EAN8 = 3,
  CODE39 = 105,
  ITF = 5,
  CODEABAR = 6,
  CODE32 = 7,
  CODE93 = 8,
  CODE128 = 20,
}

export declare enum Position {
  Off = 0,
  Above = 1,
  Below = 2,
  Both = 3,
}

/**
 * Barcode Dimensions
 * Height Default : 162. 1 <= n <= 255
 * Width Default : 0x03 0.375mm
 */
export declare enum BarcodeDims {
  _1_25 = 1,
  _0_25 = 2,
  _0_375 = 3,
  _0_5 = 4,
  _0_625 = 5,
  _0_75 = 6,
  Height = '\u001Dh',
  Width = '\u001Dw',
  Default_h = 42,
  Default_w = 3,
  DEFAULT = '\u001Dh\u00A2\u001Dw\u0003',
}

export declare enum QRErrorCorrectionLevel {
  AUTO = 0,
  _20 = 1,
  _37 = 2,
  _50 = 3,
  _65 = 4,
}

export declare enum QRSize {
  AUTO = 0,
  V1 = 1,
  V3 = 3,
  V4 = 4,
  V5 = 5,
  V6 = 6,
  V7 = 7,
  V8 = 8,
}

export declare enum RasterMode {
  Normal = 0,
  DoubleWidth = 1,
  DoubleHeight = 2,
  DoubleWidthAndHeight = 3,
}
