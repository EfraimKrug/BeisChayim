var offset = 0;
var FONT_SIZE = "14";

function resetSideBar(){
		SideBarList = [];
		var max = parseInt(MAX_SLOTS) + 1;
		for(var i=1; i < max; i++){
			var name = "sbar0" + i;
			//console.log("(" + i + "::" + max + ")" + MAX_SLOTS + ":" + name);
			var e = document.getElementById(name);
			//e.className = "";
		}
}

function ListCounterInc(lCounter){
	if(lCounter >= SideBarList.length - 1){
		return 0;
	}
	return lCounter + 1;
}

function SideBarCounterInc(SBCounter){
	if(SBCounter >= MAX_SLOTS){
		return 1;
	}
	return SBCounter + 1;
}

function getBGround(pl){
	return "sbarpl" + pl;
}

function hideSideBarArray(){
	var slotCounter = 1;

	//for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
	for (var i=1; i < 17 ; i++){
		var sbar = document.getElementById("sbar0" + i);
		sbar.style.display = "none";
	}
}

function getGridColumn(){
	var col = getPenUltimateColumn();
	if (col < 4) col = 4;
	return col;
}

var listCounter = 0;
var slotCounter = 1;

function renderSideBarArray(){
	MAX_SLOTS = SideBarList.length < MAX_SLOTS ? SideBarList.length : MAX_SLOTS;
	//console.log(SideBarList.length);
	for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
		var sbar = document.getElementById("sbar0" + slotCounter);
		var sect;
		sbar.className = "sbar";
		sbar.style.display = "inline";
		sbar.style.left = getLeftOffset(getGridColumn(),0);
		//sbar.style.top = getBoxTop(slotCounter);
		sbar.style.top = getSideBarTop(slotCounter);
		sbar.className = getBGround(PayLevelList[listCounter]);
		//sbar.style.height = getTwoRowHeight() + "px";
		sbar.style.height = getSideBarHeight();
		sbar.style.width = getBoxWidth() + "px";
		//var fs = parseInt(FONT_SIZE) + parseInt(PayLevelList[listCounter]);
		//console.log("font: " + fs + "::" + listCounter);
		fs = parseInt(getSideBarFont()) + parseInt(PayLevelList[listCounter]);
		sbar.style.fontSize = fs + "px";
		sbar.innerHTML = SideBarList[listCounter];
		// + "{" + getHSquareSize() + "," + sbar.style.top + "}";
		listCounter = ListCounterInc(listCounter);
		slotCounter = SideBarCounterInc(slotCounter);
	}
}

// pushes next entry onto 2 parallel arrays
function loadSideBarArray(i){
	var spot = SideBarList.length; //first empty spot
	var outLine;

	outLine = YahrList.Yahrzeits[i].HName + "<br>" +
											YahrList.Yahrzeits[i].HDate;

  if(!YahrList.Yahrzeits[i].HName)
		outLine = YahrList.Yahrzeits[i].Name + "<br>" +
											YahrList.Yahrzeits[i].HDate;

  // notice - there are 9 slots on the sidebar, so we cycle through them
	for(var j=0; j < spot; j++){
		if(SideBarList[j] == outLine) return;
	}

	PayLevelList[spot] = YahrList.Yahrzeits[i].PayLevel ? YahrList.Yahrzeits[i].PayLevel : 0;
	//PayLevelList[spot] = YahrList.Yahrzeits[i].PayLevel;
	SideBarList[spot] = outLine;
	//console.log(spot + ":" + YahrList.Yahrzeits[i].PayLevel);
}

function loadSideBar(){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	resetSideBar();
	for(var i = 0; i < YahrList.Yahrzeits.length; i++){
		var dateHold = YahrList.Yahrzeits[i].HDate;
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
				loadSideBarArray(i);
			}
			//console.log(offset + ":" + SideBarList);
		}
	}
	renderSideBarArray();
}
