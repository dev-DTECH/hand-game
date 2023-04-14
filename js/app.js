const sleep = ms => new Promise(r => setTimeout(r, ms));
const game = () => {
  let pScore = 0;
  let cScore = 0;
  const winner = document.querySelector(".winner");

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands div");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];
    let c=1
      function loop() {
        c=(c+1)%3+1
        console.log(c)

        //Animation
        computerHand.textContent='✊'
        winner.textContent='Show your hand'
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
        setTimeout(async ()=>{
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          if(pScore==5){
            winner.textContent='🤖: You defeated the mechanical hand'
            clearInterval(loopID)
            await sleep(5000)
            location.reload()
          }
          else if(cScore==5){
            winner.textContent='🤖: Your got defeated by a mechanical hand'
            clearInterval(loopID)
            await sleep(5000)
            location.reload()
          }

          //Update Images
          switch(computerChoice){
            case 'rock':
              computerHand.textContent='✊'
                  break
            case 'paper':
              computerHand.textContent='🖐️'
                  break
            case 'scissors':
              computerHand.textContent='✌️'
                  break
          }

        },2000)


        //Computer Choice


        // }, 2000);


      }
      var loopID =setInterval(loop,5000)

  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };
  const compareHands = (playerChoice, computerChoice) => {

    // console.log(out)
    playerChoice=out
    //No hand detected
    if(playerChoice==-1){
      return;
    }
    else
      playerChoice=["rock", "paper", "scissors"][playerChoice]
    // print(playerChoice)
    //Update Text
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
