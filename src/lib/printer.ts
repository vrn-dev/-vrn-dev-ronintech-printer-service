import * as iconv from 'iconv-lite';

import { MutableBuffer } from './MutableBuffer';
import Adapter from './apadters/adapter';
import {
  Align,
  Barcode,
  BarcodeDims,
  Basic,
  Bold,
  Cut,
  Font,
  Italic,
  Position,
  QRErrorCorrectionLevel,
  QRSize,
  RasterMode,
  Size,
  Underline
} from './commands';
import { Image } from './image';

export class Printer {
  private buffer: MutableBuffer;

  constructor(private adapter: Adapter,
              private encoding: string = 'ascii') {
    this.buffer = new MutableBuffer();
  }

  public setEncoding(encoding: string): Printer {
    this.encoding = encoding;
    return this;
  }

  public init(): Printer {
    this.write(Basic.INIT);
    return this;
  }

  public feed(feed: number = 1): Printer {
    this.write(new Uint8Array([0x1B, 0x64]));
    this.write(feed);
    return this;
  }

  public resetToDefault(): Printer {
    this.setBold(false);
    this.setItalic(false);
    this.setUnderline(Underline.None);
    this.setAlignment(Align.Left);
    this.setTextSize();
    this.setFont();
    return this;
  }

  public setBold(bold: boolean = true): Printer {
    this.write(new Uint8Array([0x1B, 0x45]));
    this.write(bold ? Bold.On : Bold.Off);
    return this;
  }

  public setItalic(italic: boolean = true): Printer {
    this.write(new Uint8Array([0x1B, 0x34]));
    this.write(italic ? Italic.On : Italic.Off);
    return this;
  }

  public setUnderline(value: Underline): Printer {
    this.write(new Uint8Array([0x1B, 0x2D]));
    this.write(value);
    return this;
  }

  public setAlignment(value: Align): Printer {
    this.write(new Uint8Array([0x1B, 0x61]));
    this.write(value);
    return this;
  }

  public setFont(value: Font = Font.A): Printer {
    this.write(new Uint8Array([0x1B, 0x21]));
    this.write(value);
    return this;
  }

  public cut(partial: boolean = false): Printer {
    this.write(partial ? Cut.PARTIAL : Cut.FULL);
    return this;
  }

  public setTextSize(value: Size = Size.Normal): Printer {
    this.write(value);
    return this;
  }

  public barcode(code: string,
                 type: Barcode = Barcode.EAN13,
                 position: Position = Position.Below,
                 height: BarcodeDims = BarcodeDims.Default_h,
                 width: BarcodeDims = BarcodeDims.Default_w): Printer {
    // Set position
    this.write(new Uint8Array([0x1D, 0x48]));
    this.write(position);

    // Set height
    this.write(BarcodeDims.Height);
    this.write(height);

    // Set width
    this.write(BarcodeDims.Width);
    this.write(width);

    // Print Barcode
    this.write(new Uint8Array([0x1D, 0x6B]));
    this.write(type);
    this.write(code);
    this.write(Basic.DATA_END);

    return this;
  }

  public qr(code: string,
            errorCorrect: QRErrorCorrectionLevel = QRErrorCorrectionLevel.AUTO,
            size: QRSize = QRSize.AUTO): Printer {

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
  }

  public raster(image: Image, mode: RasterMode = RasterMode.Normal): Printer {
    const header = new Uint8Array([0x1D, 0x70, 0x04, mode]);
    const raster = image.toRaster();
    this.buffer.write(header);
    this.buffer.writeUInt16LE(raster.width);
    this.buffer.writeUInt16LE(raster.height);
    this.buffer.write(raster.data);

    return this;
  }

  public async flush(): Promise<void> {
    await this.adapter.write(this.buffer.flush());
    return;
  }

  public async open(): Promise<Printer> {
    await this.adapter.open();
    return this;
  }

  public async close(): Promise<Printer> {
    await this.flush();
    await this.adapter.close();
    return this;
  }

  public clearBuffer(): Printer {
    this.buffer.clear();
    return this;
  }

  public writeLine(value: string, encoding?: string): Printer {
    return this.write(`${value}\n`, encoding);
  }

  public writeList(values: string[], encoding?: string): Printer {
    for (const value of values) {
      this.writeLine(value, encoding);
    }
    return this;
  }

  public write(value: string | Uint8Array | number, encoding?: string): Printer {
    if (typeof value === 'number')
      this.buffer.writeUInt8(value);
    else if (typeof value === 'string')
      this.buffer.write(iconv.encode(value, encoding || this.encoding));
    else
      this.buffer.write(value);

    return this;
  }
}