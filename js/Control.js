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
	SecurityEntry.hideAll();
}

var SecurityEntry = (function(){
	var security = document.getElementById("security");
	var ks = document.getElementById("keyShow");
	var action = document.getElementById("actionSelect");

	var passkey = "";
	var pkLetterCount = 0;

	var actions = {
			getPasskey: function(){
				return passkey;
			},
			hideSecurity: function(){
				security.style.display = 'none';
				ks.style.display = 'none';
				//SecurityEntry.initKeys();
			},
			initKeys: function(){
				console.log("Init?");
				passkey = "";
				pkLetterCount = 0;
			},
			checkIt: function(){
					console.log("checkIt" + passkey + ":" + PASSWORD);

					if(passkey == PASSWORD){
						console.log("==");
						SecurityEntry.showAll();
					} else {
						SecurityEntry.hideAll();
					}
			},
			showSecurity: function(){
				if(SCREEN_UP) return;

				security.style.display = 'inline';
				kboard.style.display = 'inline';
				//SecurityEntry.initKeys();
				setTimeout(autoSecClose, 10000);
			},
			hideAll: function(){
				SecurityEntry.hideSecurity();
				action.style.display = 'none';
				showButton = true;
			},
			showAll: function(){
				console.log("showAll");
				if(RunPhaseView()) return;
				console.log("showAll2");

				action.value = "";
				action.style.display = 'inline';
				//showButton = false;
				//hideSecurity();
			},
			kbclick: function(ky){
				if(RunPhaseView())return;
				saveAutoTime();
				ks.style.display = 'inline';
				if (ky == 'Enter'){
					console.log("THIS:" + passkey + ":");
					SecurityEntry.checkIt();
					//this.initKeys();
					//ks.innerHTML = "";
					//ks.style.display = "hidden";
					return;
				}
				if (ky == 'clear'){
					console.log("Clear?");
					pkLetterCount--;
					passkey = passkey.substring(0,pkLetterCount);
				} else {
					pkLetterCount++;
					passkey += ky;
					console.log(passkey + "::" + ky )
				}
				ks.innerHTML = passkey;
			},
		};
		return actions;
	})();

//
// function hideSecurity(){
// 	var security = document.getElementById("security");
// 	security.style.display = 'none';
// 	var ks = document.getElementById("keyShow");
// 	ks.style.display = 'none';
// 	showButtonSec = true;
// 	initKeys();
// }

// function checkClick(){
// 	if(placeClick == 'side'){
// 		placeClick = '';
// 		return false;
// 	}
// 	getPDF(currentIDX, 1, 'main');
// 	//alert(YahrList.Yahrzeits[currentIDX].HName.trim() == "" ? YahrList.Yahrzeits[currentIDX].Name : YahrList.Yahrzeits[currentIDX].HName);
// 	return true;
// }


// function showSecurity(){
// 	if(SCREEN_UP) return;
// 	if (RunPhaseView()){
// 		setTimeout(checkClick, 10);
// 		return;
// 	}
// 	var security = document.getElementById("security");
// 	var kboard = document.getElementById("kboard");
//
// 	if(showButtonSec && showButton){
// 		//console.log(security.style);
// 		security.style.display = 'inline';
// 		kboard.style.display = 'inline';
// 		showButtonSec = false;
// 		initKeys();
// 		//passkey = '';
// 		//pkLetterCount = 0;
// 		//removeBody-security.style.zListener();
// 		setTimeout(autoSecClose, 10000);
// 	} else {
// 		initKeys();
// 		hideSecurity()
// 	}
//
// 	//hideIt();
// }

// function showIt(){
// 	//var month = document.getElementById("monthSelect");
// 	if(RunPhaseView()) return;
// 	var action = document.getElementById("actionSelect");
// 	action.value = "";
// 	action.style.display = 'inline';
// 	//month.style.display = 'inline';
//
// 	showButton = false;
// 	hideSecurity();
// }
//
// function hideIt(){
// 	//var month = document.getElementById("monthSelect");
// 	hideSecurity();
// 	var action = document.getElementById("actionSelect");
//
// 	action.style.display = 'none';
// 	//month.style.display = 'none';
// 	showButton = true;
// }
//
// function doit(){
// 	//var month = document.getElementById("monthSelect");
// 	//currentMonth = month.value;
// 	hideIt();
// 	//alert(month.value);
// }
//
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

	// these functions will usually be 'getNext()'
	var Bodyfunctn = function(){};
	var SideFunctn = function(){};
	var PDFFunctn = function(){};
	var actions = {
			clearAllListeners: function(){
				actions.removePDFListener();
				actions.removeBodyListener();
				actions.removeSideListener();
			},
			addPDFListener: function(type){
				if(type == 'pdf' && RunPhaseView()){
					pdfView.addEventListener("click", PDFFunctn, true);
					}
			},
			removePDFListener: function(type){
				if(type == 'pdf'){
					pdfView.removeEventListener("click", PDFFunctn, true);
					}
			},
			addBodyListener: function(type){
				if(type == 'pdf' && RunPhaseView()){
					appBody.addEventListener("click", Bodyfunctn, true);
				} else {
					if(RunPhaseEdit()){
						appBody.addEventListener("click", Bodyfunctn, true);
					}
				}
			},
			removeBodyListener: function(type){
				if(type == 'pdf'){
					appBody.removeEventListener("click", Bodyfunctn, true);
				}
			},
			setSideFunction: function(func){
					SideFunctn = func;
			},
			setFirstFunction: function(func){
					Bodyfunctn = func;
			},
			// getClick: function(div){
			// 	//alert("getClick");
			// 	console.log(div.target.id);
			// 	//alert('getting click' + div);
			// },
			// getClickPDF: function(div){
			// 	//alert("getClickPDF");
			// 	if(div.target.id.indexOf("sbar") != 0){
			// 		console.log("Body: " + div.target.id);
			// 		functn();
			// 		}
			// },
			// getSideClickPDF: function(div){
			// 	//alert("getClickPDF");
			// 	if(div.target.id.indexOf("sbar") > -1){
			// 		console.log("Side" + div.target.id);
			// 		SideFunctn();
			// 	}

				//pdfP.getFirstPDF();
				//alert('getting click' + div);
			//},
			isRunPhaseView: function(){
				return RunPhaseView();
			},
			isRunPhaseEdit: function(){
				return RunPhaseEdit();
			},
			addSideListener: function(type, div_id){
				if(type == "side"){
					div_id.addEventListener("click", SideFunctn, true);
				}
			},
			removeSideListener: function(type, div_id){
				if(type == "side"){
					div_id.removeEventListener("click", SideFunctn, true);
				}
			}

	};
	return actions;
})();
