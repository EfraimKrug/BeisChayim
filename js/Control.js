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
}

function showSecurity(){
	var security = document.getElementById("security");

	//alert(security.style.zIndex);
	if(showButtonSec){
		security.style.display = 'inline';
		showButtonSec = false;
		passkey = '';
		pkLetterCount = 0;
		setTimeout(autoSecClose, 10000)
	} else {
		security.style.display = 'none';
		showButtonSec = true;
	}
}

function showIt(){
	var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");
	var security = document.getElementById("security");

	action.style.display = 'inline';
	month.style.display = 'inline';
	security.style.display = 'none';
	showButton = false;
}

function hideIt(){
	var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");
	var security = document.getElementById("security");

	action.style.display = 'none';
	month.style.display = 'none';
	security.style.display = 'none';
}

function doit(){
	var month = document.getElementById("monthSelect");
	currentMonth = month.value;
	hideIt();
	//alert(month.value);
}
