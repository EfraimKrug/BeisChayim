/*
 * ========== going though the list ====================
 */
var YahrList = JSON.parse(YahrzeitList);
var SideBarList = [];
var PayLevelList = [];
var YahrzeitListSpotList = [];
var currentName = 0;
var TESTING_OFF = false;


var timeControl = (function(){
	var tf = TIME_FACTOR * 1000;
	OneByInterval = 0;
	SideInterval = 0;
	var actions = {
		setTimer: function(func){
				//console.log("setting timer");
				OneByInterval = setInterval(func, tf);
		},
		setSideTimer: function(func){
				//alert("Setting Side Timer");
				console.log("setting side timer");
				SideInterval = setInterval(func, tf);
		},
		clearTimer: function(){
				//console.log("clearing timer");
				clearInterval(OneByInterval);
		},
		clearSideTimer: function(){
				console.log("clearing side timer");
				clearInterval(SideInterval);
		}
	};
	return actions;
})();

////////////////////////////////////////////////////////////
// function setupTimerLoad()
// This is the entry into everything - from body load=
////////////////////////////////////////////////////////////
function setupTimerLoad(){
	//build the panel array
	buildPanel01();
	//
	setCurrentMonth();
	//start the application...
	manipulateIDX.initIDX();
	timerLoad();
}

function timerLoad(lastNum){
	//console.log("timerLoad: " + lastNum);
//	var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 //	if(lastNum) lastN = lastNum;

	if(DISPLAY_SETTING == 0){
		timeControl.setTimer(function(){
			hideScreen02();
			renderAll.loadingPlaques(rendPlaques);
		});
	}
	//timeControl.setSideTimer(loadSideBar);
	manipulateIDX.initIDX();
//	for(var i=0; i<10; i++){/
//		console.log("IDX: " + manipulateIDX.getNextIDX(function(){}));
//	}

	if(DISPLAY_SETTING == 1){
		timeControl.setSideTimer(loadSideBar);
		timeControl.setTimer(function(){
			renderAll.loadingOneBy(manipulateIDX.getNextIDX());
			manipulateIDX.incrementIDX();
			if(manipulateIDX.isOutOfRange(manipulateIDX.getCurrentIDX())) renderAll.endingCycle();
			});
	}

	if(DISPLAY_SETTING == 2) {
		timeControl.setTimer(function(){
			renderAll.loadAlternate(rendPlaques);
		});
	}
}

function sideTimerLoad(lastNum){
	//var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 	//if(lastNum) lastN = lastNum;

	timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
}

var renderBoth = function(){
	var i = -1;
	var pRun = 1;
	var actions = {
		loadAlternate: function(rendP){
			if(this.isOneBy()){
				timeControl.setSideTimer(loadSideBar);
				hideScreen02();
				this.loadingOneBy(manipulateIDX.getNextIDX());
				manipulateIDX.incrementIDX();
				if(manipulateIDX.isOutOfRange(manipulateIDX.getCurrentIDX())) this.endingCycle();
				//this.loadingOneBy(manipulateIDX.getCurrentIDX());
				//manipulateIDX.getNextIDX(this.endingCycle);
			} else {
				//console.log('plaques');
				timeControl.clearSideTimer(loadSideBar);
				hideSideBarArray();
				hideScreen01();
				hideScreen02();
				this.loadingPlaques(rendP);
			}
		},
		loaAlternateEvery: function(rendP){
			if(this.isOneBy()){
				this.setProcessPlaque();
				hideScreen02();
				this.loadingOneBy(manipulateIDX.getCurrentIDX());
				manipulateIDX.getNextIDX(this.endingCycle);
			} else {
				this.setProcessOneBy();
				hideScreen01();
				this.loadingPlaques(rendP);
			}
		},
		loadingOneBy: function(lastNum){
			showScreen01();
			if(manipulateIDX.isOutOfRange(lastNum)) this.endingCycle();
			else {
				loadElement(lastNum);
			}
		},
		endingCycle: function(){
			console.log("endingCycle: ");
			manipulateIDX.initIDX();
			i = -1;
			if(DISPLAY_SETTING == 2){
				if(pRun == 2) pRun = 1;
				else pRun = 2;
			}
			//console.log("endingCycle: " + pRun);
		},
		loadingPlaques: function(rendP){
			rendP.renderScreen(this.endingCycle);
		},
		setProcessOneBy: function(){
			pRun = 1;
		},
		setProcessPlaque: function(){
			pRun = 2;
		},
		isOneBy: function(){
			return pRun == 1;
		},
		isPlaque: function(){
			return pRun == 2;
		},

	};
	return actions;
}

/////////////////////////////////////////////////////////
// currently:
//		getNum returns 0 for the first occurrrence, or
//									 i+1 for the next, or
//									 -1 - signaling the end of the cycle.
/////////////////////////////////////////////////////////

var manipulateIDX = function(){
	var idx = 0;
	var last = YahrList.Yahrzeits.length - 1;
	var overTheTop = last + 3;

	var actions = {
		setCurrentIDX: function(i){
			idx = i;
		},
		incrementIDX: function(){
			idx++;
		},
		getCurrentIDX: function(){
			return idx;
		},
		// note: this can set idx out of range...
		getNextIDX: function(){
				this.setCurrentIDX(this.getNextInRange());
				return this.getCurrentIDX();
		},
		isOutOfRange: function(i){
			if(i) return i > last;
			return idx > last;
		},
		initIDX: function(){
			idx = 0;
		},
		getCurrentDate: function(){
				//console.log(this.getCurrentIDX());
				return YahrList.Yahrzeits[this.getCurrentIDX()].HDate;
		},
		getNextInRange: function(){
			var idxHold = this.getCurrentIDX();

			dateHold = this.getCurrentDate();
			var i = this.getCurrentIDX();
			//console.log('getNextInRange: ' + i);
			if(TESTING_OFF){
					while(dateHold.indexOf(currentMonth) < 0 && !this.isOutOfRange(i)){
						i++;
						if(this.isOutOfRange(i)) return i;
						dateHold = YahrList.Yahrzeits[i].HDate;
						if(dateHold.indexOf('Teves') > -1){
							var start = dateHold.indexOf('Teves');
							dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
						}
					}
			//if(i == idxHold) return i+1;
			return i;
		}
		return i;
		},
	};
	return actions;
}();
