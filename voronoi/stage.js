const canvas = document.getElementById("mCanvas");
const context = canvas.getContext("2d");

const MAX_FPS = 60;
var prevTime = 0;

var points = genPoints(10);

var directrixY = 0;

canvas.addEventListener('mousemove', function(e) {
  const canvasRect = canvas.getBoundingClientRect();
  directrixY = e.clientY - canvasRect.top;
});

function mainLoop(timestamp) {
  if (timestamp < prevTime + (1000 / 60)) {
    requestAnimationFrame(mainLoop);
    return;
  }

  update();
  draw();

  requestAnimationFrame(mainLoop);
}

function update() {

}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawParabolas();
  drawDirectrix();
  drawPoints();
}

function drawParabolas() {
  for (var p = 0; p < points.length; p++) {
    if (points[p].y < directrixY)
      drawParabola(points[p].x, points[p].y);
  }
}

function drawParabola(centerX, centerY) {
  context.beginPath();
  context.strokeStyle = "#5f005f";
  var maxX = canvas.width - centerX;
  var minX = maxX - canvas.width;
  var px = minX;
  var py = 0;

  for (var x = 0; x <= canvas.width; x++) {
    if (x == Math.floor(minX)) {
      context.moveTo(Math.floor(minX), 0);
      continue;
    }

    var y = ((1 / (2 * (centerY - directrixY))) * Math.pow((x - centerX), 2)) + ((centerY + directrixY) / 2);
    context.quadraticCurveTo(px, py, x, y);

    px = x;
    py = y;
  }
  context.stroke();
}

function drawDirectrix() {
  context.strokeStyle = "#ffffff";
  context.beginPath();
  context.moveTo(0, directrixY);
  context.lineTo(canvas.width, directrixY);
  context.stroke();
}

function drawPoints() {
  for (var pIndex = 0; pIndex < points.length; pIndex++) {
    context.fillStyle = points[pIndex].colour;
    context.fillRect(points[pIndex].x, points[pIndex].y, 1, 1);
  }
}

function genPoints(num) {
  var tempPoints = [];
  for (var p = 0; p < num; p++) {
    var point = new Point(Math.random() * canvas.width,
                          Math.random() * canvas.height);
    tempPoints.push(point);
  }
  return tempPoints;
}

requestAnimationFrame(mainLoop);
