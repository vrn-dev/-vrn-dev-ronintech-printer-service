import Adapter from './adapter';
import { Device, findByIds, getDeviceList, Interface, on as addEventListener, OutEndpoint } from 'usb';

const PRINTER_CLASS = 0x07;

export default class Usb extends Adapter {
  private device!: Device | null;
  private endpoint!: OutEndpoint | null;

  constructor(private vid?: number,
              private pid?: number) {
    super();
    addEventListener('detach', (device: Device) => {
      if (device === this.device)
        this.device.close();
    });
  }

  private static findDeviceOrThrow(vid?: number, pid?: number): Device {
    if (vid && pid)
      return findByIds(vid, pid);
    else {
      const devices = Usb.getPrinterDevices(vid);
      if (devices.length > 0) {
        return devices[0];
      }
    }
    throw new Error('No printer found');
  }

  private static getPrinterDevices(vid?: number): Device[] {
    return getDeviceList()
      .filter(device => !vid || device.deviceDescriptor.idVendor === vid)
      .filter(device => {
        try {
          device.open();
          return device.interfaces.some((iface: Interface) => iface.descriptor.bInterfaceClass === PRINTER_CLASS);
        } catch (e) {
          console.log(e); // Make Logger
          return false;
        } finally {
          device.close();
        }
      });
  }

  public async open(): Promise<void> {
    return new Promise<void>(resolve => {
      this.device = Usb.findDeviceOrThrow(this.vid, this.pid);
      this.device.open();
      this.device.interfaces.forEach(iface => {
        iface.claim();
        iface.endpoints.filter(endpoint => {
          if (endpoint.direction === 'out') {
            this.endpoint = endpoint as OutEndpoint;
            resolve();
          }
        });
      });
      this.throwIfNeeded('Cannot open printer');
    });
  }

  public async write(data: Uint8Array): Promise<void> {
    return new Promise<void>(resolve => {
      this.throwIfNeeded();
      if (this.endpoint)
        this.endpoint.transfer(new Buffer(data), err => {
          if (err)
            throw new Error('Failed to write data to USB device');
          resolve();
        });
    });
  }

  public async close(): Promise<void> {
    this.throwIfNeeded();
    if (this.device) this.device.close();
    this.device = null;
    this.endpoint = null;
  }

  private throwIfNeeded(reason?: string) {
    if (!this.device || !this.endpoint) {
      throw new Error(reason || 'USB Device is not open');
    }
  }
}