/*
 * ========== going though the list ====================
 */
TIME_FACTOR = config.settings["time_factor"];
//DISPLAY_SETTING = 0;
DISPLAY_SETTING = config.settings["display_type"];
//FBookURL = "http://www.facebook.com/First.Last";
var YahrList = JSON.parse(YahrzeitList);
var SideBarList = [];
var PayLevelList = [];
var currentName = 0;

//function gotoFBook(){
//	window.open(FBookURL ,'_blank','toolbar=no,location=no,status=no,menubar=no,width=450px,height=450px');
//}

function positionElts(){
		var name = document.getElementById("Name");
		name.style.top = getTopOffset(1,3);
		name.style.left = getLeftOffset(2,0);
		name.style.width = getWSquareSize() + "px";
		name.style.fontSize = (getHBiteSize() / 2.5) + "px";


		var hname = document.getElementById("HName");
		hname.style.top = getTopOffset(2,0);
		hname.style.left = getLeftOffset(2,0);
		hname.style.width = getWSquareSize() + "px";
		hname.style.fontSize = (getHBiteSize() / 2.5) + "px";

		var hdate = document.getElementById("HDate");
		hdate.style.top = getTopOffset(2,1);
		hdate.style.left = getLeftOffset(2,0);
		hdate.style.width = getWSquareSize() + "px";
		hdate.style.fontSize = (getHBiteSize() / 2.5) + "px";

		var edate = document.getElementById("EDate");
		edate.style.top = getTopOffset(2,2);
		edate.style.left = getLeftOffset(2,0);
		edate.style.width = getWSquareSize() + "px";
		edate.style.fontSize = (getHBiteSize() / 2.5) + "px";

		var pic01  = document.getElementById("Pic01");
		pic01.style.top = getTopOffset(1,2);
		pic01.style.left = getLeftOffset(1,0);
		pic01.style.width = (getWSquareSize() * .75) + "px";
		pic01.style.height = (getHSquareSize() * .75) + "px";

		var pic02  = document.getElementById("Pic02");
		pic02.style.top = getTopOffset(2,3);
		pic02.style.left = getLeftOffset(2,0);
		pic02.style.width = getWSquareSize() + "px";

		name.style.display = "inline";
		hname.style.display = "inline";
		hdate.style.display = "inline";
		edate.style.display = "inline";
		pic01.style.display = "inline";
		pic02.style.display = "inline";
}

function hideScreen01(){
			var name = document.getElementById("Name");
			name.style.display = "none";
			var hname = document.getElementById("HName");
			hname.style.display = "none";
			var hdate = document.getElementById("HDate");
			hdate.style.display = "none";
			var edate = document.getElementById("EDate");
			edate.style.display = "none";
			var pic01  = document.getElementById("Pic01");
			pic01.style.display = "none";
			var pic02  = document.getElementById("Pic02");
			pic02.style.display = "none";
}

function endCycle(){
	//console.log("endCycle: " + DISPLAY_SETTING);
	if(DISPLAY_SETTING == 2){
			switchLoad();
	} else {
			firstLoad();
	}
}

var processRunning = -1;
var PlaqueInterval;
var OneByInterval;
function switchLoad(){
	if (processRunning == 0){
		processRunning = 1;
		//console.log("renderingPlaques" + processRunning);
		clearInterval(OneByInterval);
		hideScreen01();
		buildPanel01();
		renderingPlaques(endCycle);
	} else {
	if (processRunning == 1){
		processRunning = 0;
		//console.log("renderOnebyOne" + processRunning);
		hideScreen02();
		clearInterval(PlaqueInterval);
		renderOnebyOne(endCycle);
		}
	}

}
// plaque display
function firstLoad(){
	if(DISPLAY_SETTING == 1 || DISPLAY_SETTING == 2){
			processRunning = 0;
			renderOnebyOne(endCycle);
		}
	if(DISPLAY_SETTING == 0){
		processRunning = 1;
		buildPanel01();
		renderingPlaques(endCycle);
	}
}

// individual name display
function renderOnebyOne(callback){
	var i = 0;
	var tf = TIME_FACTOR * 1000;
	OneByInterval = setInterval( function(){ loadElement(i = getNum(i), callback); }, tf);
}

//returns index of next entry in our month
function getNum(i){
	var last = YahrList.Yahrzeits.length - 1;
	i++;
	var dateHold = YahrList.Yahrzeits[i].HDate;

	if(i > last - 1){
		i = 0;
		resetSideBar();
	}

	while(dateHold.indexOf(currentMonth) < 0 && i < last){
		i++;
		//console.log(i);
		dateHold = YahrList.Yahrzeits[i].HDate;
	}
	if(i > last - 1) i = 0;
	return i;
}

var lastI = -1;
function loadElement(i, callback){
	console.log("loadElement: " + i + ":" + lastI);
	if(i < lastI){
		callback();
		lastI = -1;
		return;
	} else {
		lastI = i;
	}
	positionElts();
	var bd = document.getElementById("body");
	//var n = i % 5;
	var cName = "";
	//console.log("[" + YahrList.Yahrzeits[i].PayLevel + "]");
	if(!YahrList.Yahrzeits[i].PayLevel){
		cName = "bg0";
	} else {
		cName = "bg" + YahrList.Yahrzeits[i].PayLevel;
	}
	bd.className = cName;

	var HDate = document.getElementById("HDate");
	HDate.innerHTML = YahrList.Yahrzeits[i].HDate;
	HDate.className = "hdate" + YahrList.Yahrzeits[i].PayLevel;

	//FBookURL = "http://" + YahrList.Yahrzeits[i].FBook;
	//if(YahrList.Yahrzeits[i].FBook.length < 17){
	//	document.getElementById("gotofbook").src = "";
	//	document.getElementById("gotofbook").style.display = 'none';
	//}
	//else {
	//	document.getElementById("gotofbook").src = "./img/facebook2.png";
	//	document.getElementById("gotofbook").style.display = 'inline';
	//}
	var Name = document.getElementById("Name");
	Name.innerHTML = YahrList.Yahrzeits[i].Name;
	Name.className = "Name" + YahrList.Yahrzeits[i].PayLevel;
	//console.log("[" + Name.className + "]");

	var HName = document.getElementById("HName");
	HName.innerHTML = YahrList.Yahrzeits[i].HName;
	if(Name.innerHTML == HName.innerHTML){
		HName.innerHTML = "";
	}
	HName.className = "HName" + YahrList.Yahrzeits[i].PayLevel;

	var EDate = document.getElementById("EDate");
	EDate.innerHTML = YahrList.Yahrzeits[i].EDate;
	EDate.className = "edate" + YahrList.Yahrzeits[i].PayLevel;

	var Pic01  = document.getElementById("Pic01");
	var Pic02  = document.getElementById("Pic02");

	Pic01.src = "";
	Pic02.src = "";
	Pic01.style.visibility = "hidden";
	Pic02.style.visibility = "hidden";

	if(YahrList.Yahrzeits[i].PayLevel > 1){
		Pic01.style.visibility = "visible";
		Pic01.src = "./img/" + YahrList.Yahrzeits[i].Pic01;
	}

	if(YahrList.Yahrzeits[i].PayLevel > 2){
		Pic02.style.visibility = "visible";
		Pic02.src = "./img/" + YahrList.Yahrzeits[i].Pic02;
	}

	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	Comments01.className = "Comments01" + YahrList.Yahrzeits[i].PayLevel;

	currentName = i;

	setTimeout(loadSideBar, 1500);
}
