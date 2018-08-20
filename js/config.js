//var ConfigList = '{ "settings":' +
//'{"time_factor":"3","password":"abc","slots":"9"}}';

var passkey = "";
var pkLetterCount = 0;

var config = JSON.parse(ConfigList);
//console.log(config);
document.getElementById("time_factor").value = config.settings["time_factor"].replace(/%20/g,"");
document.getElementById("password").value = config.settings["password"].replace(/%20/g,"");
document.getElementById("slots").value = config.settings["slots"].replace(/%20/g,"");

function addStuffConfig(){
	var time_factor = "\"time_factor\":\"" + escapeHTML(document.getElementById("time_factor").value) + "\"";
	var password = "\"password\":\"" + escapeHTML(document.getElementById("password").value) + "\"";
	var slots = "\"slots\":\"" + escapeHTML(document.getElementById("slots").value) + "\"";
	var fline = "var ConfigList = '{ \"settings\": ";
	var line = "{" + time_factor + "," + password + "," + slots + "}}';";
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
