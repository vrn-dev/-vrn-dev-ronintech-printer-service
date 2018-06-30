export default abstract class Adapter {
  abstract open(): Promise<void>;

  abstract write(data: Uint8Array): Promise<void>;

  abstract close(): Promise<void>;
}
