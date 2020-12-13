
var snd = new Audio("sounds/pageturn.wav");
var close = new Audio("sounds/close.wav");
var failure = new Audio("sounds/fail.wav");

var audioElement0 = document.createElement('audio');
audioElement0.setAttribute('src', 'sounds/suspense.wav');
audioElement0.setAttribute('autoplay', 'autoplay');
audioElement0.loop = true;
audioElement0.volume= 0.2;
audioElement0.play(); 

var score = 0;
var newCase;

function startNewCase(divToHide){
  snd.currentTime=0;
  snd.play();
  newCase = generateCase(score);
  updateUI(newCase);
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
  
  if(newCase.suspects[suspect].guilty){
    close.currentTime=0;
    close.play();
    $( "#suspects" ).fadeOut( "slow", function() {
      $( "#success" ).fadeIn( "slow", function() {
        // Animation complete
        score += 20;
        $('.progress-bar').css('width', score+'%').attr('aria-valuenow', score);   
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

function updateUI(newCase){
  var hairs = [];
  var heights = [];
  var builds = [];
  var complexions = [];
  var ages = [];

  if(newCase.suspects.length >3)
    $("#suspectedBuild").show();
  if(newCase.suspects.length >4)
    $("#suspectedComplexion").show();
  if(newCase.suspects.length >5)
    $("#suspectedAge").show();

  var culprit = newCase.suspects.find(function(suspect){return suspect.guilty});
  $("#casename1").text(newCase.victim + " at " + newCase.location.name + " with " + newCase.weapon);
  $("#casename2").text(newCase.victim + " at " + newCase.location.name + " with " + newCase.weapon + " by " + culprit.name);
  $("#casename3").text(newCase.victim + " at " + newCase.location.name + " with " + newCase.weapon);
  $("#victim").text(newCase.victim);
  $("#location").text(newCase.location.name);
  $("#weapon").text(newCase.weapon);
  hairs.push(culprit.hair);
  heights.push(culprit.height);
  builds.push(culprit.builds);
  complexions.push(culprit.complexion);

  for (let i = 0; i < newCase.suspects.length; i++) {
    let suspect = newCase.suspects[i];
    $("#suspect"+i).show();
    $("#name"+i).text(suspect.name);
    $("#occupation"+i).text(suspect.occupation.name);
    $("#hair"+i).text(suspect.hair);
    $("#height"+i).text(suspect.height);
    $("#build"+i).text(suspect.build);
    $("#complexion"+i).text(suspect.complexion);
    $("#age"+i).text(suspect.age);
    if(newCase.suspects.length >3)
      $("#sbuild"+i).show();
    if(newCase.suspects.length >4)
      $("#scomplexion"+i).show();
    if(newCase.suspects.length >5)
      $("#sage"+i).show();
  }

  for (let i = newCase.suspects.length; i < 6; i++) {
    let suspect = newCase.suspects[i];
    $("#suspect"+i).hide();
  }

  //hints
  var shuffledSuspects = newCase.suspects.slice();
  shuffledSuspects = shuffle(shuffledSuspects);
  var usedAlts = {};
  for (let i = 0; i < shuffledSuspects.length; i++) {
    let suspect = shuffledSuspects[i];
    if(suspect.guilty || usedAlts[suspect.name]) continue;
    usedAlts[suspect.name] = true;
    hairs.push(suspect.hair);
    break;
  }

  for (let i = 0; i < shuffledSuspects.length; i++) {
    let suspect = shuffledSuspects[i];
    if(suspect.guilty || usedAlts[suspect.name]) continue;
    usedAlts[suspect.name] = true;
    heights.push(suspect.height);
    break;
  }

  for (let i = 0; i < shuffledSuspects.length; i++) {
    let suspect = shuffledSuspects[i];
    if(suspect.guilty || usedAlts[suspect.name]) continue;
    usedAlts[suspect.name] = true;
    builds.push(suspect.build);
    break;
  }

  for (let i = 0; i < shuffledSuspects.length; i++) {
    let suspect = shuffledSuspects[i];
    if(suspect.guilty || usedAlts[suspect.name]) continue;
    usedAlts[suspect.name] = true;
    complexions.push(suspect.complexion);
    break;
  }

  for (let i = 0; i < shuffledSuspects.length; i++) {
    let suspect = shuffledSuspects[i];
    if(suspect.guilty || usedAlts[suspect.name]) continue;
    usedAlts[suspect.name] = true;
    ages.push(suspect.age);
    break;
  }

  shuffle(hairs);
  shuffle(heights);
  shuffle(builds);
  shuffle(complexions);
  shuffle(ages);
  $("#hair").text(hairs[0]);
  $("#hairalt").text(hairs[1])
  $("#height").text(heights[0]);
  $("#heightalt").text(heights[1]);
  $("#build").text(builds[0]);
  $("#buildalt").text(builds[1]);
  $("#complexion").text(complexions[0]);
  $("#complexionalt").text(complexions[1]);
  $("#age").text(ages[0]);
  $("#agealt").text(ages[1]);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}