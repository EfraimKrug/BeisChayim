var MAX_SLOTS = config.settings["slots"];
var offset = 0;

function resetSideBar(){
		SideBarList = [];
		var max = parseInt(MAX_SLOTS) + 1;
		for(var i=1; i < max; i++){
			var name = "sbar0" + i;
			console.log("(" + i + "::" + max + ")" + MAX_SLOTS + ":" + name);
			var e = document.getElementById(name);
			e.className = "";
		}
}

function ListCounterInc(lCounter){
	if(lCounter >= (SideBarList.length - 1)){
		return 0;
	}
	return lCounter + 1;
}

function SideBarCounterInc(SBCounter){
	if(SBCounter > MAX_SLOTS - 1){
		return 1;
	}
	return SBCounter + 1;
}

function renderSideBarArray(){
	var listCounter = offset;
	var slotCounter = 1;

	for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
		var sbar = document.getElementById("sbar0" + slotCounter);
		sbar.className = "sbar";
		sbar.innerHTML = SideBarList[listCounter];
		listCounter = ListCounterInc(listCounter);
		slotCounter = SideBarCounterInc(slotCounter);
	}
	offset = ListCounterInc(offset);
	//if(offset > SideBarList.length - 1){ offset = 0; }
	//else {offset++;}
}

// pushes next entry onto sidebar queue
function loadSideBarArray(i){
	var spot = SideBarList.length; //first empty spot
	//console.log("Length: " + spot);
	//console.log("Offset: " + offset);
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

	SideBarList[spot] = outLine;
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
		}
	}
	//console.log(offset + ":" + SideBarList);
	renderSideBarArray();
}
