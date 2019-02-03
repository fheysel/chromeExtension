var slotsBooked = 0;

function updateColour(slot){
  slot.backgroundColor = "yellow";
}

var theParent = document.getElementById("theCalendar");
theParent.addEventListener("click", clickReact, false);

function clickReact(e){
  if (e.target != e.currentTarget && e.target.className == 'slot') {
    if(e.target.style.backgroundColor == 'yellow'){
      e.target.style.backgroundColor = 'green';
      slotsBooked--;
    }
    else if(e.target.style.backgroundColor == 'red'){
      //do nothing
    }
    else{
      if(slotsBooked < 3){
        slotsBooked++;
        e.target.style.backgroundColor = 'yellow';
      }
      else{
        alert("D!bs only allows you to have 3 hours reserved at a time")
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

var newSelect=document.getElementById("selector");

for(i=0; i<14; i++){
  var opt = document.createElement("option");
   opt.value= dateArray[i];
   opt.innerHTML = dateArray[i]; // whatever property it has
   console.log(dateArray[i]);

   // then append it to the select element
   newSelect.appendChild(opt);
}


//////////////////////API//////////////////////////////////////
var selectorButton = document.getElementById("selectorButton");
selectorButton.addEventListener("click", newDay, false);

function newDay(e){
  var selected = document.getElementById('dateSelector');
  var dateSelected = selected.value;

    $('#roomBlock').append("Selected: " + dateSelected + "<br />");

  loadNewDay("2-7-2019");
  e.stopPropagation;
}

function loadNewDay(day){
  var elements = document.body.getElementsByTagName('div');

  for(var i=0; i<elements.length; i++){
    if(elements[i].className == 'slot'){
      elements[i].style.backgroundColor = "green";
    }
  }

  var roomID;
  var parsedStartTime;
  var parsedEndTime;
  var blocks;
  var slotID;
  var roomHalf;
  var i;


  $('#roomBlock').append("Day selected: " + day + "<br />");
  for(roomID=1; roomID < 41; roomID++){
    $.getJSON("https://queensu.evanced.info/dibsAPI/reservations/"+day+ "/"+roomID,
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

$(document).ready(function () {
    loadNewDay("2-2-2019");
});
