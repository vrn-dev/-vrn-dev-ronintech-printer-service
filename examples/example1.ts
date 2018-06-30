import { Usb } from '../src/lib/apadters/adapters';
import Printer from '../src/lib/printer';
import { Align, Size } from '../src/lib/commands/custom-biz';

async function test() {
  try {
    const usbAdapter = new Usb();
    const printer = await new Printer(usbAdapter).open();

    await printer.init()
      .resetToDefault()
      .setAlignment(Align.Center)
      .setTextSize(Size.Double)
      .writeLine('SOME CAR PARK')
      .feed(2)
      .setTextSize(Size.Normal)
      .writeLine('TRN: 3123124131')
      .qr('http://ronintech.me/')
      .barcode('1234567890128')
      .cut()
      .close();
  } catch (e) {
    console.log(e);
  }
}

test();