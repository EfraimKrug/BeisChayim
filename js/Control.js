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
	console.log(autoTimeStampComp + " <? " + advancedTimeStamp);
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

function showSecurity(){
	var security = document.getElementById("security");
	//alert(security.style.zIndex);
	if(showButtonSec && showButton){
		security.style.display = 'inline';
		showButtonSec = false;
		initKeys();
		//passkey = '';
		//pkLetterCount = 0;
		removeBodyListener();
		setTimeout(autoSecClose, 10000);
	} else {
		initKeys();
		hideSecurity()
	}
	hideIt();
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
