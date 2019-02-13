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

function setupTimerLoad(){
	buildPanel01();
	setCurrentMonth();
	timerLoad();
}

function timerLoad(lastNum){
	//console.log("timerLoad: " + lastNum);
	var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 	if(lastNum) lastN = lastNum;
	//console.log("timerLoad2: " + lastN);
	if(DISPLAY_SETTING == 0) timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
	timeControl.setSideTimer(loadSideBar);
	if(DISPLAY_SETTING == 1) timeControl.setTimer(function(){ lastN = renderAll.loadingOneBy(lastN);});
	if(DISPLAY_SETTING == 2) timeControl.setTimer(function(){ renderAll.loadAlternate();});

	//	OneByInterval = setInterval( function(){ renderAll.loadingPlaques(rendPlaques);}, tf);
	//if(DISPLAY_SETTING == 1)
	//	OneByInterval = setInterval( function(){ renderAll.loadingOneBy();}, tf);
	//if(DISPLAY_SETTING == 2)
	//	OneByInterval = setInterval( function(){ renderAll.loadAlternate();}, tf);
}

function sideTimerLoad(lastNum){
	//console.log("timerLoad: " + lastNum);
	var lastN = -1;
	var renderAll = new renderBoth();
	var rendPlaques = new renderingPlaquesX(renderAll.endingCycle);
 	if(lastNum) lastN = lastNum;
	//console.log("timerLoad2: " + lastN);
	timeControl.setTimer(function(){ renderAll.loadingPlaques(rendPlaques);});
}

var renderBoth = function(){
	var i = -1;
	var pRun = 1;
	var actions = {
		loadAlternate: function(){
			if(this.isOneBy()){
				hideScreen02();
				this.loadingOneBy(i);
			} else {
				hideScreen01();
				this.loadingPlaques();
			}
		},
		loadAlternateEvery: function(){
			if(this.isOneBy()){
				hideScreen02();
				this.loadingOneBy(i);
				this.setProcessPlaque();
			} else {
				hideScreen01();
				this.loadingPlaques();
				this.setProcessOneBy();
			}
		},
		loadingOneBy: function(lastNum){
			//console.log("loadingOneBy: " + lastNum);
			i = lastNum ? lastNum : i;
			i = getNum(i);
			loadElement(i, this.endingCycle);
			return i;
		},
		endingCycle: function(){
			i = -1;
			if(DISPLAY_SETTING == 2){
				if(pRun == 2) pRun = 1;
				else pRun = 2;
			}
		},
		loadingPlaques: function(rendP){
			rendP.renderScreen();
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


function getNum(i){
	var last = YahrList.Yahrzeits.length - 1;
	i++;
	if(i > last){
		i = 0;
		resetSideBar();
	}
	var dateHold = YahrList.Yahrzeits[i].HDate;
	if(TESTING_OFF)
		while(dateHold.indexOf(currentMonth) < 0 && i < last){
			i++;
			dateHold = YahrList.Yahrzeits[i].HDate;
			if(dateHold.indexOf('Teves') > -1){
				var start = dateHold.indexOf('Teves');
				dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
				//console.log(dateHold);
			}
		}
	else {
		dateHold = YahrList.Yahrzeits[i].HDate;
		if(dateHold.indexOf('Teves') > -1){
			var start = dateHold.indexOf('Teves');
			dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
		}
	}

	if(i > last) i = -1;
	return i;
}
