import {Walker} from '../entities/Walker'

export function configureCanvas(container: HTMLDivElement) {
  const canvas = document.createElement("canvas");
  const height = container.clientHeight;
  const width = container.clientWidth;
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);
  return canvas;
}

const entities: Array<Walker> = [];
export function setupLoop(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  if(!context) {
    console.error('Could not get context from canvas');
    return;
  }

  let lastTime = new Date().getTime(),
    // fps = 60,
    cw = canvas.width,
    ch = canvas.height;

  //TODO: automatically space starting place
  entities.push(
    new Walker(context, {
      prngLib: "crypto",
      x: Math.floor(cw / 4),
      y: Math.floor(ch / 2)
    })
  );

  entities.push(
    new Walker(context, {
      prngLib: "random",
      x: Math.floor(cw / 2),
      y: Math.floor(ch / 2)
    })
  );

  entities.push(
    new Walker(context, {
      prngLib: undefined,
      x: Math.floor((cw * 3) / 4),
      y: Math.floor(ch / 2)
    })
  );

  var accumTime = 0;

  function gameLoop() {
    const currentTime = new Date().getTime();
    const delta = (currentTime - lastTime) / 1000;

    window.requestAnimationFrame(gameLoop);
    //context.clearRect(0, 0, cw, cw);
    if(context) {
      draw(context);
    }
    lastTime = currentTime;
  }
  gameLoop();
}

function draw(context: CanvasRenderingContext2D) {
  entities.forEach(function(entity) {
    entity.move();
  });
}
