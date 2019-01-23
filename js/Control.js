// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;
var autoProcess = true;

//console.log(config);

// ========== selecting the month ======================
var autoTimeStamp = new Date();

function saveAutoTime(){
			autoTimeStamp = new Date();
}

function autoSecClose(){
	if(!autoProcess) return;
	var autoTimeStampComp = new Date();
	var advancedTimeStamp = new Date(autoTimeStamp.getTime() + (60 * 1000));
	//console.log(autoTimeStampComp + " <? " + advancedTimeStamp);
	if (autoTimeStampComp < advancedTimeStamp){
		setTimeout(autoSecClose, 10000);
		return;
	}

	var security = document.getElementById("security");
	security.style.display = 'none';
	var ks = document.getElementById("keyShow");
	ks.style.display = 'none';
	showButtonSec = true;
	//addBodyListener();
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
function showSecurity(){
	if(SCREEN_UP) return;
	if (RunPhaseView()){
		setTimeout(checkClick, 10);
		return;
	}

	var security = document.getElementById("security");
	//alert(security.style.zIndex);
	if(showButtonSec && showButton){
		security.style.display = 'inline';
		showButtonSec = false;
		initKeys();
		//passkey = '';
		//pkLetterCount = 0;
		//removeBodyListener();
		setTimeout(autoSecClose, 10000);
	} else {
		initKeys();
		hideSecurity()
	}
	hideIt();
}

function showIt(){
	//var month = document.getElementById("monthSelect");
	if(RunPhaseView()) return;
	var action = document.getElementById("actionSelect");
	action.value = "";
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
// adding and removing listeners
// Phase View:
//		add body listener for main screen and side bar
//		both are capable of bringing up PDF series
//
// Security View:
//		add body listener for main screen only
//		goes into update mode...
/////////////////////////////////////////////////////////////////////////
var BodyListener = (function(){
	var pdfView = document.getElementById("pdfView");
	var appBody = document.getElementById("appBody");
	var functn = "";
	var actions = {
			addPDFListener: function(type){
				if(type == 'pdf'){
					pdfView.addEventListener("click",this.getClickPDF, true);
					}
			//appBody.addEventListener("click",showSecurity,true);
			},
			addBodyListener: function(type){
				if(type == 'pdf'){
					appBody.addEventListener("click",this.getClickPDF, true);
				}
				//appBody.addEventListener("click",showSecurity,true);
			},
			removeBodyListener: function(type){
				if(type == 'pdf'){
					appBody.removeEventListener("click",this.getClickPDF,true);
				}
			},
			setFirstFunction: function(func){
					functn = func;
			},
			getClick: function(div){
				//alert("getClick");
				console.log(div.target.id);
				//alert('getting click' + div);
			},
			getClickPDF: function(div){
				//alert("getClickPDF");
				console.log("HERE" + div.target.id);
				functn();
				//pdfP.getFirstPDF();
				//alert('getting click' + div);
			},
			isRunPhaseView: function(){
				return RunPhaseView();
			},
			isRunPhaseEdit: function(){
				return RunPhaseEdit();
			},
			addSideListener: function(type, div_id){

			}
	};
	return actions;
})();
