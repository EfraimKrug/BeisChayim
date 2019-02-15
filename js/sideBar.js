var offset = 0;
var FONT_SIZE = "14";

function resetSideBar(){
		SideBarList = [];
		var max = parseInt(MAX_SLOTS) + 1;
		for(var i=1; i < max; i++){
			var name = "sbar0" + i;
			var e = document.getElementById(name);
		}
}

function ListCounterInc(lCounter){
	if(lCounter >= SideBarList.length - 1){
		return 0;
	}
	return lCounter + 1;
}

function SideBarCounterInc(SBCounter){
	if(SBCounter >= MAX_SLOTS){
		return 1;
	}
	return SBCounter + 1;
}

function getBGround(pl){
	return "sbarpl" + pl;
}

function hideSideBarArray(){
	var slotCounter = 1;

	for (var i=1; i < 17 ; i++){
		var sbar = document.getElementById("sbar0" + i);
		sbar.style.display = "none";
	}
}

function getGridColumn(){
	var col = getPenUltimateColumn();
	if (col < 4) col = 4;
	return col;
}

//****************************************************
//*	pdfPix is accessed when the element in clicked...
//*
//*		getFirstPDF -returns the first pdf image name
//*		getNextPDF - returns next pdf image name
//*		getPrevPDF - returns previous image name
//*
//* 		Once the name is returned, it must be
//*				loaded into the div.src:
//*			setName - loads the name into the div.src
//*			makeVisible - makes the div visible
//*			makeNotVisible - makes the div hidden
//************************************************

var pdfPix = function(idx){
	var currentIDX = idx;

	var pdfView = document.getElementById("pdfView");
	var pdfImg = document.getElementById("pdfImg");
	var appBody = document.getElementById("appBody");

	var pdfCurrency = 1;
	var pdfName = "";

	var actions = {
			setCurrency: function(val){
				pdfCurrency = val;
			},
			incCurrency: function(){
				if(pdfCurrency < 5) pdfCurrency++;
			},
			decCurrency: function(){
				if(pdfCurrency > 1) pdfCurrency--;
			},
			getNextPDF: function(div){
				if((div.target.id.indexOf("sbar") == 0)&&(RunPhaseView() )){
					BodyListener.removeBodyListener("pdf");
				}
				timeControl.clearTimer();
				timeControl.clearSideTimer();
				actions.setName();
				actions.makeVisible();
				if(actions.noPicture()){
					timerLoad(currentIDX + 1);
				}
				actions.incCurrency();
			},
			getPrevPDF: function(){
				this.decCurrency();
				this.makeVisible();
				this.setName();
			},
			makeVisible: function(){
				pdfImg.style.display = "inline";
				pdfView.style.display = "inline";
			},
			makeNotVisible: function(){
				pdfImg.style.display = "none";
				pdfView.style.display = "none";
			},
			isNext: function(){
				var pdfCurrencyNext = pdfCurrency + 1;
				if(pdfCurrencyNext > 5) return false;
				var pdfNameTemp = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrencyNext);
				if(pdfNameTemp.trim() == "") return false;
				return true;
			},
			setName: function(){
				if(this.noPicture()){
					console.log("clearing");
					this.clearName();
				} else {
					pdfName = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrency);
					pdfImg.src = "./pdf/" + pdfName;
					this.makeVisible();
				}
			},
			clearName: function(){
				pdfImg.src = "";
				this.makeNotVisible();
			},
			noPicture: function(){
				if(currentIDX > YahrList.Yahrzeits.length - 1) return true;
				pdfName = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrency);
				//console.log(eval("YahrList.Yahrzeits[" + currentIDX + "].ID"));
				//console.log(pdfName + ":" + pdfCurrency);
				if(pdfName.trim() == ""){
					return true;
				}
				return false;
			}
	};

	return actions;
}


function setCurrentMonth(){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	//console.log("Setting currentMonth: " + typeof(htoday.month));
	//var m = toString(htoday.month);
	if(htoday.month.indexOf("Adar A") > -1){
		currentMonth = "Adar";
	} else {
		currentMonth = htoday.month;
	}
	return htoday;
	//console.log("Current Month: " + currentMonth);
}

var sideBarManip = function(){
	var listCounter = 0;
	var slotCounter = 1;

	var actions = {
							loadSideBar: function(){
									//console.log("loadSideBar");
									var htoday = setCurrentMonth();
									resetSideBar();
									for(var i = 0; i < YahrList.Yahrzeits.length; i++){
										var dateHold = fixDate(YahrList.Yahrzeits[i].HDate);
										if(dateHold.indexOf('Teves') > -1){
											var start = dateHold.indexOf('Teves');
											dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
										}

										if(YahrList.Yahrzeits[i].Name.indexOf("(demo)") > 0){
											actions.loadSideBarArray(i);
										} else
										if(dateHold.indexOf(htoday.month) > -1){
											dateHold = dateHold.trim();
											if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
												actions.loadSideBarArray(i);
											}
										}
									}
									actions.renderSideBarArray();
								},

							loadSideBarArray: function(i){
									//console.log("loadSideBarArray");
									var spot = SideBarList.length; //first empty spot
									var outLine;
									var dt;


									dt = fixDate(YahrList.Yahrzeits[i].HDate);
									if(DATES_IN_HEBREW)
										dt = translateDate(fixDate(YahrList.Yahrzeits[i].HDate));

									outLine = YahrList.Yahrzeits[i].HName + "<br>" + dt;

								  if(!YahrList.Yahrzeits[i].HName)
										outLine = YahrList.Yahrzeits[i].Name + "<br>" + dt;

									for(var j=0; j < spot; j++){
										if(SideBarList[j] == outLine) return;
									}

									PayLevelList[spot] = YahrList.Yahrzeits[i].PayLevel ? YahrList.Yahrzeits[i].PayLevel : 0;
									SideBarList[spot] = outLine;
									YahrzeitListSpotList[spot] = i;
								},

							renderSideBarArray: function(){
										//console.log("renderSideBarArray");
										MAX_SLOTS = SideBarList.length < MAX_SLOTS ? SideBarList.length : MAX_SLOTS;
										for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
											var sbar = document.getElementById("sbar0" + slotCounter);
											this.renderBox(sbar);
											}
											listCounter = ListCounterInc(listCounter);
											slotCounter = SideBarCounterInc(slotCounter);
									},
							renderBox: function(sbar){
										//console.log("renderBox");
										//var sect;
										sbar.className = "sbar";
										//if( !screenHidden ) sbar.style.display = "inline";
										sbar.style.left = getSideBarLeft() + "px";
										sbar.style.top = getSideBarTop(slotCounter);
										sbar.className = getBGround(PayLevelList[listCounter]);
										sbar.style.height = getSideBarHeight();
										sbar.style.width = getPanelSideBoxWidth() + "px";
										var fs = parseInt(getSideBarFont()) + parseInt(PayLevelList[listCounter]);
										sbar.style.fontSize = fs + "px";
										sbar.innerHTML = SideBarList[listCounter];
										sbar.style.display = 'inline';
										var pdfSide = null;
										pdfSide = new pdfPix(YahrzeitListSpotList[listCounter]);

										if(RunPhaseView()){
											var pdfName = eval("YahrList.Yahrzeits[" + YahrzeitListSpotList[listCounter] + "].PDF01");
											if (pdfName.trim() != ""){
												BodyListener.setSideFunction(pdfSide.getNextPDF);
												BodyListener.addSideListener("side",sbar);
											}
										}
									},
		};
		return actions;
	}();
