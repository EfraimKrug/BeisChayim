// Control.js
var currentMonth = "Elul";
var backgroundTrack = 0;
var showButtonSec = false;
var showButton = false;
var autoProcess = true;

// ========== selecting the month ======================
var autoTimeStamp = new Date();

function saveAutoTime(){
			autoTimeStamp = new Date();
}

function autoSecClose(){
	if(!autoProcess) return;
	var autoTimeStampComp = new Date();
	var advancedTimeStamp = new Date(autoTimeStamp.getTime() + (60 * 1000));
	if (autoTimeStampComp < advancedTimeStamp){
		setTimeout(autoSecClose, 10000);
		return;
	}
SecurityEntry.hideAll();
SecurityEntry.hideSecurity();
}

var SecurityEntry = (function(){
	var security = document.getElementById("security");
	var ks = document.getElementById("keyShow");
	var action = document.getElementById("actionSelect");
	var kboard = document.getElementById("kboard");

	var securityBoxUp = false;
	var securityDropBoxUp = false;
	var subScreenUp = false;
	var newScreenUp = false;
	var editScreenUp = false;
	var configScreenUp = false;
	var selectScreenUp = false;

	var passkey = "";
	var pkLetterCount = 0;

	var actions = {
			isScreenClear: function(){
				return !securityBoxUp && !securityDropBoxUp && !subScreenUp && !newScreenUp && !editScreenUp && !configScreenUp && !selectScreenUp;
			},
			setSelectScreen: function(val){
				selectScreenUp = val;
			},
			setNewScreen: function(val){
				newScreenUp = val;
			},
			setEditScreen: function(val){
				editScreenUp = val;
			},
			setConfigScreen: function(val){
				configScreenUp = val;
			},
			setSecurityBox: function(val){
				securityBoxUp = val;
			},
			setsecurityDropBox: function(val){
				securityDropBoxUp = val;
			},
			setSubScreen: function(val){
				subScreenUp = val;
			},
			getPasskey: function(){
				return passkey;
			},
			hideSecurity: function(){
				SecurityEntry.setSecurityBox(false);
				security.style.display = 'none';
				ks.style.display = 'none';
				kboard.style.display = 'none';
				//SecurityEntry.initKeys();
			},
			initKeys: function(){
				passkey = "";
				pkLetterCount = 0;
			},
			checkIt: function(){

					if(passkey == PASSWORD){
						SecurityEntry.showAll();
					} else {
						SecurityEntry.hideAll();
					}
			},
			showSecurity: function(){
				if(!SecurityEntry.isScreenClear()) return;
				//BodyListener.clearAllListeners();
				SecurityEntry.initKeys();
				SecurityEntry.setSecurityBox(true);
				security.style.display = 'inline';
				kboard.style.display = 'inline';
				setTimeout(autoSecClose, 10000);
			},
			hideAll: function(){
				SecurityEntry.setSecurityBox(false);
				SecurityEntry.setsecurityDropBox(false);
				SecurityEntry.hideSecurity();
				action.style.display = 'none';
				showButton = true;
			},
			showAll: function(){
				if(RunPhaseView()) return;
				if(SecurityEntry.isScreenClear()) return;
				action.value = "";
				action.style.display = 'inline';
				SecurityEntry.hideSecurity();
				SecurityEntry.setsecurityDropBox(true);
			},
			kbclick: function(ky){
				if(RunPhaseView())return;
				saveAutoTime();
				ks.style.display = 'inline';
				if (ky == 'Enter'){
					SecurityEntry.checkIt();
					return;
				}
				if (ky == 'clear'){
					pkLetterCount--;
					passkey = passkey.substring(0,pkLetterCount);
				} else {
					pkLetterCount++;
					passkey += ky;
				}
				ks.innerHTML = passkey;
			},
		};
		return actions;
	})();

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
				if(!SecurityEntry.isScreenClear()) return;
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
				if(!SecurityEntry.isScreenClear()) return;
				if(type == 'pdf' && BodyListener.isRunPhaseView()){
					appBody.addEventListener("click", Bodyfunctn, true);
				} else {
					if(BodyListener.isRunPhaseEdit()){
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

var ScreenWeaver = (function(){
	var body = document.getElementById("body");
	var other = "";
	var otherName = "";

	var actions = {
			setOther: function(otherPanel){
				otherName = otherPanel;
				other = document.getElementById(otherPanel);
			},
			goBack: function(otherPanel){
				ScreenWeaver.resetScreen(otherPanel);
		    SecurityEntry.setSecurityBox(false);
		    SecurityEntry.setsecurityDropBox(false);
		    SecurityEntry.setSubScreen(false);

				if(otherPanel == "newPanel") SecurityEntry.setNewScreen(false);
				if(otherPanel == "editPanel") SecurityEntry.setEditScreen(false);
				if(otherPanel == "configPanel") SecurityEntry.setConfigScreen(false);
				if(otherPanel == "selectPanel") SecurityEntry.setSelectScreen(false);
			},
			resetScreen: function(otherPanel){
				SecurityEntry.setSecurityBox(false);
		    SecurityEntry.setsecurityDropBox(false);
		    SecurityEntry.setSubScreen(false);
				SecurityEntry.hideAll();

				if(otherPanel) other = document.getElementById(otherPanel);
				if(!other) return;
				body.style.display = "block";
				other.style.display = "none";
				ScreenWeaver.clearScreen(otherName);
			},
			clearScreen: function(oldPanel){
				if(oldPanel == "newPanel") SecurityEntry.setNewScreen(false);
				if(oldPanel == "editPanel") SecurityEntry.setEditScreen(false);
				if(oldPanel == "configPanel") SecurityEntry.setConfigScreen(false);
				if(oldPanel == "selectPanel") SecurityEntry.setSelectScreen(false);
			},
		};
		return actions;
})();
