//if left side of || is truthy it runs left side otherwise right
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") { 
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});


updateScoreElement();

//store the setInveral Id in a variable so that we can stop the animation later using clearInterval
let animationInterval;

function animateComputerMove(playerMove) {
  const moves = ["rock", "paper", "scissors"];
  let i = 0;

  animationInterval = setInterval(() => {
    const move = moves[i % 3];

    document.querySelector(".js-moves").innerHTML =
      `You <img src="images/${playerMove}-emoji.png" class="move-icon">
       <img src="images/${move}-emoji.png" class="move-icon"> Computer`;

    i++;
  }, 100); // speed (lower = faster)
}


function playGame(playerMove) {

  animateComputerMove(playerMove); // animation start

  setTimeout(() => {

    //clearInterval is used to stop the animation after 1 second (1000 milliseconds)  
    clearInterval(animationInterval); // animation stop

    const computerMove = pickComputerMove(); // FINAL move


    let result = "";

    if (playerMove == "rock") {
      if (computerMove === "rock") result = "Tie";
      else if (computerMove === "paper") result = "You lose";
      else result = "You win";
    } 
    else if (playerMove == "paper") {
      if (computerMove === "rock") result = "You win";
      else if (computerMove === "paper") result = "Tie";
      else result = "You lose";
    } 
    else {
      if (computerMove === "rock") result = "You lose";
      else if (computerMove === "paper") result = "You win";
      else result = "Tie";
    }

    // score update
    if (result == "You win") score.wins++;
    else if (result == "You lose") score.losses++;
    else score.ties++;

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML =
      `You <img src="images/${playerMove}-emoji.png" class="move-icon">
       <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

  }, 1000); 
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}`;
}

function pickComputerMove() {
  
  const randomno = Math.random();
  let computerMove = "";

  if (randomno < 1 / 3) {
    computerMove = "rock";
  } else if (randomno < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}

