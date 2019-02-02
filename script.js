var slotsBooked = 0;

function updateColour(slot){
  slot.backgroundColor = "red";
}

var theParent = document.getElementById("theCalendar");
theParent.addEventListener("click", clickReact, false);

function clickReact(e){
  if (e.target != e.currentTarget && e.target.className == 'slot') {
    if(e.target.style.backgroundColor == 'red'){
      e.target.style.backgroundColor = 'green';
      slotsBooked--;
    }
    else{
      if(slotsBooked < 3){
        slotsBooked++;
        e.target.style.backgroundColor = 'red';
      }
      else{
        alert("D!bs only allows you to have 3 hours reserved at a time")
      }
    }

    // alert("hello " + e.target.id + " poop " + e.target.className);
  }
  e.stopPropagation;
}

var request = new XMLHttpRequest();

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      console.log(movie.title);
    });
  } else {
    console.log('error');
  }
}

request.send();

var request2 = new XMLHttpRequest();

request2.open('GET', 'https://queensu.evanced.info/dibsAPI/reservations/2019-01-06/3', true);
request2.onload = function (){
  var data2 = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data2.forEach(StartTimeHour => {
      console.log(StartTimeHour.title);
    });
  } else {
    console.log('error');
  }
}

request2.send();



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
