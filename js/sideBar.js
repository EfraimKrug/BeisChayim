function resetSideBar(){
		SideBarList = [];
		for(var i=1; i<6; i++){
			var name = "sbar0" + i;
			var e = document.getElementById(name);
			e.className = "";
		}
}

// pushes next entry onto sidebar queue
function loadSideBarArray(i){
	var spot = SideBarList.length; //first empty spot

	var outLine;

	outLine = YahrList.Yahrzeits[i].HName + "<br>" +
											YahrList.Yahrzeits[i].HDate;

  if(!YahrList.Yahrzeits[i].HName)
	outLine = YahrList.Yahrzeits[i].Name + "<br>" +
											YahrList.Yahrzeits[i].HDate;

	for(var i=0; i<spot; i++){
		if(SideBarList[i] == outLine) return;
	}
	SideBarList[spot] = outLine;
	var sbar = document.getElementById("sbar0" + (spot + 1));

	sbar.className = "sbar";
	sbar.innerHTML = SideBarList[spot];
}

function loadSideBar(){
	//console.log("loadSideBar");
	var today = new Date();
	sbar01 = document.getElementById("sbar01");
	//sbar01.innerHTML = "Starting: ";
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	//console.log(htoday);
	for(var i = 0; i < YahrList.Yahrzeits.length; i++){
		var dateHold = YahrList.Yahrzeits[i].HDate;
		//console.log(dateHold + "==");
		//console.log(htoday);
		if(dateHold.indexOf(htoday.month) > -1){
			dateHold = dateHold.trim();
			//console.log("[" + dateHold + "][" + dateHold.trim() + "]:" + htoday.day);
			if(dateHold.substring(0, (dateHold.trim()).indexOf(' ')) == htoday.day){
				//console.log(YahrList.Yahrzeits[i].HName);
				loadSideBarArray(i);
			}
		}
	}
}
