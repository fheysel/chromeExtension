///////////////////CALENDAR//////////////////////

var slotsBooked = 0;
var row = null;
var pendingSlot1 = null;
var pendingSlot2 = null;
var pendingSlot3 = null;

function makePending(slot){
  slotsBooked++;
  slot.style.backgroundColor = 'yellow';
  if(slotsBooked == 1){
    document.getElementById('shotgun').style.visibility = "visible";
  }
}

function removePending(slot){
  if(slot != null){
    slot.style.backgroundColor = 'green';
    slotsBooked--;
    if(slotsBooked == 0){
      document.getElementById('shotgun').style.visibility = "hidden";
    }
  }
}

function switchStart(slot){
  removePending(pendingSlot1);
  removePending(pendingSlot2);
  removePending(pendingSlot3);

  pendingSlot1 = slot;
  pendingSlot2 = null;
  pendingSlot3 = null;

  slotsBooked = 0;
  makePending(pendingSlot1);
  row = getRow(pendingSlot1);
}

function getCol(slot){//finds the column (room number) of the slot
    return parseInt(slot.id.slice(5));
}

function getRow(slot){//find the row (time slot)
  return parseInt(slot.id.slice(1,4));
}

var theParent = document.getElementById("theCalendar");
theParent.addEventListener("click", clickReact, false);

function clickReact(e){
  if (e.target != e.currentTarget && e.target.className == 'slot') {//Make sure this is part of the calendar
    if(e.target.style.backgroundColor == 'yellow'){//handle unclicking a pending slot
      if(slotsBooked == 1){
        removePending(e.target);
        pendingSlot1 = null;
      }
      else if(slotsBooked == 2){
        if(e.target.id == pendingSlot2.id){
          removePending(e.target);
          pendingSlot2 = null;
        }
        else{//removing the first, shift
          removePending(pendingSlot1);
          pendingSlot1 = pendingSlot2;
          pendingSlot2 = null;
        }
      }
      else{//3 slots booked therefore handle case when the middle is removed
        var colSum = getCol(pendingSlot1) + getCol(pendingSlot2) + getCol(pendingSlot3);
        var middleSlotCol = colSum / 3;

        if(getCol(e.target) == middleSlotCol){
          if(e.target.id == pendingSlot1.id){//handle removing middle
            switchStart(pendingSlot2);
          }
          else{
            switchStart(pendingSlot1);//start back at 1st selection
          }
        }
        else if(e.target.id == pendingSlot1.id){
          removePending(pendingSlot1);
          pendingSlot1 = pendingSlot2;
          pendingSlot2 = pendingSlot3;
          pendingSlot3 = null;
        }
        else if(e.target.id == pendingSlot2.id){
          removePending(pendingSlot2);
          pendingSlot2 = pendingSlot3;
          pendingSlot3 = null;
        }
        else if(e.target.id == pendingSlot3.id){
          removePending(pendingSlot3);
          pendingSlot3 = null;
        }
        else{
          alert("Something is rotten in the state of Denmark")
        }
      }
    }
    else if(e.target.style.backgroundColor == 'red'){
      //do nothing
    }
    else{//therefore green
      if(slotsBooked < 3){
        if(slotsBooked == 0){
          pendingSlot1 = e.target;
          row = getRow(pendingSlot1);
          makePending(pendingSlot1);
        }
        else{//2nd or 3rd selection
          if(getRow(e.target) != row){// different column, remove current pending slots and make selected pendingSlot1
            //alert(row + getRow(e.target));
            switchStart(e.target);
          }
          else{//same row
            if(slotsBooked == 1){//Second booking, make sure adjacent
              if(Math.abs(getCol(e.target) - getCol(pendingSlot1)) == 1){
                pendingSlot2 = e.target;
                makePending(pendingSlot2);
              }
              else{//not adjacent but same row
                switchStart(e.target);
              }
            }
            else{//Third Booking
              if(Math.abs(getCol(e.target) - getCol(pendingSlot1)) == 1 || Math.abs(getCol(e.target) - getCol(pendingSlot2)) == 1){//if adj to current block
                pendingSlot3 = e.target;
                makePending(pendingSlot3);
              }
              else{//not a part of current block
                switchStart(e.target);
              }
            }
          }
        }
      }
      else{//already 3 pending
        switchStart(e.target);
        //alert("D!bs only allows you to have 3 hours reserved at a time")
      }
    }
  }
  e.stopPropagation;
}


////////////////DATE/////////////////

