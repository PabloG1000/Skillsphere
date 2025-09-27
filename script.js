// Game variables
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let allowClicks = false;

// Button colors array
const buttonColors = ["red", "blue", "green", "yellow"];
// Start game when start button is clicked
$("#start").click(function() {
  if (!started) {
    startOver();
    started = true;
    $("#start").hide();
    nextSequence();
  }
});

// Handle button clicks
$(".btn").click(function() {
  if (started && allowClicks) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor.toString());
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Check if user's answer is correct
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If user completed the current sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      allowClicks = false;
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong answer - game over:
    gameOver();
  }
}

// Generate and show next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  // Show the entire sequence
  showSequence();
}

// Show the complete sequence to the player
function showSequence() {
  allowClicks = false;
  let i = 0;
  
  let sequenceInterval = setInterval(function() {
    let currentColor = gamePattern[i];
    
    // Flash the button
    $("#" + currentColor).fadeOut(100).fadeIn(100);
    playSound(currentColor);
    
    i++;
    
    // When sequence is complete, allow user input
    if (i >= gamePattern.length) {
      clearInterval(sequenceInterval);
      setTimeout(function() {
        allowClicks = true;
      }, 500);
    }
  }, 800);
}

// Game over function
function gameOver() {
  const wrong = new Audio("wrong.mp3")
  wrong.play()
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Start to Restart");
  $("#start").show().text("RESTART");
  
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  
  started = false;
  allowClicks = false;
}

// Play sound for button press
function playSound(name) {
  try {
    let colorSound = (name+".mp3")
   let soundToBePlayed = new Audio(colorSound)
    soundToBePlayed.play()
    setTimeout( () => {
      soundToBePlayed.pause()
      soundToBePlayed.currentTime = 0
    },500)
  } catch (error) {
    // Fallback if audio context fails
    console.log(colorSound)
    console.log("Audio not available");
  }
}

// Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Reset game variables
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  allowClicks = false;
}

// CSS classes you need to add to your styles.css:
/*
.pressed {
  box-shadow: 0 0 20px white;
  background-color: grey !important;
}

.game-over {
  background-color: red;
  opacity: 0.8;
}*/