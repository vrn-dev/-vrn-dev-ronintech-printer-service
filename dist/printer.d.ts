import Adapter from './apadters/adapter';
import {
  Align,
  Barcode,
  BarcodeDims,
  Font,
  Position,
  QRErrorCorrectionLevel,
  QRSize,
  RasterMode,
  Size,
  Underline
} from './commands/custom-biz';
import Image from './image';

export default class Printer {
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
