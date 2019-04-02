var seatSection = function(){
  var assignmentStack = [];
  var clickStack =[];
  var StackPointer = 0;
  var firstWithControl = true;

  var lastDivID = "";
  var lastRow = "";
  var rowCount = 0;
  var colCount = 0;

  var useCount = 0;
  var leftAreaID = "";
  var targetAreaID = "";
  var targetSectionNameID = "";
  var targetSeatTableID = "";
  var RowEx = "A";
  var Row = "A";

  var actions = {
      initCounts: function(){
        lastDivID = "";
        lastRow = "";
        rowCount = 0;
        colCount = 0;
      },
      setPosition: function(name, top, left){
        var div = document.getElementById(name);
        div.style.position = "absolute";
        div.style.top = top + 'px';
        div.style.left = left + 'px';

        var div = document.getElementById("RIGHT");
        div.style.position = "absolute";
        div.style.top = 26 + 'px';
        div.style.left = 890 + 'px';
      },
      createHTML: function(sectionName){
        var areaContainerDiv = document.getElementById("areaContainer");
        var leftAreaDiv = document.createElement("div");
        leftAreaID = "LEFT" + useCount;
        leftAreaDiv.id = leftAreaID;
        leftAreaDiv.className = "LEFT";
        areaContainerDiv.appendChild(leftAreaDiv);

        var targetAreaDiv = document.createElement("div");
        targetAreaID = "targetArea" + useCount;
        targetAreaDiv.id = targetAreaID;
        targetAreaDiv.className = "targetArea";
        leftAreaDiv.appendChild(targetAreaDiv);

        var targetSectionNameDiv = document.createElement("div");
        targetSectionNameID = "targetSectionName" + useCount;
        targetSectionNameDiv.id = targetSectionNameID;
        targetSectionNameDiv.className = "targetSectionName";
        targetSectionNameDiv.innerHTML = sectionName;
        targetAreaDiv.appendChild(targetSectionNameDiv);

        var targetSeatTableDiv = document.createElement("table");
        targetSeatTableID = "targetSeatTable" + useCount++;
        targetSeatTableDiv.id = targetSeatTableID;
        targetSeatTableDiv.className = "targetSeatTable";
        targetAreaDiv.appendChild(targetSeatTableDiv);

        return leftAreaID;
      },

      getPeopleData:function(){
            var people = [{
                          "name":"Joey Applebaum",
                          "id":"00001",
                          "email":"JoeyApplebaum@gmail.com"
                        },
                        {
                          "name":"Biffy Bimbaum",
                          "id":"00002",
                          "email":"BiffyBimbaum@gmail.com"
                        },
                        {
                          "name":"Carla Cramer",
                          "id":"00003",
                          "email":"CarlaCramer@gmail.com"
                        },
                        {
                            "name":"Dov Ber Dershowitz",
                            "id":"00004",
                            "email":"DovBerDershowitz@gmail.com"
              }];
              return people;
            },

  renderPeople: function(){
    var people = this.getPeopleData();
    for (var i=0; i < people.length; i++){
      this.createPeopleDiv(people[i]);
    }
  },
  createPeopleDiv: function (perp){
    var div = document.createElement("div");
    var right = document.getElementById("RIGHT");

    div.className = "perpName";
    div.id = perp.id;
    div.addEventListener("click", function(event){
      actions.processPerp(event);
    });

    div.innerHTML = perp.name + "<br>" + perp.email;
    div.style.fontSize = "12px";
    right.appendChild(div);
  },
  nextChar:function (c) {
      var res = c == 'z' ? 'A' : c == 'Z' ? 'A' : String.fromCharCode(c.charCodeAt(0) + 1);
      return res;
  },
  getPerp:function (id){
    var people = this.getPeopleData();

      for(var i=0; i < people.length; i++){
        if(id == people[i].id) return i;
      }
      return -1;
  },
  processPerp:function (event){
      var people = this.getPeopleData();

      var spot = document.getElementById(event.target.id);
      clickStack.push(people[this.getPerp(event.target.id)]);
      spot.innerHTML = this.getInitials(people[this.getPerp(event.target.id)].name);
      StackPointer++;
      spot.style.background = "cyan";
  },
  showStack:function (stack){
    for (var i=0; i < stack.length; i++){
      console.log(stack[i]);
    }
  },
  displayAssignments: function(){
    console.log(assignmentStack);
    for (var i=0; i < assignmentStack.length; i++){
      assignment = assignmentStack[i];
      console.log(assignment.id);
      console.log(assignment.name);
      console.log(assignment.seat);
    }
  },
  getInitials:function (name){
      var inits = "";
        for (var i=0; i < name.trim().length; i++){
          if(i==0){
            inits = name.trim()[0];
          }
          if(name.trim()[i] == ' '){
            inits += name.trim()[i+1];
          }
        }
      var l = inits.length;
      if(l < 3){
        inits = '_' + inits;
        l++;
      }

      for(var i=l; i < 4; i++){
        inits += '_';
      }
      return inits;
  },
  processClick:function (event){
        var people = this.getPeopleData();

        var isCtrlPressed = event.ctrlKey;
        var assignment = {};
        var spot = document.getElementById(event.target.id);
        var row = event.target.id[0] + event.target.id[1];
        var col = event.target.id[2] + event.target.id[3];
        var seat = row + "-" + col;
        if(StackPointer < 1){
          if(isCtrlPressed) StackPointer = 0;
          else return;
        }
        if(isCtrlPressed){
           if(firstWithControl){
              firstWithControl = false;
              StackPointer--;
            }
        }
        else {
             StackPointer--;
             firstWithControl = true;
        }
        spot.innerHTML = this.getInitials(clickStack[StackPointer].name);
        spot.style.color = "blue";
        spot.style.fontSize = "10px";
        spot.style.border = "1px solid blue";
        assignment.id = clickStack[StackPointer].id;
        assignment.name = people[this.getPerp(clickStack[StackPointer].id)].name;
        assignment.seat = seat;
        assignmentStack.push(assignment);
        if(!isCtrlPressed) clickStack.pop();
        //this.showStack(assignmentStack);
    },
    createDiv:function (divID, lastSwitch){
        var targetSeats = document.getElementById(targetSeatTableID);
        var newDivID = divID.substring(0,2);
        if(!lastDivID || lastDivID !== newDivID){
          lastRow = targetSeats.insertRow(rowCount++);
          colCount = 0;
          lastRow.className = "targetSeats";
          lastDivID = newDivID;
        }
        var square = lastRow.insertCell(colCount++);

        square.className = "target";
        square.id = divID;
        square.addEventListener("click", function(event){
          actions.processClick(event);
        });

        square.innerHTML = divID;
      },
      createSection:function (r, c){
            this.initCounts();
            var checkWidth = 0;
            var checkHeight = 0;
            var numRows = r;
            var numCols = c;
            for(var k=1; k <= numRows; k++){
                  for(var i=1; i<=numCols; i++){
                    if(k == 1) checkWidth += 32;
                    var j = i;
                    if(i < 10){
                      j = "0" + i;
                    }
                    this.createDiv(RowEx + Row + j, (numRows == k) && (numCols == i));
                  }
                  Row = this.nextChar(Row);
                  checkHeight += 38;
                  if(numRows > 3) checkHeight -= 10;
                  if(numRows > 6) checkHeight -= 3;
                  if(numRows > 8) checkHeight -= 2;
                  if(numRows > 15) checkHeight -= 1;
                  if(k > 25) RowEx = "B";
                }

            targetArea = document.getElementById(targetAreaID);
            targetArea.style.width = checkWidth + "px";
        },
      }
      return actions;
    }();
