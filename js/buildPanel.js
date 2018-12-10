//buildPanel.js
//TIME_FACTOR = config.settings["time_factor"];
//COLUMN_COUNT = config.settings["column_count"];
//COLUMN_COUNT = 3;
//ROW_COUNT = config.settings["row_count"];

var YahrList = JSON.parse(YahrzeitList);
var panelArray = [];

function fixDate(dt){
  var year = "";
  var d = dt.trim();
  d = d.replace(/\s+/g, "?");
  d = d.replace(/\,+/g, "?");
  d = d.replace(/&comma;/g, "?");
  d = d.replace(/[?]+/g, "?");

  var dArray = d.split('?');
  if(dArray.length > 2){
    dArray[1] = dArray[1].toLowerCase().indexOf('eve') > -1 ? 'Tevet': dArray[1];
    return dArray[0] + " " + dArray[1] + ", " + dArray[2];
  }

  return dArray[0] + " " + dArray[1];
}

function checkToday(checkDate){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	currentMonth = htoday.month;
	var dateHold = fixDate(checkDate);
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
				return true;
			}
		}
	return false;
}

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
      panelArray[n].push({"ID":"","Name":"", "Date":"", "PayLevel":"", "IDX":""});
      panelArray[n][j]["ID"] = YahrList.Yahrzeits[i].ID;
      panelArray[n][j]["IDX"] = i;
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
    case 5: return "pbarF";
    case 6: return "pbarG";
    case 7: return "pbarH";
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
  currentIDX = idx;
  doEdit();
}

function hideScreen02(){
  var vi = 0;
  for(var x=0; x < 12; x++){
      vi++;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      for(var j=0; j < 5; j++){
        var pbar = document.getElementById(getColID(j) + vi);
        //console.log(getColID(j) + vi);
        pbar.style.display = "none";
      }
    }
}

var currentPosition = 0;
function renderScreen(callback){
  hideScreen02();
  var tf = TIME_FACTOR * 1000;
  var vi = 0;

  for(var row_count=0; (currentPosition < panelArray.length && row_count < ROW_COUNT); currentPosition++, row_count++){
      //console.log("top: " + currentPosition + ":" + row_count + ":" + panelArray.length);
      vi = parseInt(vi) + 2;
      if(vi < 10) vi = "0" + vi;
      if(vi > 12) vi = "01";
      //console.log(vi);
      for(var j=0; j < COLUMN_COUNT; j++){
        if(!(panelArray[currentPosition][j])){
          currentPosition = 0;
          setTimeout(callback, tf);
          return;
        }

        var pbar = document.getElementById(getColID(j) + vi);
        //console.log(getColID(j) + ":" + vi);
        pbar.style.position = "absolute";
        //pbar.style.left = getLeft(j+1);
        pbar.style.left = getColumnOffset(j);

        //pbar.style.top = getTopOffset(calcRow(vi), calcOffset(vi));
        pbar.style.top = getTopOffset(row_count);
        //console.log(vi + ":" + getTopOffset(calcRow(vi), calcOffset(vi)));
        pbar.className = getBGround(panelArray[currentPosition][j]["PayLevel"]);
        pbar.setAttribute("onclick", "getEdit(" + panelArray[currentPosition][j]["IDX"] + ")" );

        pbar.style.width = getPanelBoxWidth() + "px";
        pbar.style.height = getPanelBoxHeight() + "px";
        pbar.style.font = "normal";

        pbar.style.fontSize = getPanelFont() + "px";
        if(panelArray[currentPosition][j]["Name"].length > 28){
          pbar.style.fontSize = (getPanelFont() - 2) + "px";
        }

        pbar.style.padding = "3px";
        pbar.style.margin = "0px";
        pbar.style.display = "inline";
        pbar.style.zIndex = 5;
        //console.log(pbar.style.width + ":" + pbar.style.left);
        var dt = panelArray[currentPosition][j]["Date"];
        if(panelArray[currentPosition][j]["Date"].substring(0,1) == "0"){
          dt = panelArray[currentPosition][j]["Date"].substring(1);
        }
        pbar.innerHTML = panelArray[currentPosition][j]["Name"] + "<br>" + dt;
        pbar.style.border = "1px solid black";
        if(checkToday(dt)){
          pbar.style.borderTop = "2px solid red";
          pbar.style.borderLeft = "2px solid red";
        }
        tempID = panelArray[currentPosition][j]["IDX"];

        if(currentPosition > panelArray.length - 2 ){
          currentPosition = 0;
          setTimeout(callback, tf);
          return;
        }
      }
    }
}
