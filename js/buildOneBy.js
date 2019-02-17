// building the One By One screen..
//

var screenHidden = false;

function positionElts(){
		var t = BITES_PER_SQUARE;
		var s = 2;
		var name = document.getElementById("Name");
		name.style.top = getTopName1();
		name.style.left = getLeftOffsetName();
		name.style.width = getOneByWidth();
		name.style.fontSize = getName1Font();
		//name.style.display = 'inline';

		var dpic01  = document.getElementById("DPic01");
		dpic01.style.top = getTopPic1();
		dpic01.style.left = getLeftPic1();

		var pic01  = document.getElementById("Pic01");
		pic01.style.left = "0px";
		//pic01.style.display = 'inline';

		t = getNextTop(t);
		if(t == 0) s++;

		var hname = document.getElementById("HName");
		hname.style.top = getTopName2();
		hname.style.left = getLeftOffsetName();
		hname.style.width = getOneByWidth();
		hname.style.fontSize = getName2Font();
		//hname.style.display = 'inline';

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}

		var hdate = document.getElementById("HDate");
		hdate.style.top = getTopDate1();
		hdate.style.left = getLeftOffsetName();
		hdate.style.width = getOneByWidth();
		hdate.style.fontSize = getName1Font();
		//hdate.style.display = 'inline';

		t += 1;
		if(t > BITES_PER_SQUARE){
			s++;
			t = 0;
		}

		var edate = document.getElementById("EDate");
		edate.style.top = getTopDate2();
		edate.style.left = getLeftOffsetName();
		edate.style.width = getOneByWidth();
		edate.style.fontSize = getName2Font();
		//edate.style.display = 'inline';

		t = getNextTop(t);
		if(t == 0) s++;

		var dpic02  = document.getElementById("DPic02");
		dpic02.style.top = getTopPic2();
		dpic02.style.left = getLeftPic2();

		var pic02  = document.getElementById("Pic02");
		pic02.style.left = getLeftPic2();
		//pic02.style.display = 'inline';

		var Comment01  = document.getElementById("Comments01");
		Comment01.style.top = getTopComment01();
		Comment01.style.left = getLeftComment01();
		//Comment01.style.display = 'inline';

		if(!screenHidden){
			name.style.display = "inline";
			hname.style.display = "inline";
			hdate.style.display = "inline";
			edate.style.display = "inline";
			pic01.style.display = "inline";
			pic02.style.display = "inline";
			Comment01.style.display = 'inline';
		}
}


function hideScreen01(){
			screenHidden = true;
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
			var Comments01  = document.getElementById("Comments01");
			Comments01.style.display = "none";
}

function showScreen01(){
	screenHidden = false;
}

function getNextTop(t){
	if(t >= BITES_PER_SQUARE - 1) return 0;
	return t + 1;
}


function correctHFontSize(val){
		return val;
}


var lastI = -1;
function loadElement(i){
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

		HDate.innerHTML = fixDate(HDate.innerHTML);
		if(DATES_IN_HEBREW) HDate.innerHTML = translateDate(fixDate(HDate.innerHTML));
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

	var pdfP = null;
	pdfP = new pdfPix(i);
	if(RunPhaseView()){
		if(YahrList.Yahrzeits[i].PDF01.trim() != ""){
			BodyListener.setFirstFunction(pdfP.getNextPDF);
			BodyListener.addBodyListener("pdf");
		}
		else {
			BodyListener.removeBodyListener("pdf");
		}
	}
	var Comments01 = document.getElementById("Comments01");
	Comments01.innerHTML = YahrList.Yahrzeits[i].Comments01;
	Comments01.className = "Comments01" + YahrList.Yahrzeits[i].PayLevel;
	//console.log("here");
	if(YahrList.Yahrzeits[i].Comments01.length > 411){
		if(YahrList.Yahrzeits[i].Pic02.trim() == ""){
			Comments01.style.top = getBelowDate2();
			//console.log(getBelowDate2());
		}
		if(YahrList.Yahrzeits[i].Pic01.trim() != ""){
			Comments01.style.left = getLeftOffsetName();
		}
	}

	//setTimeout(loadSideBar, (TIME_FACTOR  * 1000) / 2);
	currentIDX = i;
	//timeControl.setSideTimer(loadSideBar);
}
