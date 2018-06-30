import Adapter from './adapter';
import { Socket } from 'net';

export interface IEndpoint {
  address: string;
  port: number;
}

export default class Network extends Adapter {
  private retrying: boolean;
  private options: IEndpoint;
  private device: Socket;
  private connected: boolean;

  constructor(address: string,
              port: number = 9100,
              private retries: number = 0) {
    super();
    this.device = new Socket();
    this.retrying = false;
    this.connected = false;
    this.options = {
      address,
      port
    };

    this.device.on('close', () => {
      this.connected = false;
      if (this.retrying && (retries === 0 || this.retries < retries)) {
        this.retries++;
        setTimeout(() => {
          this.device.connect(this.options.port, this.options.address);
        }, 5000);
      } else {
        this.retrying = false;
        throw new Error(`Cannot connect to ${this.options.address}:${this.options.port}`);
      }
    });

    this.device.on('error', () => this.connected = false);
  }

  public async open(): Promise<void> {
    return new Promise<void>(resolve => {
      this.retrying = true;
      this.device.connect(this.options.port, this.options.address);
      this.device.on('connect', () => {
        this.retrying = false;
        this.connected = true;
        resolve();
      });
    });
  }

  public async write(data: Uint8Array): Promise<void> {
    return new Promise<void>(resolve => {
      this.throwIfNeeded();
      this.device.write(new Buffer(data), resolve);
    });
  }

  public async close(): Promise<void> {
    this.throwIfNeeded();
    this.retrying = false;
    this.connected = false;
    this.device.destroy();
  }


  private throwIfNeeded(reason?: string) {
    if (!this.device || !this.connected) {
      throw new Error(reason || 'The network socket is not open. Cannot Close');
    }
  }
}