var startButtonDom = document.getElementById('start_btn');
startButtonDom.addEventListener('click', startGame);

var reStartButtonDom = document.getElementById('restart_btn');
reStartButtonDom.addEventListener('click', init);

var maxValDom = document.getElementById('max_number');
maxValDom.addEventListener('change', init);

var presentButtonDom = document.getElementById('present_btn');
presentButtonDom.addEventListener('click', yes_answer);

var absentButtonDom = document.getElementById('absent_btn');
absentButtonDom.addEventListener('click', no_answer);

var resultAnnounceDom = document.getElementById('result_announce');
var resultValDom = document.getElementById('result_val');

var numGridDom = document.getElementById('number_grid');
var guessTextDom = document.getElementById('guess_text');
var maxValDisplayDom = document.getElementById('max_val_display');

var maxVal;
var gameProgress;
var currentIter;
var finalVal;

init();

function init() {
    numGridDom.style.display = "none";
    startButtonDom.style.display = "inline";
    resultAnnounceDom.style.display = "none";

    maxVal = Number(maxValDom.value);
    maxValDisplayDom.textContent = maxValDom.value;
    guessTextDom.style.display = "block";

    gameProgress = 0;
}

function getNumbers(maxNum, thisIter) {
    var state = 1;
    var runCount = 0;
    var result = [];
    var i;
    for ( i = thisIter ;  i <= maxNum ; i++ ) {
        if (state == 1) {
            result.push(i);
        }
        runCount += 1;
        if (runCount >= thisIter) {
            state = 1 - state;
            runCount = 0;
        }
    }
    return result;
}

function fillGuessBlock(maxNum, thisIter) {
    var wrapperDom = document.createElement('DIV');
    wrapperDom.classList.add('wrapper');
    var numbers = getNumbers(maxNum, thisIter);
    for (var i = 0 ; i < numbers.length ; i++) {
        var num = document.createElement('DIV');
        num.classList.add('box');
        num.textContent = numbers[i].toString();
        wrapperDom.appendChild(num);
    }
    var wrapperparent = document.getElementById('wrapper_parent');
    while (wrapper_parent.firstChild) {
        wrapper_parent.removeChild(wrapper_parent.firstChild);
    }
    wrapper_parent.appendChild(wrapperDom);
    numGridDom.style.display = "block";
}

function yes_answer() {
    if (!gameProgress) {
        return;
    }
    finalVal += currentIter;
    nextIter();
}

function no_answer() {
    if (!gameProgress) {
        return;
    }
    nextIter();
}

function finishGame() {
    numGridDom.style.display = "none";
    resultValDom.textContent = finalVal.toString();
    resultAnnounceDom.style.display = "block";
    gameProgress = 0;
}

function nextIter() {
    currentIter = currentIter * 2;
    if (!currentIter) {
        currentIter = 1;
    }
    if (currentIter > maxVal) {
        finishGame();
    } else {
        fillGuessBlock(maxVal, currentIter);
    }

}

function startGame() {
    startButtonDom.style.display = "none";
    guessTextDom.style.display = "none";
    gameProgress = 1;
    currentIter = 0;
    finalVal = 0;
    nextIter();
}

