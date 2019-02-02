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
