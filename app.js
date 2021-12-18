const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__colors");
const range = document.querySelector(".controls__range");
const fillBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const resetBtn = document.querySelector("#jsReset");

const INIT_LINE_COLOR = "black";
const INIT_BG_COLOR = "white";
const CANVAS_SIZE = 600;

//기본 색상&배경 설정
ctx.strokeStyle = INIT_LINE_COLOR;
ctx.fillStyle = INIT_BG_COLOR;
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//기본 굵기 설정
ctx.lineWidth = 2.5;

let isPainting = false;
let isFilling = false;

function startPainting() {
    isPainting = true;
}

function endPainting() {
    isPainting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!isPainting) {
        //페인팅 상태가 아닐 때도 마우스의 움직임을 감시한다.
        moveX = x;
        moveY = y;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //페인팅 상태이면 라인을 만들면 된다.
        lineX = x;
        lineY = y;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    
}

function handleClickFill() {
    if(isFilling) {
        isFilling = false;
        fillBtn.innerText = "FILL";
    } else {
        isFilling = true;
        fillBtn.innerText = "PAINT"
    }
}

function handleClickCanvas() {
  if(isFilling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContextMenu(event) {
    //마우스 우클릭을 막아준다.
    event.preventDefault();
}

function handleClickSave() {
    //기본 값 image/png
    const link = document.createElement("a");
    const url = canvas.toDataURL();
    const name = "paintJS[🌈]";

    link.setAttribute("href", url);
    link.setAttribute("download", name);

    if(confirm("Want to save?")) {
        link.click();
    };
}

function handleClickReset() {
    ctx.fillStyle = INIT_BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}


Array.from(colors).forEach((color) => {
    color.addEventListener("click", handleColorClick);
});
resetBtn.addEventListener("click", handleClickReset);
saveBtn.addEventListener("click", handleClickSave);
fillBtn.addEventListener("click", handleClickFill);
range.addEventListener("input", handleRangeChange);
canvas.addEventListener("contextmenu", handleContextMenu);
canvas.addEventListener("click", handleClickCanvas);
canvas.addEventListener("mouseleave", endPainting)
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMouseMove);
