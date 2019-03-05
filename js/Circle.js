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
				OneByInterval = setInterval(func, tf);
		},
		setSideTimer: function(func){
				SideInterval = setInterval(func, tf);
		},
		clearTimer: function(){
				clearInterval(OneByInterval);
		},
		clearSideTimer: function(){
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
	TLoad = timerLoad();
	TLoad.setCorrectTimer();
}


var timerLoad = function(){
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);

	var actions = {
			runPlaques: function(){
				  timeControl.setTimer(function(){
					hideScreen02();
					renderAll.loadingPlaques(rendPlaques);
					});
					manipulateIDX.initIDX();
			},
			runOneBy: function(){
				  timeControl.setSideTimer(sideBarManip.loadSideBar);
				  timeControl.setTimer(function(){
					renderAll.loadingOneBy(manipulateIDX.getNextIDX());
					manipulateIDX.incrementIDX();
					if(manipulateIDX.isOutOfRange(manipulateIDX.getCurrentIDX())) renderAll.endingCycle();
					});
				},
			runAlternate: function(){
				  timeControl.setSideTimer(sideBarManip.loadSideBar);
				  timeControl.setTimer(function(){
					if(renderAll.isPlaque()){
						BodyListener.removeBodyListener();
					}
					renderAll.loadAlternate(rendPlaques);
				});
			},
			setCorrectTimer: function(){
					if(DISPLAY_SETTING == 0){
						TLoad.runPlaques();
						return;
					}
					if(DISPLAY_SETTING == 1){
						TLoad.runOneBy();
						return;
					}
					if(DISPLAY_SETTING == 2){
						TLoad.runAlternate();
						return;
					}
				TLoad.runAlternate();
			},
		};
		return actions;
}

function sideTimerLoad(lastNum){
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);

	timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
}

var renderBoth = function(){
	var i = -1;
	var pRun = 1;
	var actions = {
		loadAlternate: function(rendP){
			if(this.isOneBy()){
				hideScreen02();
				this.loadingOneBy(manipulateIDX.getNextIDX());
				manipulateIDX.incrementIDX();
				if(manipulateIDX.isOutOfRange(manipulateIDX.getCurrentIDX())) this.endingCycle();
			} else {
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
			showSideBarArray();
			if(manipulateIDX.isOutOfRange(lastNum)) this.endingCycle();
			else {
				loadElement(lastNum);
			}
		},
		endingCycle: function(){
			manipulateIDX.initIDX(true);
			i = -1;
			if(DISPLAY_SETTING == 2){
				if(pRun == 2){
					timeControl.setSideTimer(sideBarManip.loadSideBar);
					pRun = 1;
				}
				else{
					timeControl.clearSideTimer(sideBarManip.loadSideBar);
					pRun = 2;
				}
			}
		},
		loadingPlaques: function(rendP){
			hideSideBarArray();
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
	var lastIDX = 0;
	var last = YahrList.Yahrzeits.length - 1;
	var overTheTop = last + 3;

	var actions = {
		getLastIDX: function(){
			return lastIDX;
		},
		setLastIDX: function(val){
			lastIDX = val;
		},
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
				this.setLastIDX(this.getCurrentIDX());
				this.setCurrentIDX(this.getNextInRange());
				return this.getCurrentIDX();
		},
		isOutOfRange: function(i){
			if(i) return i > last;
			return idx > last;
		},
		initIDX: function(reset){
			if(reset) idx = 0;
		},
		getCurrentDate: function(){
				return YahrList.Yahrzeits[this.getCurrentIDX()].HDate;
		},
		getNextInRange: function(){
			var idxHold = this.getCurrentIDX();

			dateHold = this.getCurrentDate();
			var i = this.getCurrentIDX();
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
			return i;
		}
		return i;
		},
	};
	return actions;
}();
