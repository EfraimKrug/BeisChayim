//buildPanel.js
var YahrList = JSON.parse(YahrzeitList);
var panelArray = [];

function buildPanel01(){
  var outLine;
  var lag = -1;
  var j = 0;
  panelArray = [];
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
        console.log(getColID(j) + vi);
        pbar.style.display = "none";
      }
    }
}

var currentPosition = 0;
function renderScreen(callback){
  var tf = TIME_FACTOR * 1000;
  var vi = 0;
  for(var row_count=0; (currentPosition < panelArray.length && row_count < ROW_COUNT); currentPosition++, row_count++){
      vi++;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      for(var j=0; j < COLUMN_COUNT; j++){
        if(!(panelArray[currentPosition][j])){
          currentPosition = 0;
          setTimeout(callback, tf);
          //callback();
          return;
        }
        //console.log(getColID(j) + vi);
        var pbar = document.getElementById(getColID(j) + vi);
        pbar.style.position = "absolute";
        pbar.style.left = getLeft(j+1);
        pbar.style.top = getTopOffset(calcRow(vi), calcOffset(vi));
        pbar.className = getBGround(panelArray[currentPosition][j]["PayLevel"]);
        pbar.setAttribute("onclick", "getEdit(" + (currentPosition + j) + ")" );

        pbar.style.width = "359px";
        pbar.style.height = "45px";
        pbar.style.font = "normal";
        pbar.style.padding = "5px";
        pbar.style.margin = "5px";
        pbar.style.display = "inline";
        pbar.style.zIndex = 5;
        //console.log(panelArray[currentPosition]);

        var dt = panelArray[currentPosition][j]["Date"];
        if(panelArray[currentPosition][j]["Date"].substring(0,1) == "0"){
          dt = panelArray[currentPosition][j]["Date"].substring(1);
        }
        pbar.innerHTML = panelArray[currentPosition][j]["Name"] + "<br>" + dt;

        if(currentPosition > panelArray.length - 2 ){
          currentPosition = 0;
          setTimeout(callback, tf);
          //callback();
          return;
        }
      }
    }
}