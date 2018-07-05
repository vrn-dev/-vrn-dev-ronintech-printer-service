/// <reference types="node" />

import SerialPort from 'serialport';

declare namespace RonintechPrinterService {
  export abstract class Adapter {
    abstract open(): Promise<void>;

    abstract write(data: Uint8Array): Promise<void>;

    abstract close(): Promise<void>;
  }

  export interface IEndpoint {
    address: string;
    port: number;
  }

  export class Network extends Adapter {
    private retries;
    private retrying;
    private options;
    private device;
    private connected;

    constructor(address: string, port?: number, retries?: number);

    open(): Promise<void>;

    write(data: Uint8Array): Promise<void>;

    close(): Promise<void>;

    private throwIfNeeded(reason?);
  }

  export class Serial extends Adapter {
    private device;

    constructor(path: string, options: SerialPort.OpenOptions);

    open(): Promise<void>;

    write(data: Uint8Array): Promise<void>;

    close(): Promise<void>;

    private throwIfNeeded(reason?);
  }

  export class Usb extends Adapter {
    private vid;
    private pid;
    private device;
    private endpoint;

    constructor(vid?: number | undefined, pid?: number | undefined);

    private static findDeviceOrThrow(vid?, pid?);

    private static getPrinterDevices(vid?);

    open(): Promise<void>;

    write(data: Uint8Array): Promise<void>;

    close(): Promise<void>;

    private throwIfNeeded(reason?);
  }

  export interface IRaster {
    data: Uint8Array;
    height: number;
    width: number;
  }

  export class Image {
    width: number;
    height: number;
    private data;

    constructor(pixels: boolean[], width: number, height: number);

    static load(path: string): Promise<Image>;

    toRaster(): IRaster;
  }

  export class MutableBuffer {
    private size;
    private buffer;

    constructor(size?: number);

    clear(): void;

    flush(): Uint8Array;

    write(data: ArrayLike<number>): MutableBuffer;

    writeUInt32LE(value: number, noAssert?: boolean): MutableBuffer;

    writeUInt16LE(value: number, noAssert?: boolean): MutableBuffer;

    writeUInt8(value: number, noAssert?: boolean): MutableBuffer;

    private resizeIfNeeded(need);
  }

  export class Printer {
    private adapter;
    private encoding;
    private buffer;

    constructor(adapter: Adapter, encoding?: string);

    setEncoding(encoding: string): Printer;

    init(): Printer;

    feed(feed?: number): Printer;

    resetToDefault(): Printer;

    setBold(bold?: boolean): Printer;

    setItalic(italic?: boolean): Printer;

    setUnderline(value: Underline): Printer;

    setAlignment(value: Align): Printer;

    setFont(value?: Font): Printer;

    cut(partial?: boolean): Printer;

    setTextSize(value?: Size): Printer;

    barcode(code: string, type?: Barcode, position?: Position, height?: BarcodeDims, width?: BarcodeDims): Printer;

    qr(code: string, errorCorrect?: QRErrorCorrectionLevel, size?: QRSize): Printer;

    raster(image: Image, mode?: RasterMode): Printer;

    flush(): Promise<void>;

    open(): Promise<Printer>;

    close(): Promise<Printer>;

    clearBuffer(): Printer;

    writeLine(value: string, encoding?: string): Printer;

    writeList(values: string[], encoding?: string): Printer;

    write(value: string | Uint8Array | number, encoding?: string): Printer;
  }

  export function createStreamFromPath(path: string): Promise<NodeJS.ReadableStream>;

  export function getRequestStream(address: string): any;

  export enum Basic {
    INIT = '\u001B@',
    FEED = 10,
    DATA_END = 0,
  }

  export enum Cut {
    FULL = '\u001Bi',
    PARTIAL = '\u001Bm',
  }

  export enum Size {
    Normal = '\u001D!\0\u001D!\0',
    Double = '\u001D!\u0001\u001D!\u0010',
  }

  export enum Underline {
    None = 0,
    On = 1,
    Double = 2,
  }

  export enum Bold {
    Off = 0,
    On = 1,
  }

  export enum Italic {
    Off = 0,
    On = 1,
  }

  export enum Font {
    A = 0,
    B = 1,
  }

  export enum Align {
    Left = 0,
    Center = 1,
    Right = 2,
  }

  export enum Barcode {
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

  export enum Position {
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
  export enum BarcodeDims {
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

  export enum QRErrorCorrectionLevel {
    AUTO = 0,
    _20 = 1,
    _37 = 2,
    _50 = 3,
    _65 = 4,
  }

  export enum QRSize {
    AUTO = 0,
    V1 = 1,
    V3 = 3,
    V4 = 4,
    V5 = 5,
    V6 = 6,
    V7 = 7,
    V8 = 8,
  }

  export enum RasterMode {
    Normal = 0,
    DoubleWidth = 1,
    DoubleHeight = 2,
    DoubleWidthAndHeight = 3,
  }

}