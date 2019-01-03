// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;

//console.log(config);

// ========== selecting the month ======================
var autoTimeStamp = new Date();

function saveAutoTime(){
			autoTimeStamp = new Date();
}

function autoSecClose(){
	var autoTimeStampComp = new Date();
	var advancedTimeStamp = new Date(autoTimeStamp.getTime() + (60 * 1000));
	if (autoTimeStampComp < advancedTimeStamp){
		setTimeout(autoSecClose, 10000);
		return;
	}

	var security = document.getElementById("security");
	security.style.display = 'none';
	var ks = document.getElementById("keyShow");
	ks.style.display = 'none';
	showButtonSec = true;
	addBodyListener();
	hideIt();
}

function hideSecurity(){
	var security = document.getElementById("security");
	security.style.display = 'none';
	var ks = document.getElementById("keyShow");
	ks.style.display = 'none';
	showButtonSec = true;
	initKeys();
}

function checkClick(){
	if(placeClick == 'side'){
		placeClick = '';
		return false;
	}
	getPDF(currentIDX, 1, 'main');
	//alert(YahrList.Yahrzeits[currentIDX].HName.trim() == "" ? YahrList.Yahrzeits[currentIDX].Name : YahrList.Yahrzeits[currentIDX].HName);
	return true;
}

///////////////////////////////////////////////////////////////
// rewrite turning off all editing possibility
// the page stalls in case the side bar was clicked...
///////////////////////////////////////////////////////////////
function showSecurity(){
	setTimeout(checkClick, 10);
	return;
}

function showIt(){
	//var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");

	action.style.display = 'inline';
	//month.style.display = 'inline';

	showButton = false;
	hideSecurity();
}

function hideIt(){
	//var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");

	action.style.display = 'none';
	//month.style.display = 'none';
	showButton = true;
}

function doit(){
	//var month = document.getElementById("monthSelect");
	//currentMonth = month.value;
	hideIt();
	//alert(month.value);
}

/////////////////////////////////////////////////////////////////////////
// adding and removing listeners - to clean up for touch screen...
/////////////////////////////////////////////////////////////////////////
function addBodyListener(){
	bd = document.getElementById("appBody");
	appBody.addEventListener("click",showSecurity,true);
}

function removeBodyListener(){
	bd = document.getElementById("appBody");
	appBody.removeEventListener("click",showSecurity,true);
}
