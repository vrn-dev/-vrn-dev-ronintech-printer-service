import Adapter from './adapter';

export default class Usb extends Adapter {
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
