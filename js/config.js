//var ConfigList = '{ "settings":' +
//'{"time_factor":"3","password":"abc","slots":"9"}}';

var passkey = "";
var pkLetterCount = 0;

var config = JSON.parse(ConfigList);
console.log(config);
document.getElementById("time_factor").value = config.settings["time_factor"].replace(/%20/g,"");
document.getElementById("password").value = config.settings["password"].replace(/%20/g,"");
document.getElementById("slots").value = config.settings["slots"].replace(/%20/g,"");

function addStuffConfig(){
	var time_factor = "\"time_factor\":\"" + escapeHTML(document.getElementById("time_factor").value) + "\"";
	var password = "\"password\":\"" + escapeHTML(document.getElementById("password").value) + "\"";
	var slots = "\"slots\":\"" + escapeHTML(document.getElementById("slots").value) + "\"";
	var fline = "var ConfigList = '{ \"settings\": ";
	var line = "{" + time_factor + "," + password + "," + slots + "}}';";
	download3(fline + line, "BCConfig", "text/plain");
}
// Function to download data to a file
function download3(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

var escapeHTML = function(unsafe) {
  return unsafe.replace(/[&<"',>]/g, function(m) {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case ',':
        return '&comma;';
      case '"':
        return '&quot;';
      default:
        return '&#039;';
    }
  });
};

function kbclick(ky){
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
