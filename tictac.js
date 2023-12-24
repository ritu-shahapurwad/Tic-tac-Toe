let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//create variable for alternate turn
let turnO = true; //playerX, playerO
let count=0;// to track draw

//create variable to store winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],

];
const resetGame = () => {
  turnO =true;
  count=0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

//add event listner to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();


    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });

});
const gameDraw = () => {
  msg.innerText='Game was a Draw .';
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for(let box of boxes) {
    box.disabled=true;
  }
  
};
const enableBoxes = () => {
  for(let box of boxes) {
    box.disabled=false;
    box.innerText="";
}};


 const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
 };

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let position1Val = boxes[pattern[0]].innerText;
    let position2Val = boxes[pattern[1]].innerText;
    let position3Val = boxes[pattern[2]].innerText;

    if (position1Val != "" && position2Val != "" && position3Val != "") {
      if (position1Val === position2Val && position2Val === position3Val) {
        showWinner(position1Val);
        return true;
      }
    }
  }
};
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);


