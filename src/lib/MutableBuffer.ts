export default class MutableBuffer {
  private buffer: Uint8Array;

  constructor(private size: number = 1024) {
    this.buffer = new Uint8Array(size);
    this.clear();
  }

  public clear(): void {
    this.size = 0;
  }

  public flush(): Uint8Array {
    const buffer = new Uint8Array(this.buffer.slice(0, this.size));
    this.clear();
    return buffer;
  }

  public write(data: ArrayLike<number>): MutableBuffer {
    this.resizeIfNeeded(data.length);
    this.buffer.set(data, this.size);
    this.size += data.length;
    return this;
  }

  public writeUInt32LE(value: number, noAssert?: boolean): MutableBuffer {
    this.resizeIfNeeded(4);
    this.buffer[this.size++] = (value) & 0xFF;
    this.buffer[this.size++] = (value >> 8) & 0xFF;
    this.buffer[this.size++] = (value >> 16) & 0xFF;
    this.buffer[this.size++] = (value >> 24) & 0xFF;
    return this;
  }

  public writeUInt16LE(value: number, noAssert?: boolean): MutableBuffer {
    this.resizeIfNeeded(2);
    this.buffer[this.size++] = (value) & 0xFF;
    this.buffer[this.size++] = (value >> 8) & 0xFF;
    return this;
  }

  public writeUInt8(value: number, noAssert?: boolean): MutableBuffer {
    this.resizeIfNeeded(1);
    this.buffer[this.size++] = (value) & 0xFF;
    return this;
  }


  private resizeIfNeeded(need: number) {
    const remaining = this.buffer.length - this.size;
    if (remaining < need) {
      const oldBuffer = this.buffer;
      const factor = Math.ceil((need - remaining) / oldBuffer.length) + 1;
      this.buffer = new Uint8Array(oldBuffer.length * factor);
      this.buffer.set(oldBuffer, 0);
    }
  }
}