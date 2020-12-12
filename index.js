
var snd = new Audio("sounds/pageturn.wav");
var close = new Audio("sounds/close.wav");
var failure = new Audio("sounds/fail.wav");

var audioElement0 = document.createElement('audio');
audioElement0.setAttribute('src', 'sounds/suspense.wav');
audioElement0.setAttribute('autoplay', 'autoplay');
audioElement0.loop = true;
audioElement0.volume= 0.2;
audioElement0.play(); 

function startNewCase(divToHide){
  snd.currentTime=0;
  snd.play();
  $( "#" + divToHide ).fadeOut( "slow", function() {
    $( "#mystery" ).fadeIn( "slow", function() {
      // Animation complete
    });
  });
}

function reviewCase(){
  snd.currentTime=0;
  snd.play();
  $( "#mystery" ).fadeOut( "slow", function() {
    $( "#casefile" ).fadeIn( "slow", function() {
      // Animation complete
    });
  });
}

function investigateSuspects(){
  snd.currentTime=0;
  snd.play();
  $( "#mystery" ).fadeOut( "slow", function() {
    $( "#suspects" ).fadeIn( "slow", function() {
      // Animation complete
    });
  });
}

function backToCase(divToHide){
  snd.currentTime=0;
  snd.play();
  $( "#"+divToHide ).fadeOut( "slow", function() {
    $( "#mystery" ).fadeIn( "slow", function() {
      // Animation complete
    });
  });
}

function accuse(suspect){
  
  if(suspect === "dwight"){
    close.currentTime=0;
    close.play();
    $( "#suspects" ).fadeOut( "slow", function() {
      $( "#success" ).fadeIn( "slow", function() {
        // Animation complete
      });
    });
  }else{
    failure.currentTime = 0;
    failure.play();
    $( "#suspects" ).fadeOut( "slow", function() {
      $( "#fail" ).fadeIn( "slow", function() {
        // Animation complete
      });
    });
  }
}
