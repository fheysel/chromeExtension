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
