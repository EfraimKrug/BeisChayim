// configuration files...
var config = JSON.parse(ConfigList);
var TIME_FACTOR = config.settings["time_factor"];
var COLUMN_COUNT = config.settings["column_count"];
var ROW_COUNT = config.settings["row_count"];
var MAX_SLOTS = config.settings["slots"];
var TIME_FACTOR = config.settings["time_factor"];
var DISPLAY_SETTING = config.settings["display_type"];
var SCREEN_TITLE = config.settings["screen_title"];
var PASSWORD = config.settings["password"];


var passkey = "";
var pkLetterCount = 0;

var config = JSON.parse(ConfigList);
//console.log(config);
function initConfigScreen(){
	document.getElementById("display_type").value = config.settings["display_type"].replace(/%20/g,"");
	document.getElementById("time_factor").value = config.settings["time_factor"].replace(/%20/g,"");
	document.getElementById("password").value = config.settings["password"].replace(/%20/g,"");
	document.getElementById("slots").value = config.settings["slots"].replace(/%20/g,"");
	document.getElementById("column_count").value = config.settings["column_count"].replace(/%20/g,"");
	document.getElementById("row_count").value = config.settings["row_count"].replace(/%20/g,"");
	document.getElementById("screen_title").value = config.settings["screen_title"].replace(/%20/g,"");
}

function addStuffConfig(){
	var display_type = "\"display_type\":\"" + escapeHTML(document.getElementById("display_type").value) + "\"";
	var time_factor = "\"time_factor\":\"" + escapeHTML(document.getElementById("time_factor").value) + "\"";
	var password = "\"password\":\"" + escapeHTML(document.getElementById("password").value) + "\"";
	var slots = "\"slots\":\"" + escapeHTML(document.getElementById("slots").value) + "\"";
	var column_count = "\"column_count\":\"" + escapeHTML(document.getElementById("column_count").value) + "\"";
	var row_count = "\"row_count\":\"" + escapeHTML(document.getElementById("row_count").value) + "\"";
	var screen_title = "\"screen_title\":\"" + escapeHTML(document.getElementById("screen_title").value) + "\"";

	var fline = "var ConfigList = '{ \"settings\": ";
	var line = "{" + display_type + "," + time_factor + "," + password + "," + slots + "," + column_count + "," + row_count + "," + screen_title + "}}';";
	download(fline + line, "BCConfig", "text/plain");
}


function kbclick(ky){
	//console.log("kbclick: " + ky + ":" + passkey);
	if(pkLetterCount & pkLetterCount > 4){
		passkey = "";
		pkLetterCount = 0;
	}
	else {
		passkey += ky;
		pkLetterCount++;
	}
	document.getElementById("password").value = passkey;
}
