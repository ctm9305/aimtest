let target = document.getElementById('target');
let startButton = document.getElementById('startButton');
let resultDiv = document.getElementById('result');
let timerDiv = document.getElementById('timer');
let accuracyDiv = document.getElementById('accuracy');

let clickCount = 0;
let hitCount = 0;
let totalAccuracy = 0; // 총 정확도
let timer;
let timeLimit = 30; // 제한 시간 (초)
const targetSize = 100; // 타겟 크기

function startTest() {
    clickCount = 0;
    hitCount = 0;
    totalAccuracy = 0; // 총 정확도 초기화
    resultDiv.innerHTML = "";
    accuracyDiv.innerHTML = "";
    timerDiv.innerHTML = `제한 시간: ${timeLimit}초`;
    target.style.display = "block";
    moveTarget();
    startTimer();
}

function moveTarget() {
    const randomX = Math.floor(Math.random() * (1000 - targetSize)); // 1000 - 타겟 크기
    const randomY = Math.floor(Math.random() * (900 - targetSize)); // 900 - 타겟 크기
    target.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLimit--;
        timerDiv.innerHTML = `제한 시간: ${timeLimit}초`;
        if (timeLimit <= 0) {
            clearInterval(timer);
            target.style.display = "none";
            const averageAccuracy = (hitCount > 0) ? (totalAccuracy / hitCount).toFixed(2) : 0;
            resultDiv.innerHTML = `게임 종료! 클릭 수: ${clickCount}, 명중 수: ${hitCount}, 평균 정확도: ${averageAccuracy}%`;
        }
    }, 1000);
}

target.addEventListener('click', function(event) {
    if (timeLimit > 0) {
        clickCount++;
        const targetRect = target.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetSize / 2;
        const targetCenterY = targetRect.top + targetSize / 2;
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        
        const distance = Math.sqrt(Math.pow(clickX - targetCenterX, 2) + Math.pow(clickY - targetCenterY, 2));
        const accuracy = Math.max(0, 100 - (distance / (targetSize / 2) * 100)); // 100%에서 감소
        
        totalAccuracy += accuracy; // 정확도를 총합에 추가
        hitCount++;
        resultDiv.innerHTML = `클릭 수: ${clickCount}, 명중 수: ${hitCount}`;
        accuracyDiv.innerHTML = `정확도: ${accuracy.toFixed(2)}%`;
        moveTarget();
    }
});

startButton.addEventListener('click', startTest);
