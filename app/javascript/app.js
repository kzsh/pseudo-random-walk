require("../stylesheets/app.css");

import makeGetNumber from "./seeded-prng";
// noprotect
// jshint esnext:true
const SEED = 12345123;
const getNumForSeed = makeGetNumber(SEED);
const SEED_LENGTH = String(SEED).length;
const MAX_SEED = (function() {
  var max = "";
  for (let i = 0; i < SEED_LENGTH; i++) {
    max += "9";
  }

  return max;
})();
const MAX_UINT32 = 4294967295;
const TRACKED_STEPS = 100;
const cryptoPRNGContainer = new Uint32Array(1);
function randomDeviation({ prngLib } = {}) {
  let prn;

  if (prngLib === "crypto") {
    window.crypto.getRandomValues(cryptoPRNGContainer);
    prn = cryptoPRNGContainer[0] / MAX_UINT32;
  } else if (prngLib === "random") {
    prn = Math.random();
  } else {
    prn = getNumForSeed() / MAX_SEED;
  }

  return prn > 0.5 ? 1 : -1;
}
const entities = [];

const Walker = function Walker(context, options) {
  const _defaultOptions = {
    context: context,
    x: [],
    y: []
  };

  Object.assign(this, _defaultOptions, options);
};

const prototype = {
  move() {
    this.moveRandomly();
  },

  _trackedSteps: TRACKED_STEPS,
  prngLib: false,

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
        this.context,
        this,
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

    if (this.x.length > this._trackedSteps) {
      this.x.shift();
    }

    if (this.y.length > this._trackedSteps) {
      this.y.shift();
    }
  },

  drawLine(context, walker, x, y, nX, nY, i, len) {
    context.beginPath();

    if (walker.prngLib === "crypto") {
      context.strokeStyle = "rgb(" + (i * 255) / len + ",0,0)";
    } else if (walker.prngLib === "random") {
      context.strokeStyle = "rgb(0," + (i * 255) / len + ",0)";
    } else {
      context.strokeStyle = "rgb(0,0," + (i * 255) / len + ")";
    }
    context.moveTo(x, y);
    context.lineTo(nX, nY);
    context.stroke();
    context.closePath();
  }
};

Object.assign(Walker.prototype, prototype);

function draw(context) {
  entities.forEach(function(entity) {
    entity.move();
  });
}

function setup() {
  const canvas = configureCanvas();
  setupLoop(canvas)();
}

function configureCanvas() {
  const canvas = document.createElement("canvas");
  const height = document.getElementById("container").clientHeight;
  const width = document.getElementById("container").clientWidth;
  canvas.width = width;
  canvas.height = height;
  document.getElementById("container").appendChild(canvas);
  return canvas;
}

function setupLoop(canvas) {
  const context = canvas.getContext("2d");
  let lastTime = new Date().getTime(),
    fps = 60,
    cw = canvas.width,
    ch = canvas.height;

  //TODO: automatically space starting place
  entities.push(
    new Walker(canvas.getContext("2d"), {
      prngLib: "crypto",
      x: [Math.floor(cw / 4)],
      y: [Math.floor(ch / 2)]
    })
  );

  entities.push(
    new Walker(canvas.getContext("2d"), {
      prngLib: "random",
      x: [Math.floor(cw / 2)],
      y: [Math.floor(ch / 2)]
    })
  );

  entities.push(
    new Walker(canvas.getContext("2d"), {
      prngLib: null,
      x: [Math.floor((cw * 3) / 4)],
      y: [Math.floor(ch / 2)]
    })
  );

  var accumTime = 0;

  function gameLoop() {
    const currentTime = new Date().getTime();
    const delta = (currentTime - lastTime) / 1000;

    window.requestAnimationFrame(gameLoop);
    //context.clearRect(0, 0, cw, cw);
    draw(context);
    lastTime = currentTime;
  }
  return gameLoop;
}

window.onload = setup;

// ISSUES:
// - redrawn segments flicker until hypothetically, we start shifting as we push items onto the array (some kind of optimization?).
