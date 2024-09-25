let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnx = true; //player X , player O

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

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("button was clicked");
        if(turnx) {
            box.innerText="X";
            box.classList.add("x");
            turnx = false;
        } else {
            box.innerText="O";
            box.classList.add("o");
            turnx = true;
        }
        box.disabled = true;

        checkWinner();
       // checkDraw();
    });
});

const disableBoxes =() => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes =() => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Excellent, Winner is "${winner}"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !="" && pos2val !="" && pos3val !="") {
            if(pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);
            }
            else{
                checkDraw();
            }
        }
    }
};


const checkDraw = () => {
    let allBoxesFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allBoxesFilled = false;
        }
    });

    if (allBoxesFilled) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};


const resetGame = () => {
    turnx = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);

