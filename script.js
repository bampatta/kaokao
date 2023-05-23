//กำหนดปุ่มเริ่ม หน้าแรก หน้าเกม หน้าจบ ปุ่มย้อนกลับและปุ่มเล่นอีกครั้ง
const startBtn = document.getElementById("startBtn");
const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const endPage = document.getElementById("endPage");
const backBtn = document.getElementById("backBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

//กำหนดปุ่ม การนับคะแนนและการจับเวลา
const clickBtn = document.getElementById("clickBtn");
const count = document.getElementById("count");
const timerBarFill = document.getElementById("timerBarFill");

//เช็คเวลาที่เหลือ
let intervalId;
let timeRemaining;

//ปิดหน้า
gamePage.style.display = "none";
endPage.style.display = "none";

//เริ่มเกมเมื่อคลิกปุ่มเริ่ม
startBtn.addEventListener("click", function () {
  //ขึ้นหน้าเกม ปิดหน้าแรก
  gamePage.style.display = "block";
  startPage.style.display = "none";

  //ตัวนับเริ่มต้นและเวลาที่เหลือ
  let clickCount = 0;
  timeRemaining = 10;
  let timerWidth = 100;

  //อัปเดตคะแนนเมื่อคลิก
  clickBtn.addEventListener("click", function () {
    clickCount++;
    if (timeRemaining < 10 && timerWidth < 100) {
      timeRemaining += 0.2;
      timerWidth += 2;
    }
    count.innerHTML = clickCount;
  });

  //อัปเดตตัวจับเวลา
  intervalId = setInterval(function () {
    timeRemaining--;
    timerBarFill.style.width = timerWidth + "%";
    timerWidth -= 10;

    if (timeRemaining <= 0) {
      stopGame();
    }
  }, 1000);
});

//การใช้ปุ่มย้อนกลับ
backBtn.addEventListener("click", function () {
  stopGame();
  gamePage.style.display = "none";
  startPage.style.display = "block";
  endPage.style.display = "none";
});

//การใช้ปุ่มเล่นอีกครั้ง เพื่อเริ่มเกมอีกครั้ง
playAgainBtn.addEventListener("click", function () {
  endPage.style.display = "none";
  startPage.style.display = "block";
});

function stopGame() {
  clearInterval(intervalId);
  clickBtn.disabled = true;
  let score = count.innerHTML;
  finalScore.innerHTML = score;
  var imgHTML = "";

  if (score <= 50) {
    imgHTML = '<img src="./img/หน้าสรุป1.PNG" width="300" height="auto">';
  } else if (score > 50 && score < 150) {
    imgHTML = '<img src="./img/หน้าสรุป3.PNG" width="300" height="auto">';
  } else {
    imgHTML = '<img src="./img/หน้าสรุป2.PNG" width="300" height="auto">';
  }

  var container = document.getElementById("imageContainer");
  container.outerHTML = imgHTML;

  gamePage.style.display = "none";
  endPage.style.display = "block";
  clickCount = 0;
  timeRemaining = 10;
  timerWidth = 100;
  clickBtn.disabled = false;
}
