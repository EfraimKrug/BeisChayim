var offset = 0;
var FONT_SIZE = "14";
var HIDE_SIDE_BAR = false;

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
	HIDE_SIDE_BAR = true;
	var slotCounter = 1;

	for (var i=1; i < 17 ; i++){
		var sbar = document.getElementById("sbar0" + i);
		sbar.style.display = "none";
	}
}

function showSideBarArray(){
	HIDE_SIDE_BAR = false;
}

function getGridColumn(){
	var col = getPenUltimateColumn();
	if (col < 4) col = 4;
	return col;
}

//****************************************************
//*	pdfPix is accessed when the element in clicked...
//*
//*		getFirstp -returns the first pdf image name
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
			setCurrentIDX: function(){
				currentIDX = manipulateIDX.getLastIDX();
			},
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
				actions.setCurrentIDX();
				timeControl.clearTimer();
				timeControl.clearSideTimer();
				actions.setName();
				actions.makeVisible();
				if(actions.noPicture()){
					TLoad.setCorrectTimer();
					actions.setCurrency(1);
					return;
				}
				actions.incCurrency();
			},
			getPrevPDF: function(){
				actions.setCurrentIDX();
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
				actions.setCurrentIDX();
				var pdfCurrencyNext = pdfCurrency + 1;
				if(pdfCurrencyNext > 5) return false;
				var pdfNameTemp = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrencyNext);
				if(pdfNameTemp.trim() == "") return false;
				return true;
			},
			setName: function(){
				actions.setCurrentIDX();
				if(this.noPicture()){
					this.clearName();
				} else {
					// console.log("Setting name");
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
				actions.setCurrentIDX();
				// console.log("idx: " + currentIDX);
				if(currentIDX > YahrList.Yahrzeits.length - 1) return true;
				pdfName = eval("YahrList.Yahrzeits[" + currentIDX + "].PDF0" + pdfCurrency);
				// console.log(pdfName);
				if(pdfName.trim() == "" || pdfName.trim().indexOf("Nothing") > -1){
					return true;
				}
				return false;
			}
	};

	return actions;
}();


function setCurrentMonth(){
	var today = new Date();
	var htoday = G2H(today.getFullYear(), today.getMonth() + 1, today.getDate(), false);
	if(htoday.month.indexOf("Adar A") > -1){
		currentMonth = "Adar";
	} else {
		currentMonth = htoday.month;
	}
	return htoday;
}

var sideBarManip = function(){
	var listCounter = 0;
	var slotCounter = 1;
	var rb = new renderBoth();

	var actions = {
							loadSideBar: function(){
									var htoday = setCurrentMonth();

									resetSideBar();
									for(var i = 0; i < YahrList.Yahrzeits.length; i++){
										var dateHold = fixDate(YahrList.Yahrzeits[i].HDate);
										if(dateHold.indexOf('Teves') > -1){
											var start = dateHold.indexOf('Teves');
											dateHold = dateHold.substring(0, start+4) + 't' + dateHold.substring(start+6, dateHold.length);
										}
										if(dateHold.indexOf('Adar') > -1){
											if(currentMonth == 'Adar'){
												if(dateHold.indexOf('II') < 0){
													if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
														sideBarManip.loadSideBarArray(i);
													}
												}
											}
										}

										if(YahrList.Yahrzeits[i].Name.indexOf("(demo)") > 0){
											sideBarManip.loadSideBarArray(i);
										} else
										if(dateHold.indexOf(htoday.month) > -1){
											dateHold = dateHold.trim();
											if(parseInt(dateHold.substring(0, (dateHold.trim()).indexOf(' '))) == parseInt(htoday.day)){
												sideBarManip.loadSideBarArray(i);
											}
										}
									}
									sideBarManip.renderSideBarArray();
								},

							loadSideBarArray: function(i){
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
										MAX_SLOTS = SideBarList.length < MAX_SLOTS ? SideBarList.length : MAX_SLOTS;
										for (var i=0; (i < MAX_SLOTS) && (i < SideBarList.length); i++){
											var sbar = document.getElementById("sbar0" + slotCounter);
											this.renderBox(sbar);
											}
											listCounter = ListCounterInc(listCounter);
											slotCounter = SideBarCounterInc(slotCounter);
									},
							renderBox: function(sbar){
										if(HIDE_SIDE_BAR){
											return;
										}
										sbar.className = "sbar";
										sbar.style.left = getSideBarLeft() + "px";
										sbar.style.top = getSideBarTop(slotCounter);
										sbar.className = getBGround(PayLevelList[listCounter]);
										sbar.style.height = getSideBarHeight();
										sbar.style.width = getPanelSideBoxWidth() + "px";
										var fs = parseInt(getSideBarFont()) + parseInt(PayLevelList[listCounter]);
										sbar.style.fontSize = fs + "px";
										sbar.innerHTML = SideBarList[listCounter];
										sbar.style.display = 'inline';
										if(DATES_IN_HEBREW){
											sbar.style.textAlign = "right";
										}
										//pdfPix.setCurrentIDX(YahrzeitListSpotList[listCounter]);
									},
		};
		return actions;
	}();
