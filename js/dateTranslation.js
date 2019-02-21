
var alef='א';
var bet='ב';
var gimel='ג';
var dalet='ד';
var heh='ה';
var vov='ו';
var zion='ז';
var chet='ח';
var tet='ט';
var yod='י';
var kofsofit='ך';
var kof='כ';
var lamed='ל';
var memsofit='ם';
var mem='מ';
var nunsofit='ן';
var nun='נ';
var samech='ס';
var ayin='ע';
var paysofit='ף';
var pay='פ';
var tzadisofit='ץ';
var tzadi='צ';
var koof='ק';
var resh='ר';
var shin='ש';
var tof='ת';
var chuk="`";
var alefBet = [alef,bet,gimel,dalet,heh,vov,zion,chet,tet,yod,kof,lamed,mem,nun,samech,ayin,pay,tzadi,koof,resh,shin,tof];

function getMonth(m){
  switch(m){
    case "Nissan": return nun + yod + samech + nunsofit;
    case "Iyar": return alef + yod + yod + resh;
    case "Iyyar": return alef + yod + yod + resh;
    case "Sivan": return samech + yod + vov + nunsofit;
    case "Tamuz": return tof + mem + vov + zion;
    case "Tammuz": return tof + mem + vov + zion;
    case "Av": return alef + bet;
    case "Elul": return alef + lamed + vov + lamed;
    case "Tishrei": return tof + shin + resh + yod;
    case "Cheshvan": return mem + resh + ' ' + chet + shin + vov + nunsofit;
    case "Kislev": return kof + samech + lamed + vov;
    case "Tevet": return tet + bet + tof;
    case "Shevat": return shin + bet + tet;
    case "Shvat": return shin + bet + tet;
    case "AdarII": return alef + dalet + resh + " " + shin + nun + yod;
    case "Adar": return alef + dalet + resh;
  }
  return "";
}

function display(y){
  show = document.getElementById("show");
  show.style.fontSize = "36px";
  show.innerHTML = y;
}
//alert(x);
function buildDay(d){
    //console.log(d);
    var day = d;
    var bld = "";
    var count = 0;

    if(!d) return "";

      bld =  "";
      if(day == "1") bld = resh + alef + shin + " " + chet + vov + dalet + shin;
      if(day == "2") bld =  alefBet[1] + chuk;
      if(day == "3") bld =  alefBet[2] + chuk;
      if(day == "4") bld =  alefBet[3] + chuk;
      if(day == "5") bld =  alefBet[4] + chuk;
      if(day == "6") bld =  alefBet[5] + chuk;
      if(day == "7") bld =  alefBet[6] + chuk;
      if(day == "8") bld =  alefBet[7] + chuk;
      if(day == "9")  bld =  alefBet[8] + chuk;
      if(day == "10") bld =  yod + chuk;
      if(day == "11") bld =  yod + chuk + alef;
      if(day == "12") bld =  yod + chuk + bet;
      if(day == "13") bld =  yod + chuk + gimel;
      if(day == "14") bld =  yod + chuk + dalet;
      if(day == "15") bld =  tet + chuk + vov;
      if(day == "16") bld =  tet + chuk + zion;
      if(day == "17") bld =  yod + chuk + zion;
      if(day == "18") bld =  yod + chuk + chet;
      if(day == "19") bld =  yod + chuk + tet;
      if(day == "20") bld =  kof + chuk;
      if(day == "21") bld =  kof + chuk + alef;
      if(day == "22") bld =  kof + chuk + bet;
      if(day == "23") bld =  kof + chuk + gimel;
      if(day == "24") bld =  kof + chuk + dalet;
      if(day == "25") bld =  kof + chuk + vov;
      if(day == "26") bld =  kof + chuk + zion;
      if(day == "27") bld =  kof + chuk + zion;
      if(day == "28") bld =  kof + chuk + chet;
      if(day == "29") bld =  kof + chuk + tet;
      if(day == "30") bld =  lamed + chuk;
    return bld;
}

function getTens(y){
  var offset = (90 - y)/10;
  return alefBet[17 - offset];
}

function buildYear(y){
  var year = y;
  var bld = "";
  var count = 0;
  if(!y) return "";
  if(year > 5000){
    year -= 5000;
  }
  while (year > 100){
    year -= 100;
    count++;
  }
  bld = tof + alefBet[13 + count];
  var re = year % 10;
  if(re % 10 == 0){
    bld += chuk + getTens(year);
    return bld;
  } else {
    if(year == 15){
      bld += tet + chuk + vov;
      return bld;
    }
    if(year == 16){
      bld += tet + chuk + zion;
      return bld;
    }
  }
  count = 0;
  while (year > 10){
    year -= 10;
    count++;
  }
  bld += alefBet[8+count];
  count=0;
  while (year > 0){
    year -= 1;
    count++;
  }
  bld += chuk + alefBet[count-1];
  return (bld);
}
/*****************************************************/
// dt must be: day<space>month-name<comma>year
/*****************************************************/
function translateDate(dt){
  dt = dt.replace("Adar II", "AdarII");
  //console.log(dt);
  if(dt.match(/\d+\s+\w+(,|\s+)\s*\d\d\d\d/i)){
    day = dt.substring(0,dt.indexOf(" "));
    month = dt.trim().substring(dt.indexOf(" ")+1, dt.indexOf(","));
    year = dt.trim().substring(dt.length - 4);
    return buildDay(day) + " " + getMonth(month) + " " + buildYear(year);
  }
  if(dt.match(/\d+\s+\w+/i)){
      day = dt.substring(0,dt.indexOf(" "));
      month = dt.trim().substring(dt.indexOf(" ")+1);
      return buildDay(day) + " " + getMonth(month) + " ";
    }
}

// testing:::
// var test = [
//   "15 Adar, 5623",
//   "16 Nissan, 5763",
//   "17 Iyar, 5764",
//   "18 Sivan, 5765",
//   "19 Tamuz, 5766",
//   "20 Av, 5767",
//   "21 Elul, 5768",
//   "22 Tishrei, 5769",
//   "23 Cheshvan, 5770",
//   "24 Kislev, 5771",
//   "25 Tevet, 5772",
//   "26 Shevat, 5773",
//   "27 Adar II, 5774",
//   "28 Adar, 5775"
// ];
//
// str = "";
// for (i=0; i < 14; i++){
//   str += translate(test[i]) + "<br>";
// }
// display(str);
