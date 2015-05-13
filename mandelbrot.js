var CANVAS_ELEMENT = document.getElementById("plot");
var CANVAS = CANVAS_ELEMENT.getContext("2d");

CANVAS_ELEMENT.width = window.innerWidth;
CANVAS_ELEMENT.height = window.innerHeight;

CANVAS_ELEMENT.addEventListener("mousedown", onClickEvent, false);

var CLICK_MAG = 10.0;
var MAX_ITER = 256;

var Dim = function(min_in, max_in, px_in) {
  this.min = min_in;
  this.max = max_in;
  this.numPixels = px_in;
};

Dim.prototype.getDelta = function() {
  return (this.max - this.min) / this.numPixels; 
}

Dim.prototype.matchResolution = function (otherDim) {
 this.min =
  this.max - (otherDim.max - otherDim.min) / otherDim.numPixels * this.numPixels;
}

Dim.prototype.magnify = function (eventPx) {
  var currentRange = this.max - this.min;
  var newRange = currentRange / CLICK_MAG;
  var clickCoord = this.min + currentRange / this.numPixels * eventPx;

  this.min = clickCoord - newRange / 2.0;
  this.max = clickCoord + newRange / 2.0;
}

var X_dim = new Dim(-2.5, 1.5, CANVAS_ELEMENT.width);
var Y_dim = new Dim(-1.0, 1.0, CANVAS_ELEMENT.height);
Y_dim.matchResolution(X_dim);

drawMandelbrotSet();

function onClickEvent() {
  X_dim.magnify(event.pageX);
  Y_dim.magnify(event.pageY);
  
  console.log("x_i: " + X_dim.min + " x_f: " + X_dim.max + " Y_dim.min: " + Y_dim.min + " y_f: " + Y_dim.max);

  drawMandelbrotSet();
}

function drawMandelbrotSet() {
  var dx = X_dim.getDelta();
  var dy = Y_dim.getDelta();

  var xCoord = 0;
  for (var i = X_dim.min; i < X_dim.max; i += dx) {
    var yCoord = 0;
    for (var j = Y_dim.min; j < Y_dim.max; j += dy) {

      var x = 0;
      var y = 0;
      var iter = 0;

      while (x*x + y*y <= 4 && iter < MAX_ITER) {
        var xTemp = x * x - y * y + i;
        y = 2 * x * y + j;
        x = xTemp;
        iter++;
      }

      if (iter == MAX_ITER) CANVAS.fillStyle = "#00FF00";
      else {
        var singleColorComponent = iter.toString(16);
        if (singleColorComponent.length == 1)
          singleColorComponent = "0" + singleColorComponent;
        CANVAS.fillStyle = "#00" + singleColorComponent + "00"; // Green
      }

      CANVAS.fillRect(xCoord, yCoord, 1, 1);

      yCoord++;
    }
    xCoord++;
  }
}

