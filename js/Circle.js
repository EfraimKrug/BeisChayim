/*
 * ========== going though the list ====================
 */
var YahrList = JSON.parse(YahrzeitList);
var SideBarList = [];
var PayLevelList = [];
var YahrzeitListSpotList = [];
var currentName = 0;

function correctHFontSize(val){
		return val;
		//return val/2;
}

function getNextTop(t){
	if(t >= BITES_PER_SQUARE - 1) return 0;
	return t + 1;
}

function positionElts(){
		var t = BITES_PER_SQUARE;
		var s = 2;
		var name = document.getElementById("Name");
		//name.style.top = getTopOffset(s, t);
		name.style.top = getTopName1();
		name.style.left = getLeftOffset(2,0);
		//name.style.width = getWSquareSize() + "px";
		name.style.width = getOneByWidth();
		name.style.fontSize = getName1Font();
		//name.style.fontSize = correctHFontSize(getHBiteSize()) + "px";

		var pic01  = document.getElementById("Pic01");
		pic01.style.top = getTopPic1();
		pic01.style.left = getLeftOffset(1,0);
		//pic01.style.width = (getWSquareSize() * .75) + "px";
		//pic01.style.height = (getHSquareSize() * .75) + "px";
		pic01.style.width =  "145px";
		pic01.style.height = "175px";

		t = getNextTop(t);
		if(t == 0) s++;

		var hname = document.getElementById("HName");
		//hname.style.top = getTopOffset(s, t);
		hname.style.top = getTopName2();
		hname.style.left = getLeftOffset(2,0);
		//hname.style.width = getWSquareSize() + "px";
		hname.style.width = getOneByWidth();
		//hname.style.fontSize = correctHFontSize(getHBiteSize()) + "px";
		hname.style.fontSize = getName2Font();

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}
		//console.log("hdate s: " + s + "t: " + t);

		var hdate = document.getElementById("HDate");
		hdate.style.top = getTopDate1();
		hdate.style.left = getLeftOffset(2,0);
		//hdate.style.width = getWSquareSize() + "px";
		hdate.style.width = getOneByWidth();
		hdate.style.fontSize = getName1Font();
		//hdate.style.fontSize = correctHFontSize(getHBiteSize()) + "px";

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}
		//console.log("edate s: " + s + "t: " + t);

		var edate = document.getElementById("EDate");
		edate.style.top = getTopDate2();
		edate.style.left = getLeftOffset(2,0);
		//edate.style.width = getWSquareSize() + "px";
		edate.style.width = getOneByWidth();
		//edate.style.fontSize = correctHFontSize(getHBiteSize()) + "px";
		edate.style.fontSize = getName2Font();

		t = getNextTop(t);
		if(t == 0) s++;

		var pic02  = document.getElementById("Pic02");
		pic02.style.top = getTopPic2();
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
		currentPosition = 0;
		clearInterval(OneByInterval);
		hideScreen01();
		hideSideBarArray();
		buildPanel01();
		renderingPlaques(endCycle);
	} else {
	if (processRunning == 1){
		processRunning = 0;
		hideScreen02();
		clearInterval(PlaqueInterval);
		renderOnebyOne(endCycle);
		}
	}

}
// plaque display
function firstLoad(){
	clearInterval(OneByInterval);
	clearInterval(PlaqueInterval);

	hideScreen01();
	hideSideBarArray();
	hideScreen02();
	buildPanel01();

	if(DISPLAY_SETTING == 1 || DISPLAY_SETTING == 2){
			processRunning = 0;
			renderOnebyOne(endCycle);
		}

	if(DISPLAY_SETTING == 0){
		processRunning = 1;
		currentPosition = 0;
		renderingPlaques(endCycle);
	}
}

// individual name display
function renderOnebyOne(callback){
	var i = 0;
	var tf = TIME_FACTOR * 1000;
	loadElement(0, callback);
	OneByInterval = setInterval( function(){ loadElement(i = getNum(i), callback); }, tf);
}

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
	if(i < lastI){
		var tf = TIME_FACTOR * 1000;
		setTimeout(callback, 1500);
		lastI = -1;
		return;
	} else {
		lastI = i;
	}
	positionElts();
	var bd = document.getElementById("body");
	var cName = "";
	if(!YahrList.Yahrzeits[i].PayLevel){
		cName = "bg0";
	} else {
		cName = "bg" + YahrList.Yahrzeits[i].PayLevel;
	}
	bd.className = cName;

	var HDate = document.getElementById("HDate");
	if(YahrList.Yahrzeits[i].HDate){
		HDate.innerHTML = YahrList.Yahrzeits[i].HDate;
		if(HDate.innerHTML.substring(0,1) == '0'){
			 HDate.innerHTML = YahrList.Yahrzeits[i].HDate.substring(1);
		}
		HDate.className = "hdate" + YahrList.Yahrzeits[i].PayLevel;
	}

	var Name = document.getElementById("Name");
	Name.innerHTML = YahrList.Yahrzeits[i].Name;
	Name.className = "Name" + YahrList.Yahrzeits[i].PayLevel;

	var HName = document.getElementById("HName");
	HName.innerHTML = YahrList.Yahrzeits[i].HName;
	if(Name.innerHTML.trim().toLowerCase() == HName.innerHTML.trim().toLowerCase()){
		HName.innerHTML = "";
	}
	HName.className = "HName" + YahrList.Yahrzeits[i].PayLevel;

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var EDate = document.getElementById("EDate");
	var dt = new Date(YahrList.Yahrzeits[i].EDate);

	var d = dt.getDate() ? dt.getDate() : "";
	var y = dt.getFullYear() ? dt.getFullYear() : "";
	var m = dt.getMonth() ? dt.getMonth() : "";

	EDate.innerHTML = (d && m) ? months[m] + " " + d : "";
	EDate.innerHTML = (m && y) ? months[m] + " " + y : "";
	EDate.innerHTML = (d && y) ? d + " " + y : "";

	EDate.innerHTML = (d && m && y) ? months[m] + " " + d + ", " + y : "";
	EDate.className = "edate" + YahrList.Yahrzeits[i].PayLevel;

	var Pic01  = document.getElementById("Pic01");
	var Pic02  = document.getElementById("Pic02");

	Pic01.src = "";
	Pic02.src = "";
	Pic01.style.visibility = "hidden";
	Pic02.style.visibility = "hidden";

	if((YahrList.Yahrzeits[i].PayLevel > 1) && YahrList.Yahrzeits[i].Pic01){
		Pic01.style.visibility = "visible";
		Pic01.src = "./img/" + YahrList.Yahrzeits[i].Pic01;
	}

	if(YahrList.Yahrzeits[i].PayLevel > 2 && YahrList.Yahrzeits[i].Pic02){
		Pic02.style.visibility = "visible";
		Pic02.src = "./img/" + YahrList.Yahrzeits[i].Pic02;
	}

	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	Comments01.className = "Comments01" + YahrList.Yahrzeits[i].PayLevel;

	//currentName = i;
	currentIDX = i;
	setTimeout(loadSideBar, (TIME_FACTOR  * 1000) / 2);
}
