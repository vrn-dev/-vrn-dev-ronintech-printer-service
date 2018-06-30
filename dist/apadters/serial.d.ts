/// <reference types="serialport" />
import Adapter from './adapter';
import SerialPort from 'serialport';

export default class Serial extends Adapter {
  private device;

  constructor(path: string, options: SerialPort.OpenOptions);

  open(): Promise<void>;

  write(data: Uint8Array): Promise<void>;

  close(): Promise<void>;

  private throwIfNeeded(reason?);
}
