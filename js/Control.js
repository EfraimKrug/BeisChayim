// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;

//console.log(config);

// ========== selecting the month ======================
function autoSecClose(){
	var security = document.getElementById("security");
	security.style.display = 'none';
	showButtonSec = true;
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
		setTimeout(autoSecClose, 10000)
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
