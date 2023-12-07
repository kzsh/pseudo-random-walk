import { PrngLibType} from '../types';
import {randomDeviation} from './utils';
const TRACKED_STEPS = 100;

export class Walker {
  x: Array<number> = [];
  y: Array<number> = [];
  context: CanvasRenderingContext2D;
  trackedSteps = TRACKED_STEPS;
  prngLib?: PrngLibType;

  constructor(
    context: CanvasRenderingContext2D, 
    {prngLib, x, y}: {
      prngLib?: PrngLibType
      x: number,
      y: number,
    }
  ) {
    this.context = context;
    this.prngLib = prngLib
    this.x[0] = x;
    this.y[0] = y;
  }

  move() {
    this.moveRandomly();
  }

  moveRandomly() {
    const lastX = this.x[this.x.length - 1];
    const lastY = this.y[this.y.length - 1];

    const nextX = lastX + randomDeviation({ prngLib: this.prngLib });
    const nextY = lastY + randomDeviation({ prngLib: this.prngLib });

    for (var i = 0, len = this.x.length; i < len; i++) {
      // if we've run out of buffered things, stop drawing
      if (!this.x[i]) {
        break;
      }

      this.drawLine(
        this.x[i],
        this.y[i],
        this.x[i + 1],
        this.y[i + 1],
        i,
        len
      );
    }

    this.x.push(nextX);
    this.y.push(nextY);

    if (this.x.length > TRACKED_STEPS) {
      this.x.shift();
    }

    if (this.y.length > TRACKED_STEPS) {
      this.y.shift();
    }
  }

  drawLine(x: number, y: number, nX: number, nY: number, i: number, len: number) {
    this.context.beginPath();

    if (this.prngLib === "crypto") {
      this.context.strokeStyle = "rgb(" + (i * 255) / len + ",0,0)";
    } else if (this.prngLib === "random") {
      this.context.strokeStyle = "rgb(0," + (i * 255) / len + ",0)";
    } else {
      this.context.strokeStyle = "rgb(0,0," + (i * 255) / len + ")";
    }
    this.context.moveTo(x, y);
    this.context.lineTo(nX, nY);
    this.context.stroke();
    this.context.closePath();
  }
};

