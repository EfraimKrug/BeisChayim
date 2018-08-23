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

<<<<<<< HEAD
	EDate = document.getElementById("EDate");

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var DDate = new Date(YahrList.Yahrzeits[i].EDate);
	var EnDate = new Date(DDate.getTime() + DDate.getTimezoneOffset() * 60000);

	var m = months[EnDate.getMonth()]
	var d = EnDate.getDate();
	var y = EnDate.getYear() + 1900;
	var sep = ", ";
	if(!m) m = "";
	if(!d){d = ""; sep = "";}
	if(!y){y = ""; sep = "";}
	EDate.innerHTML = m + " " + d + sep + y;

	var Pic01  = document.getElementById("Pic01");
	var Pic02  = document.getElementById("Pic02");

=======
	var EDate = document.getElementById("EDate");
	EDate.innerHTML = YahrList.Yahrzeits[i].EDate;
	EDate.className = "edate" + YahrList.Yahrzeits[i].PayLevel;

	var Pic01  = document.getElementById("Pic01");
	var Pic02  = document.getElementById("Pic02");
>>>>>>> 874f4f97df2f8dc22a5c22fdeffba7c353529fb3
	Pic01.src = "";
	Pic02.src = "";

	if(YahrList.Yahrzeits[i].PayLevel > 1){
		Pic01.src = "./img/" + YahrList.Yahrzeits[i].Pic01;
	}

	if(YahrList.Yahrzeits[i].PayLevel > 2){
		Pic02.src = "./img/" + YahrList.Yahrzeits[i].Pic02;
	}
	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	Comments01.className = "Comments01" + YahrList.Yahrzeits[i].PayLevel;

	currentName = i;

	setTimeout(loadSideBar, 1500)
}
