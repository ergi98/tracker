import { type SkPath, Skia } from "@shopify/react-native-skia";

type BoundObject = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

type Sample<T> = [T[keyof T], T[keyof T]];

// TOP, RIGHT, BOTTOM, LEFT
type Margins = [number, number, number, number];

export class LineGraph<T> {
  private data: T[];
  private path: SkPath;
  private width: number;
  private height: number;
  private label: keyof T;
  private value: keyof T;
  private margins: Margins;
  private pointGap: number;
  private samples: Sample<T>[];
  private dataBound: BoundObject;
  private canvasBound: BoundObject;

  constructor(
    data: T[],
    width: number,
    height: number,
    label: keyof T,
    value: keyof T,
    pointGap?: number,
    margins?: Margins
  ) {
    this.data = data;
    this.width = width;
    this.label = label;
    this.value = value;
    this.height = height;
    this.path = Skia.Path.Make();
    this.pointGap = pointGap ?? 10;
    this.margins = margins ?? [25, 10, 35, 35];

    this.samples = this.#getDataSamples();
    this.dataBound = this.#getDataBound();
    this.canvasBound = this.#getCanvasBound();
  }

  #remapValue(inp: [number, number], out: [number, number], val: number) {
    return this.#linearInterpolation(
      out[0],
      out[1],
      this.#inverseLinearInterpolation(inp[0], inp[1], val)
    );
  }

  #linearInterpolation(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  #inverseLinearInterpolation(a: number, b: number, v: number) {
    return (v - a) / (b - a);
  }

  #getCanvasBound = (): BoundObject => {
    return {
      top: this.margins[0],
      left: this.margins[3],
      bottom: this.height - this.margins[2],
      right: this.samples.length * this.pointGap - this.margins[1],
    };
  };

  #getDataBound = (): BoundObject => {
    const y = this.samples.map((s) => s[1] as number);

    const minY = Math.min(...y);
    const maxY = Math.max(...y);

    return {
      left: 0,
      top: maxY,
      bottom: minY,
      right: this.samples.length,
    };
  };

  #getDataSamples = (): Sample<T>[] => {
    return this.data.map((datum) => {
      return [datum[this.label], datum[this.value]];
    });
  };

  #getPoint(x: number, y: number) {
    return {
      x: this.#remapValue(
        [this.dataBound.left, this.dataBound.right],
        [this.canvasBound.left, this.canvasBound.right],
        x
      ),
      y: this.#remapValue(
        [this.dataBound.top, this.dataBound.bottom],
        [this.canvasBound.top, this.canvasBound.bottom],
        y
      ),
    };
  }

  getGraphPath = (): SkPath => {
    if (this.data.length === 0) return this.path;

    const { x, y } = this.#getPoint(0, this.samples[0][1] as number);
    this.path.moveTo(x, y);
    if (this.data.length <= 1) return this.path;

    for (let i = 1; i < this.data.length; i++) {
      const { x, y } = this.#getPoint(i, this.samples[i][1] as number);
      this.path.lineTo(x, y);
    }
    return this.path;
  };
}
