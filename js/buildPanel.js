//buildPanel.js
//TIME_FACTOR = config.settings["time_factor"];
//COLUMN_COUNT = config.settings["column_count"];
//COLUMN_COUNT = 3;
//ROW_COUNT = config.settings["row_count"];

var YahrList = JSON.parse(YahrzeitList);
var panelArray = [];

function fixDate(dt){
  if(dt.trim() == ""){
    return "NONE";
  }
  var year = "";
  var d = dt.trim();
  d = d.replace(/Adar II/g, "AdarII");
  d = d.replace(/\s+/g, "?");
  d = d.replace(/\,+/g, "?");
  d = d.replace(/&amp;/g, "&");
  d = d.replace(/&comma/g, "?");
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
	//currentMonth = htoday.month;
  setCurrentMonth();
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
      panelArray[n][j]["Date"] = fixDate(YahrList.Yahrzeits[i].HDate);
      panelArray[n][j]["PayLevel"] = YahrList.Yahrzeits[i].PayLevel;
      if(!YahrList.Yahrzeits[i].HName)
  	     panelArray[n][j]["Name"] = YahrList.Yahrzeits[i].Name;
      j++;
  }
}

function getColID(idx){
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
      for(var j=0; j < 8; j++){
        var pbar = document.getElementById(getColID(j) + vi);
        pbar.style.display = "none";
      }
    }
}


var renderingPlaquesX = function (cb){
    var currPos = -1;
    var callback = cb;
    var actions = {
        renderScreen: function (){
            var vi = 0;
            for(var row_count=0; row_count < ROW_COUNT; row_count++){
                currPos++;
                vi = parseInt(vi) + 2;
                if(vi < 10) vi = "0" + vi;
                if(vi > 12) vi = "01";
                for(var j=0; j < COLUMN_COUNT; j++){
                  if(panelArray.length <= currPos){
                    this.renderBox(currPos-1, panelArray[currPos-1].length, vi, row_count);
                    currPos = -1;
                    callback();
                    return;
                  }
                  if(panelArray[currPos].length <= j){
                    this.renderBox(currPos, j-1, vi, row_count);
                    currPos = -1;
                    callback();
                    return;
                  }
                  this.renderBox(currPos, j, vi, row_count);
                }
              }
            },
            // panelArray position; screen column, element name, screen row...
            renderBox: function(currPos, j, vi, row_count){
                  if(currPos >= panelArray.length || j >= panelArray[currPos].length){
                    return;
                  }
                  var pbar = document.getElementById(getColID(j) + vi);
                  pbar.style.position = "absolute";
                  pbar.style.left = getColumnOffset(j);

                  pbar.style.top = getTopOffset(row_count);
                  pbar.className = getBGround(panelArray[currPos][j]["PayLevel"]);
                  if(RunPhaseEdit()){
                    pbar.setAttribute("onclick", "getEdit(" + panelArray[currPos][j]["IDX"] + ")" );
                  }

                  pbar.style.width = getPanelBoxWidth() + "px";
                  pbar.style.height = getPanelBoxHeight() + "px";
                  pbar.style.font = "normal";

                  pbar.style.fontSize = getPanelFont() + "px";
                  if(panelArray[currPos][j]["Name"].length > 28){
                    pbar.style.fontSize = (getPanelFont() - 2) + "px";
                  }

                  pbar.style.padding = "3px";
                  pbar.style.margin = "0px";
                  pbar.style.display = "inline";
                  pbar.style.zIndex = 5;

                  var dt = panelArray[currPos][j]["Date"];
                  if(panelArray[currPos][j]["Date"].substring(0,1) == "0"){
                    dt = panelArray[currPos][j]["Date"].substring(1);
                  }
                  pbar.innerHTML = panelArray[currPos][j]["Name"] + "<br>" + dt;
                  if(pbar.innerHTML.indexOf("undefined") > -1){
                    pbar.innerHTML = pbar.innerHTML.substring(0,pbar.innerHTML.indexOf("undefined"));
                  }
                  pbar.style.border = "1px solid black";
                  if(checkToday(dt)){
                    pbar.style.border = "2px solid orange";
                    pbar.style.zIndex = 10;
                    pbar.style.padding = "10px";
                    pbar.style.width = (getPanelBoxWidth() - 16) + "px";
                    pbar.style.height = (getPanelBoxHeight() - 8) + "px";
                    pbar.style.top = (getTopOffsetInt(row_count) - 4) + "px";
                    pbar.style.left = (getColumnOffsetInt(j) - 1) + "px";
                  }
                },
          };
          return actions;
        }
