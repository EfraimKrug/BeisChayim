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
//SecurityEntry.hideAll();
//SecurityEntry.hideSecurity();
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
	var pic01  = document.getElementById("Pic01");

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
				//if(!SecurityEntry.isScreenClear()) return;
				if(type == 'pdf' && RunPhaseView()){
					pdfView.addEventListener("click", PDFFunctn, true);
					}
			},
			removePDFListener: function(type){
				if(type == 'pdf'){
					pdfView.removeEventListener("click", PDFFunctn, true);
					}
			},
			addBodyListener: function(){
				console.log("addBodyListener");
				//if(!SecurityEntry.isScreenClear()) return;
				//if(type == 'pdf' && BodyListener.isRunPhaseView()){
					appBody.addEventListener("click", Bodyfunctn, true);
				//} else {
				//	if(BodyListener.isRunPhaseEdit()){
				//		appBody.addEventListener("click", Bodyfunctn, true);
				//		pic01.addEventListener("click", Bodyfunctn, true);
				//	}
				//}
			},
			removeBodyListener: function(type){
				console.log("removeBodyListener");
				//if(type == 'pdf'){
					appBody.removeEventListener("click", Bodyfunctn, true);
				//	pic01.removeEventListener("click", Bodyfunctn, true);
				//}
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
