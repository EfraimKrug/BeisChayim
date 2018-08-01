// Control.js
var currentMonth;
var backgroundTrack = 0;
var showButton = false;

// ========== selecting the month ======================
function showIt(){
	var month = document.getElementById("monthSelect");
	var action = document.getElementById("actionSelect");
	if(showButton){
		action.style.display = 'inline';
		month.style.display = 'inline';
		showButton = false;
	} else {
		action.style.display = 'none';
		month.style.display = 'none';
		showButton = true;
	}
	//alert(month.value);
}

function doit(){
	var month = document.getElementById("monthSelect");
	//month.style.display = 'none';
	currentMonth = month.value;
	//alert(month.value);
}
