function buildParamString(YahrList, currentIDX){
  console.log(currentIDX);
  console.log(YahrList.Yahrzeits[currentIDX]);
  var params = "ID=" + YahrList.Yahrzeits[currentIDX].ID;
  params += "&BGround=" + YahrList.Yahrzeits[currentIDX].BGround;
  params += "&Name=" + YahrList.Yahrzeits[currentIDX].Name;
  params += "&HName=" + YahrList.Yahrzeits[currentIDX].HName;
  params += "&EDate=" + YahrList.Yahrzeits[currentIDX].EDate;
  params += "&HDate=" + YahrList.Yahrzeits[currentIDX].HDate;
  params += "&Pic01=" + YahrList.Yahrzeits[currentIDX].Pic01;
  params += "&Pic02=" + YahrList.Yahrzeits[currentIDX].Pic02;
  params += "&MournBy=" + YahrList.Yahrzeits[currentIDX].MournBy;
  params += "&Relationship=" + YahrList.Yahrzeits[currentIDX].Relationship;

  //params += "&FBook=" + YahrList.Yahrzeits[currentName].Pic02;
  params += "&Comments01=" + YahrList.Yahrzeits[currentIDX].Comments01;
  return params;
}
