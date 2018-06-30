export interface IRaster {
  data: Uint8Array;
  height: number;
  width: number;
}

export default class Image {
  width: number;
  height: number;
  private data;

  constructor(pixels: boolean[], width: number, height: number);

  static load(path: string): Promise<Image>;

  toRaster(): IRaster;
}
