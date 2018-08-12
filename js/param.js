function buildParamString(YahrList, currentIDX){
  var params = "ID=" + YahrList.Yahrzeits[currentIDX].ID;
  params += "&Name=" + YahrList.Yahrzeits[currentIDX].Name;
  params += "&HName=" + YahrList.Yahrzeits[currentIDX].HName;
  params += "&EDate=" + YahrList.Yahrzeits[currentIDX].EDate;
  params += "&HDate=" + YahrList.Yahrzeits[currentIDX].HDate;
  params += "&Pic01=" + YahrList.Yahrzeits[currentIDX].Pic01;
  params += "&Pic02=" + YahrList.Yahrzeits[currentIDX].Pic02;
  //params += "&FBook=" + YahrList.Yahrzeits[currentName].Pic02;
  params += "&Comments01=" + YahrList.Yahrzeits[currentIDX].Comments01;
  return params;
}
