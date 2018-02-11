var breakLength = 5;
var sessionLength = 25;
var minutes = 25;
var seconds = 0;
var started = false;
var working = true;
var tickTock;

//code for +/- buttons on session timer
$(".session").on("click", function() {
  if ($(this).hasClass("plus")){
    sessionLength++;
    $(this).siblings(".count").html(sessionLength);
  }
  else if ($(this).hasClass("minus")){
    if (Number($(this).siblings(".count").html()) > 1){
      sessionLength--;
      $(this).siblings(".count").html(sessionLength);
    }
  }
  refresh(true);
});

//code for +/- buttons on break timer
$(".breaks").on("click", function() {
  if ($(this).hasClass("plus")){
    breakLength++;
    $(this).siblings(".count").html(breakLength);
  }
  else if ($(this).hasClass("minus")){
    if (Number($(this).siblings(".count").html()) > 1){
      breakLength--;
      $(this).siblings(".count").html(breakLength);
    }
  }
  refresh(false);
});


//allows updating of timer when timer isnt running,
//also prevents other timer's buttons from changing current timer
function refresh(flag){
  if (!started){
    if (flag && working){
      minutes = sessionLength;
      seconds = 1;
      updater();
    }
    else if (!flag && !working){
      minutes = breakLength;
      seconds = 1;
      updater();
    }
  }
}

//updates time, moves minutes when seconds are empty
function updater (){
  seconds = seconds -1 ;
    if (seconds == 0 && minutes == 0){
      switcher();
    }

    if (seconds == -1){
      minutes-- ;
      seconds = 59;
    }

    if (minutes < 10){
      minuteBuffer = "0";
    }
    else{
      minuteBuffer = '';
    }
    if (seconds < 10){
      secondBuffer = "0";
    }
    else{
      secondBuffer = '';
    }

    // Output the result in an element with id="time"
    document.getElementById("time").innerHTML = minuteBuffer + minutes + ':' + secondBuffer +seconds;
};


//switches break and session timer
function switcher(){
  if (working){
    working = false;
    $("#task").html("Break");
    minutes = breakLength;
  }
  else{
    working = true;
    $("#task").html("Session");
    minutes = sessionLength;
  }
}


// code for the start button
$("#start").on("click", function(){
if (!started){
  // Update the count down every 1 second
  tickTock = setInterval(function(){ updater() }, 1000);
  started = true;
  $("#start").html("pause")
}
else{
  clearInterval(tickTock);
  started = false;
  $("#start").html("start")
}
});

//reset button code
$("#reset").on("click", function(){
  reset();
})

//reset code
function reset(){
  if (tickTock){
    clearInterval(tickTock);
  }
  if (working){
    minutes = sessionLength;
  }
  else{
    minutes = breakLength;
  }
  seconds = 1;
  updater();
  if ($("#start").html() == "pause"){
    started = false;
    $("#start").html("start");
  }
}


//session break switch code, working == session or break?
function switchUpdate(){
  if(working){
    $("#task").html("Session");
  }
  else{
    $("#task").html("Break");
  }
  reset();
}
//session break switch button
$("#switch").on("click", function(){
  working = !working;
  switchUpdate();
})
