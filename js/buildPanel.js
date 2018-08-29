//buildPanel.js
TIME_FACTOR = config.settings["time_factor"];
COLUMN_COUNT = config.settings["column_count"];
//COLUMN_COUNT = 3;
ROW_COUNT = config.settings["row_count"];

var YahrList = JSON.parse(YahrzeitList);
var MAX_SLOTS = config.settings["slots"]
var panelArray = [];

function buildPanel01(){
  var outLine;
  var lag = -1;
  var j = 0;
  //
  for(var i=0; i < YahrList.Yahrzeits.length; i++){
      if(j >= COLUMN_COUNT){
        j = 0;
      }
      if(j == 0){
        panelArray.push([]);
      }
      var n = i / COLUMN_COUNT;
      n = Math.floor(n);
      panelArray[n].push({"ID":"","Name":"", "Date":"", "PayLevel":""});
      panelArray[n][j]["ID"] = YahrList.Yahrzeits[i].ID;
      panelArray[n][j]["Name"] = YahrList.Yahrzeits[i].HName;
      panelArray[n][j]["Date"] = YahrList.Yahrzeits[i].HDate;
      panelArray[n][j]["PayLevel"] = YahrList.Yahrzeits[i].PayLevel;
      if(!YahrList.Yahrzeits[i].HName)
  	     panelArray[n][j]["Name"] = YahrList.Yahrzeits[i].Name;
      j++;
  }
  //console.log(panelArray);
}

function getColID(idx){
  //console.log("n" + idx);
  switch(idx){
    case 0: return "pbarA";
    case 1: return "pbarB";
    case 2: return "pbarC";
    case 3: return "pbarD";
    case 4: return "pbarE";
  }
}

function calcRow(i){
  if(i < 4) return 1;
  if(i < 8) return 2;
  if(i < 12) return 3;
  if(i < 16) return 4;
  return calcRow(i -16);
}

function calcOffset(i){
    return i % 4;
}

function renderingPlaques(callback){
    //console.log("In renderingPlaques: " + currentPosition + ":" + panelArray.length);
  	var tf = TIME_FACTOR * 1000;
  	PlaqueInterval = setInterval( function(){ if(currentPosition > panelArray.length){ currentPosition = 0; return 0;}; renderScreen(callback); }, tf);
}

function getEdit(idx){
  currentName = idx;
  startEdit();
}

function hideScreen02(){
  var vi = 0;
  for(var x=0; x < 12; x++){
      vi++;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      for(var j=0; j < 5; j++){
        var pbar = document.getElementById(getColID(j) + vi);
        //console.log(j + ":" + vi + ":" + getColID(j) + vi);
        pbar.style.display = "none";
      }
    }
}

var currentPosition = 0;
function renderScreen(callback){
  //console.log(panelArray[815][0]);
  var vi = 0;
  for(var x=0; (currentPosition < panelArray.length && x < ROW_COUNT); currentPosition++, x++){
      vi++;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      for(var j=0; j < COLUMN_COUNT; j++){
        //console.log(getColID(j) + vi);
        var pbar = document.getElementById(getColID(j) + vi);
        pbar.style.position = "absolute";
        pbar.style.left = getLeft(j+1);
        pbar.style.top = getTopOffset(calcRow(vi), calcOffset(vi));
        //console.log("top: " + pbar.style.top);
        pbar.className = getBGround(YahrList.Yahrzeits[currentPosition+j].PayLevel);
        //pbar.setAttribute("onclick", "alert(" + YahrList.Yahrzeits[currentPosition+j].ID + ")" );
        pbar.setAttribute("onclick", "getEdit(" + (currentPosition + j) + ")" );

        //pbar.style.width = "359px";
        pbar.style.width = getWSquareSize() + "px";
        //pbar.style.height = "45px";
        pbar.style.height = getHBiteSize() + "px";
        pbar.style.font = "normal";
        pbar.style.fontSize = (getHBiteSize() / 4) + "px";
        pbar.style.padding = "5px";
        pbar.style.margin = "0px";
        pbar.style.display = "inline";
        //console.log("j: " + j + " currenPosition: " + currentPosition + "  panelArray[currentPosition]" +  panelArray[currentPosition]);
        var dt = panelArray[currentPosition][j]["Date"];
        if(panelArray[currentPosition][j]["Date"].substring(0,1) == "0"){
          dt = panelArray[currentPosition][j]["Date"].substring(1);
        }
        if(currentPosition > panelArray.length - 2  || !(panelArray[currentPosition][j])){
          currentPosition = 0;
          callback();
        }
        pbar.innerHTML = panelArray[currentPosition][j]["Name"] + "<br>" + dt;
      }
    }
}
