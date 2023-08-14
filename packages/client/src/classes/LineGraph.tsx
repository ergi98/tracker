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

export default class LineGraph<T> {
  private data: T[];
  private width: number;
  private height: number;
  private label: keyof T;
  private value: keyof T;
  private margins: Margins;
  private pointGap: number;
  private samples: Sample<T>[] = [];
  private dataBound: BoundObject = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  private canvasBound: BoundObject = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  private privatePath: SkPath = Skia.Path.Make();
  private privateYAxis: SkPath = Skia.Path.Make();
  private privateXAxis: SkPath = Skia.Path.Make();

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
    this.pointGap = pointGap ?? 10;
    this.margins = margins ?? [25, 10, 35, 35];

    this.#getDataSamples();
    this.#getDataBound();
    this.#getCanvasBound();

    this.#getGraphPath();
    this.#getYAxis();
    this.#getXAxis();
  }

  get path() {
    return this.privatePath;
  }

  get yAxis() {
    return this.privateYAxis;
  }

  get xAxis() {
    return this.privateXAxis;
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

  #getCanvasBound = () => {
    this.canvasBound = {
      top: this.margins[0],
      left: this.margins[3],
      bottom: this.height - this.margins[2],
      right: this.samples.length * this.pointGap - this.margins[1],
    };
  };

  #getDataBound = () => {
    const y = this.samples.map((s) => s[1] as number);

    const minY = Math.min(...y);
    const maxY = Math.max(...y);

    this.dataBound = {
      left: 0,
      top: maxY,
      bottom: minY,
      right: this.samples.length,
    };
  };

  #getDataSamples = () => {
    this.samples = this.data.map((datum) => {
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

  #getGraphPath = () => {
    if (this.data.length === 0) return this.privatePath;

    const { x, y } = this.#getPoint(0, this.samples[0][1] as number);
    this.privatePath.moveTo(x, y);
    if (this.data.length <= 1) return this.privatePath;

    for (let i = 1; i < this.data.length; i++) {
      const { x, y } = this.#getPoint(i, this.samples[i][1] as number);
      this.privatePath.lineTo(x, y);
    }
  };

  #getYAxis = () => {
    this.privateYAxis.moveTo(this.margins[3] / 2, this.margins[0]);
    this.privateYAxis.lineTo(
      this.margins[3] / 2,
      this.height - this.margins[2]
    );
  };

  #getXAxis = () => {
    this.privateYAxis.moveTo(
      this.margins[3],
      this.height - this.margins[0]
    );
    this.privateYAxis.lineTo(this.width, this.height - this.margins[0]);
  };
}
