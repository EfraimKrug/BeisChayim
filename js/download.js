

var fileName01 = "";
var fileName02 = "";

function keepFileName(picNum){
	if(picNum == 1){
  	var f = document.getElementById("filename1");
		fileName01 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}

	if(picNum == 2){
  	var f = document.getElementById("filename2");
		fileName02 = f.value.substring(f.value.lastIndexOf('\\') + 1);
	}
}


function createNewID(){
	var idList = [];
	for(var i=0; i < YahrList.Yahrzeits.length; i++){
			if(YahrList.Yahrzeits[i].ID < 99999){
				idList.push(YahrList.Yahrzeits[i].ID);
			}
	}

	// console.log(idList);

	idList.sort();
	if(idList.length == 0){
		//console.log("empty");
		return 90001;
	} else {
		return Number(idList[idList.length - 1]) + 1;
	}
}


function addStuff(edit){
	if(!edit){
		ID = createNewID();
	}
	var id = "\"ID\":\"" + ID + "\"";
	var name = "\"Name\":\"" + escapeHTML(document.getElementById("name").value) + "\"";
	var bground = "\"BGround\":\"" + escapeHTML(document.getElementById("bground").value) + "\"";
	var hname = "\"HName\":\"" + escapeHTML(document.getElementById("hname").value) + "\"";
	var edate = "\"EDate\":\"" + escapeHTML(document.getElementById("edate").value) + "\"";
	var hdate = "\"HDate\":\"" + escapeHTML(document.getElementById("hdate").value) + "\"";
	var pic01 = "\"Pic01\":\"" + escapeHTML(document.getElementById("pic01").innerHTML) + "\"";
	var pic02 = "\"Pic02\":\"" + escapeHTML(document.getElementById("pic02").innerHTML) + "\"";

	if(fileName01.trim() !== ""){
		pic01 = "\"Pic01\":\"" + escapeHTML(fileName01) + "\"";
	}
	if(fileName02.trim() !== ""){
		var pic02 = "\"Pic02\":\"" + escapeHTML(fileName02) + "\"";
	}
	var mournby = "\"MournBy\":\"" + escapeHTML(document.getElementById("mournby").value) + "\"";
	var relationship = "\"Relationship\":\"" + escapeHTML(document.getElementById("relationship").value) + "\"";

	var fbook = "\"FBook\":\"\"";
	var comments01 = "\"Comments01\":\"" + escapeHTML(document.getElementById("comments01").value) + "\"";
	var line = "'{" + id + "," + bground + "," + name + ","  +
	hname + "," + edate + "," + hdate + "," + mournby + "," + relationship + "," +
	pic01 + "," + pic02 + "," + fbook + "," + comments01 + "},' + " ;
	if(!edit){
		download(line, escapeHTML("$$BC$$New00" + ID), "text/plain");
	} else {
		download(line, escapeHTML("$$BC$$" + ID), "text/plain");
	}
}
// Function to download data to a file
function download(data, filename, type) {
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

function escapeHTML(usafe) {
  return usafe.replace(/[&<"',>]/g, function(m) {
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
