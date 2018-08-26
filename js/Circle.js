/*
 * ========== going though the list ====================
 */
TIME_FACTOR = config.settings["time_factor"];

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

		var hname = document.getElementById("HName");
		hname.style.top = getTopOffset(2,0);
		hname.style.left = getLeftOffset(2,0);

		var hdate = document.getElementById("HDate");
		hdate.style.top = getTopOffset(2,1);
		hdate.style.left = getLeftOffset(2,0);

		var edate = document.getElementById("EDate");
		edate.style.top = getTopOffset(2,2);
		edate.style.left = getLeftOffset(2,0);

		var pic01  = document.getElementById("Pic01");
		pic01.style.top = getTopOffset(1,2);
		pic01.style.left = getLeftOffset(1,0);

		var pic02  = document.getElementById("Pic02");
		pic02.style.top = getTopOffset(2,2);
		pic02.style.left = getLeftOffset(2,0);

}

// plaque display
function firstLoad(){
	buildPanel01();
	//renderOnebyOne();
	renderingPlaques();
}

// individual name display
function renderOnebyOne(){
	var i = 0;
	var tf = TIME_FACTOR * 1000;
	setInterval( function(){ loadElement(i = getNum(i)); }, tf);
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

function loadElement(i){
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

	setTimeout(loadSideBar, 1500)
}
