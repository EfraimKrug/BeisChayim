/*
 * ========== going though the list ====================
 */
TIME_FACTOR = config.settings["time_factor"];

FBookURL = "http://www.facebook.com/First.Last";
var YahrList = JSON.parse(YahrzeitList);
var SideBarList = [];
var PayLevelList = [];
var currentName = 0;

function gotoFBook(){
	window.open(FBookURL ,'_blank','toolbar=no,location=no,status=no,menubar=no,width=450px,height=450px');
}

function firstLoad(){
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
	var bd = document.getElementById("body");
	var n = i % 5;
	var cName = "bg" + n;
	bd.className = cName;

	var HDate = document.getElementById("HDate");
	HDate.innerHTML = YahrList.Yahrzeits[i].HDate;

	FBookURL = "http://" + YahrList.Yahrzeits[i].FBook;
	if(YahrList.Yahrzeits[i].FBook.length < 17){
		document.getElementById("gotofbook").src = "";
		document.getElementById("gotofbook").style.display = 'none';
	}
	else {
		document.getElementById("gotofbook").src = "./img/facebook2.png";
		document.getElementById("gotofbook").style.display = 'inline';
	}
	var Name = document.getElementById("Name");
	Name.innerHTML = YahrList.Yahrzeits[i].Name;
	var HName = document.getElementById("HName");
	HName.innerHTML = YahrList.Yahrzeits[i].HName;
	if(Name.innerHTML == HName.innerHTML){
		HName.innerHTML = "";
	}
	var EDate = document.getElementById("EDate");
	EDate.innerHTML = YahrList.Yahrzeits[i].EDate;
	var Pic01  = document.getElementById("Pic01");
	Pic01.src = "./img/" + YahrList.Yahrzeits[i].Pic01;
	var Pic02  = document.getElementById("Pic02");
	Pic02.src = "./img/" + YahrList.Yahrzeits[i].Pic02;
	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	currentName = i;

	setTimeout(loadSideBar, 1500)
}
