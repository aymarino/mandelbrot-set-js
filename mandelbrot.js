var CANVAS_ELEMENT = document.getElementById("plot");
var CANVAS = CANVAS_ELEMENT.getContext("2d");

CANVAS_ELEMENT.width = window.innerWidth;
CANVAS_ELEMENT.height = CANVAS_ELEMENT.width/2;

CANVAS_ELEMENT.addEventListener("mousedown", onClickEvent, false);

var clickMagnification = 10.0;

var x_i = -2.5;
var x_f = 1.5;
var y_i = -1.0;
var y_f = 1.0;

drawMandelbrotSet();

function drawMandelbrotSet() {
  var MAX_ITER = 50;

  var dx = (x_f - x_i) / CANVAS_ELEMENT.width;
  var dy = (y_f - y_i) / CANVAS_ELEMENT.height;

  var xCoord = 0;
  for (var i = x_i; i < x_f; i += dx) {
    var yCoord = 0;
    for (var j = y_i; j < y_f; j += dy) {

      var x = 0;
      var y = 0;
      var iter = 0;

      while (iter < MAX_ITER && x*x + y*y <= 4) {
        var xTemp = x * x - y * y + i;
        y = 2 * x * y + j;
        x = xTemp;
        iter++;
      }

      if (iter == MAX_ITER) CANVAS.fillStyle = "#000000";
      else {
        CANVAS.fillStyle = "#" + (iter % 16 * 0x100000).toString(16);
      }

      CANVAS.fillRect(xCoord, yCoord, 1, 1);

      yCoord++;
    }
    xCoord++;
  }
}

function onClickEvent() {
  var cur_x_range = x_f - x_i;
  var cur_y_range = y_f - y_i;

  var new_x_range = cur_x_range / clickMagnification;
  var new_y_range = cur_y_range / clickMagnification;

  var click_x = x_i + cur_x_range / CANVAS_ELEMENT.width * event.pageX;
  var click_y = y_i + cur_y_range / CANVAS_ELEMENT.height * event.pageY;

  x_i = click_x - new_x_range / 2.0;
  x_f = click_x + new_x_range / 2.0;

  y_i = click_y - new_y_range / 2.0;
  y_f = click_y + new_y_range / 2.0;

  console.log("x_i: " + x_i + " x_f: " + x_f + " y_i: " + y_i + " y_f: " + y_f);

  drawMandelbrotSet();
}
