// Control.js
var currentMonth;
var backgroundTrack = 0;

// ========== selecting the month ======================
function showIt(){
	var month = document.getElementById("monthSelect");
	month.style.display = 'inline';
	var action = document.getElementById("actionSelect");
	action.style.display = 'inline';
	//alert(month.value);
}

function doit(){
	var month = document.getElementById("monthSelect");
	month.style.display = 'none';
	currentMonth = month.value;
	//alert(month.value);
}
