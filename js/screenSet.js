// screen placement...
// this determines how many screen partitions we support....
// first design was 3X3 screen...
// options are 3, 4, or 5...
//
//var GRID_SIZE = 4;
var margin = 28;

var hSquareSize = 0;
var wSquareSize = 0;

var hBiteSize = 0;
var wBiteSize = 0;

var topRow01 = 0;
var topRow02 = 0;
var topRow03 = 0;
var topRow04 = 0;
var topRow05 = 0;

var leftCol01 = 0;
var leftCol02 = 0;
var leftCol03 = 0;
var leftCol04 = 0;
var leftCol05 = 0;

var testPos = 1;

initScreen();

function getWSquareSize(){
  //console.log("s: " + wSquareSize);
  return wSquareSize;
}

function getHSquareSize(){
  //console.log("s: " + hSquareSize);
  return hSquareSize;
}

function getHBiteSize(){
  //console.log("b: " + hBiteSize);
  return hBiteSize;
}

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
      case 4: return Math.floor(leftCol04) + "px";
      case 5: return Math.floor(leftCol05) + "px";
      default: return "0px";
    }
}

function getTop(pos){
    switch(pos){
      case 1: return Math.floor(topRow01) + "px";
      case 2: return Math.floor(topRow02) + "px";
      case 3: return Math.floor(topRow03) + "px";
      case 4: return Math.floor(topRow04) + "px";
      case 5: return Math.floor(topRow05) + "px";
      default: return "0px";
    }
}

//offsets in quarters
function getTopOffset(pos, offset){
  var os;
  //console.log("offset: " + offset);
  switch(offset){
    case 0: os = 0; break;
    case 1: os = hBiteSize * 1; break;
    case 2: os = hBiteSize * 2; break;
    case 3: os = hBiteSize * 3; break;
    case 4: os = hBiteSize * 4; break;
    case 5: os = hBiteSize * 5; break;
    default: os = 0; break;
  }
  //console.log("os: " + os + " pos: " + pos);
  switch(pos){
    case 1: return Math.floor(topRow01 + os) + "px";
    case 2: return Math.floor(topRow02 + os) + "px";
    case 3: return Math.floor(topRow03 + os) + "px";
    case 4: return Math.floor(topRow04 + os) + "px";
    case 5: return Math.floor(topRow05 + os) + "px";
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
    case 4: os = wBiteSize * 4; break;
    case 5: os = wBiteSize * 5; break;
    default: os = 0; break;
  }

  switch(pos){
    case 1: return Math.floor(leftCol01 + os) + "px";
    case 2: return Math.floor(leftCol02 + os) + "px";
    case 3: return Math.floor(leftCol03 + os) + "px";
    case 4: return Math.floor(leftCol04 + os) + "px";
    case 5: return Math.floor(leftCol05 + os) + "px";
    default: return "0px";
  }
}

function initScreen(){
  var sWidth = screen.width;
  var sHeight = screen.height;

  wSquareSize = (sWidth - (2 * margin)) / GRID_SIZE;
  hSquareSize = (sHeight - (2 * margin)) / (GRID_SIZE - .3);

  topRow01 = (.2 * hSquareSize) + margin;
  topRow02 = (1.2 * hSquareSize) + margin;
  topRow03 = (2.2 * hSquareSize) + margin;
  topRow04 = (3.2 * hSquareSize) + margin;
  topRow05 = (4.2 * hSquareSize) + margin;

  leftCol01 = margin;
  leftCol02 = wSquareSize + margin;
  leftCol03 = (2 * wSquareSize) + margin;
  leftCol04 = (3 * wSquareSize) + margin;
  leftCol05 = (4 * wSquareSize) + margin;

  wBiteSize = wSquareSize / 4;
  hBiteSize = hSquareSize / 4;
}
