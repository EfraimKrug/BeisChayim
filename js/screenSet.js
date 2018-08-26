// screen placement...
var margin = 28;

var hSquareSize = 0;
var wSquareSize = 0;

var hBiteSize = 0;
var wBiteSize = 0;

var topRow01 = 0;
var topRow02 = 0;
var topRow03 = 0;

var leftCol01 = 0;
var leftCol02 = 0;
var leftCol03 = 0;

var testPos = 1;

initScreen();

function check(){
  var test = document.getElementById("test");
  test.style.left = getLeftOffset(testPos, 10);
  test.style.top = getTopOffset(testPos, 10);
  testPos++;
}

function getLeft(pos){
    switch(pos){
      case 1: return Math.floor(leftCol01) + "px";
      case 2: return Math.floor(leftCol02) + "px";
      case 3: return Math.floor(leftCol03) + "px";
      default: return "0px";
    }
}

function getTop(pos){
    switch(pos){
      case 1: return Math.floor(topRow01) + "px";
      case 2: return Math.floor(topRow02) + "px";
      case 3: return Math.floor(topRow03) + "px";
      default: return "0px";
    }
}

//offsets in quarters
function getTopOffset(pos, offset){
  var os;
  //console.log("offset: " + offset);
  switch(offset){
    case 0: os = 0; break;
    case 1: os = hBiteSize; break;
    case 2: os = hBiteSize * 2; break;
    case 3: os = hBiteSize * 3; break;
    default: os = 0; break;
  }
  //console.log("os: " + os + " pos: " + pos);
  switch(pos){
    case 1: return Math.floor(topRow01 + os) + "px";
    case 2: return Math.floor(topRow02 + os) + "px";
    case 3: return Math.floor(topRow03 + os) + "px";
    default: return "0px";
  }
}

function getLeftOffset(pos, offset){
  var os;
  //console.log("wBiteSize: " + wBiteSize + "leftCol01(" + leftCol01 + ") leftCol02(" + leftCol02 + ")");
  switch(offset){
    case 0: os = 0; break;
    case 1: os = wBiteSize; break;
    case 2: os = wBiteSize * 2; break;
    case 3: os = wBiteSize * 3; break;
    default: os = 0; break;
  }

  switch(pos){
    case 1: return Math.floor(leftCol01 + os) + "px";
    case 2: return Math.floor(leftCol02 + os) + "px";
    case 3: return Math.floor(leftCol03 + os) + "px";
    default: return "0px";
  }
}

function initScreen(){
  var sWidth = screen.width;
  var sHeight = screen.height;

  wSquareSize = (sWidth - (2 * margin)) / 3;
  hSquareSize = (sHeight - (2 * margin)) / 3;

  topRow01 = leftCol01 = margin;
  topRow02 = hSquareSize + margin;
  topRow03 = (2 * hSquareSize) + margin;
  leftCol02 = wSquareSize + margin;
  leftCol03 = (2 * wSquareSize) + margin;

  wBiteSize = wSquareSize / 4;
  hBiteSize = hSquareSize / 4;
}