var dayInMs = 86400000;
var dateArray = Array(14);
dateArray[0] = new Date(Date.now() + dayInMs*0);
dateArray[1] = new Date(Date.now() + dayInMs*1);
dateArray[2] = new Date(Date.now() + dayInMs*2);
dateArray[3] = new Date(Date.now() + dayInMs*3);
dateArray[4] = new Date(Date.now() + dayInMs*4);
dateArray[5] = new Date(Date.now() + dayInMs*5);
dateArray[6] = new Date(Date.now() + dayInMs*6);
dateArray[7] = new Date(Date.now() + dayInMs*7);
dateArray[8] = new Date(Date.now() + dayInMs*8);
dateArray[9] = new Date(Date.now() + dayInMs*9);
dateArray[10] = new Date(Date.now() + dayInMs*10);
dateArray[11] = new Date(Date.now() + dayInMs*11);
dateArray[12] = new Date(Date.now() + dayInMs*12);
dateArray[13] = new Date(Date.now() + dayInMs*13);

var i;
for(i=0; i<14; i++){
  dateArray[i] = dateArray[i].toDateString();
  //document.body.innerHTML = dateArray[i];
}

var newSelect = document.getElementById("selector");

for(i=0; i<14; i++){
  newSelect[i].label = dateArray[i];
  // var opt = document.createElement("option");
  //  opt.value = dateArray[i];
  //  opt.innerHTML = dateArray[i]; // whatever property it has
  //console.log(dateArray[i]);
   // then append it to the select element
   //newSelect.appendChild(opt);
}


//////////////////////API//////////////////////////////////////
var selectorButton = document.getElementById("selectorButton");
selectorButton.addEventListener("click", newDay, false);

function newDay(e){
  var selector = document.getElementById('selector');
  var selected = selector.options[selector.selectedIndex].label;

  var dateSelected = new Date(selected);
  var date = dateSelected.getDate();
  var month = dateSelected.getMonth() + 1; //Months are zero based
  var year = dateSelected.getFullYear();
  var formattedDate = month + "-" + date + "-" + year;
  loadNewDay(formattedDate);
  e.stopPropagation;
}


function loadNewDay(day){
  var elements = document.body.getElementsByTagName('div');
  var date = new Date(day);
  var topColumn = document.getElementsByClassName("topColumn");
  var time;
  var opacity;

  if(date.getDay() == 0 || date.getDay() == 6){//adjust calendar for weekend settings
    for(var i=0; i < 16; i++){//for every element in topColumn change time to be on hour not on half hour
        time = topColumn[i].innerHTML;
        time = time.substring(0,time.indexOf(':')) + ":00";
        topColumn[i].innerHTML = time;
    }
    opacity = 0.4;
  }
  else{//adjust calendar for weekday settings
    for(var i=0; i < 16; i++){//adjust the time for every other day of week
        time = topColumn[i].innerHTML;
        time = time.substring(0,time.indexOf(':')) + ":30";
        topColumn[i].innerHTML = time;
    }
    opacity = 1.0;
  }

  //load everything as green at start
  for(var i=0; i<elements.length; i++){
    if(elements[i].className == 'slot'){
      elements[i].style.backgroundColor = "green";

      if(elements[i].id.slice(5) >= 0 && elements[i].id.slice(5) < 3){
        elements[i].style.opacity = opacity;
      }
      else{
        elements[i].style.opacity = 1.0;
      }
    }
  }

  var roomID = 1;
  var parsedStartTime;
  var parsedEndTime;
  var blocks;
  var slotID;
  var roomHalf;
  var i;
  var dayString = day.toString();


//  $('#roomBlock').append("Day selected: " + dayString + "<br />");

  for(roomID=1; roomID < 41; roomID++){
    $.getJSON("https://queensu.evanced.info/dibsAPI/reservations/"+dayString+"/"+roomID,
        function processData(jsonData) {
            // Loop through each data block
            $.each(jsonData, function (object, objectData) {
                parsedStartTime = objectData.StartTime.slice(11, 13) - 7;//earliest booking is at 7
                parsedEndTime = objectData.EndTime.slice(11,13) - 8;//end time one less as it specifies when its available up to

                roomHalf = "r" + objectData.SpaceName.slice(4,7);
                blocks = parsedEndTime - parsedStartTime;

                for(i = parsedStartTime; i<=parsedEndTime; i++){
                    slotID = roomHalf + "t" + i;
                    elem = document.getElementById(slotID);

                    if(elem != null){
                      elem.style.backgroundColor = "red";
                    }
                    //$('#roomBlock').append("SlotID: " + slotID + "<br />");
                }

                // $('#roomBlock').append("Room ID: " + objectData.RoomID + "<br />");
                // $('#roomBlock').append("Room Name:" + objectData.SpaceName + "<br />")
                // $('#roomBlock').append("Start Time: " + parsedStartTime + "<br />");
                // $('#roomBlock').append("End Time: " + parsedEndTime + "<br />");
                // $('#roomBlock').append("<br />");
            });
        });
  }
}

///////ON START UP//////////////////
$(document).ready(function () {
  var today = dateArray[0];
  loadNewDay(today);

});
