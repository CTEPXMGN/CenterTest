// import { data } from "./data.js";
import {
  CANVAS,
  WIDTH,
  HEIGHT,
  PADDING,
  DPI_HEIGHT,
  DPI_WIDTH,
  VIEW_HEIGHT,
  ROWS_COUNT,
  URL,
  PERSONS_COLOR,
} from "./variables.js";

let personsData = {
  y1: [[]],
  y2: [[]],
  y3: [[]],
};

let timerId = setInterval(() => getData(), 5000);
setTimeout(() => clearInterval(timerId), 600000);

async function getData() {
  try {
    let response = await fetch(URL);

    if (response.ok) {
      let dataChart = await response.json();
      updateData(dataChart, personsData);
    }
  } catch (error) {
    console.log(error);
  }
}

let x = 0;

function updateData(data, personsData) {
  for (let i = 0; i < data.length; i++) {
    const yCoord = data[i].match(/\d+.\d+/)[0];

    //   Имитация получения разных чисел с бекенда
    const y = Math.random() * 5 * yCoord;
    personsData["y" + (i + 1)].push([x, y]);
  }
  x += 25;

  chart(CANVAS, personsData);
}

function chart(canvas, data) {
  const ctx = canvas.getContext("2d");
  canvas.style.minWidth = WIDTH + "px";
  canvas.style.height = HEIGHT + "px";
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  for (let item in data) {
    drawLine(ctx, data[item]);
  }
}

function drawLine(ctx, data) {
  ctx.beginPath();
  for (const [x, y] of data) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = PERSONS_COLOR[0];
    ctx.lineTo(x, DPI_HEIGHT - PADDING - y);
  }
  ctx.stroke();
  ctx.closePath();
}
