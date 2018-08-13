// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;

// configuration files...
var config = JSON.parse(ConfigList);
console.log(config);

// ========== selecting the month ======================
function showSecurity(){
	var security = document.getElementById("security");

	if(showButtonSec){
		security.style.display = 'inline';
		showButtonSec = false;
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
