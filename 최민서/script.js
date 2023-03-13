// DOM element
const $calPreviousPreview = document.querySelector('.cal-previous-preview');
const $calCurrentPreview = document.querySelector('.cal-current-preview');
const $allClear = document.querySelector('.all-clear');
const $clear = document.querySelector('.clear');
const $parentheses = document.querySelectorAll('.parenthesis');
const $numbers = document.querySelectorAll('.number');
const $operations = document.querySelectorAll('.operation');
const $equal = document.querySelector('.equal');
const $history = document.querySelector('.history');

let previousNum = ""; // 피연산자 1
let currentNum = ""; // 피연산자 2
let lastOperation = ""; // 마지막 연산자

let priorityPreviousNum = ""; // 괄호 안 피연산자 1
let priorityCurrentNum = ""; // 괄호 안 피연산자 2
let priorityOperation = ""; // 괄호 안 연산자

let mathExpression = ""; // 계산식
let result = null; // 계산값
let tempResult = null; // 임시 저장
let haveDot = false; // . 중복 체크
let haveParenthesis = false; // 괄호 체크
const historyList = []; // 히스토리 [{ 계산식: ___ , 계산값: ___ }, ...]

// 괄호 클릭
$parentheses.forEach(parenthesis => {
    parenthesis.addEventListener('click', e => {
        // 1. '(' 클릭 시
        if (e.target.innerText === '(') {
            haveParenthesis = true;
            mathExpression += ' (';
            $calPreviousPreview.innerText = mathExpression;
            if (currentNum) {
                previousNum = currentNum;
            }
        }
        // 2. ')' 클릭 시
        else {
            // '('가 없는 경우, alert()
            if (!haveParenthesis) {
                alert('잘못된 입력입니다.');
                return;
            }
            haveParenthesis = false;
            mathExpression += ` ${priorityCurrentNum} )`;
            $calPreviousPreview.innerText = mathExpression;
            priorityCalculate();
            if (!previousNum) {
                previousNum = result;
            } else {
                currentNum = result;
            }
            calculate();
            priorityPreviousNum = "";
            priorityCurrentNum = "";
        }
    })
})

// 숫자 클릭
$numbers.forEach(number => {
    number.addEventListener('click', e => {
        tempResult = null;
        // . 중복 체크
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        // 1. 괄호 안에 있는 경우
        if (haveParenthesis) {
            priorityCurrentNum += e.target.innerText;
            $calCurrentPreview.innerText = priorityCurrentNum;
        }
        // 2. 괄호 밖에 있는 경우
        else {
            currentNum += e.target.innerText;
            $calCurrentPreview.innerText = currentNum;
        }
    })
})

// 연산자 클릭
$operations.forEach(operation => {
    operation.addEventListener('click', e => {
        // 1. '='를 눌러 계산된 값이 있는 상태로 연산자 클릭 시
        if (tempResult) {
            currentNum = String(tempResult);
        }
        // 2. 입력한 피연산자가 없는 경우, alert()
        if (!currentNum && !priorityCurrentNum) {
            alert('숫자부터 입력해주세요.');
            return;
        }
        haveDot = false;
        const operationSymbol = e.target.innerText;
        // 1. 괄호 안에 있는 경우
        if (haveParenthesis) {
            // 1-1. 두 피연산자와 연산자가 있을 경우
            if (priorityPreviousNum && priorityCurrentNum && priorityOperation) {
                priorityCalculate(); // 계산
                priorityPreviousNum = result; // 계산값을 첫 번째 피연산자에 저장
            } else {
                if (!priorityPreviousNum) priorityPreviousNum = priorityCurrentNum; // 두 번째 피연산자 값을 첫 번째 피연산자에 저장
            }
            priorityOperation = operationSymbol;
        }
        // 2. 괄호 밖에 있는 경우
        else {
            // 1-1. 두 피연산자와 연산자가 있을 경우
            if (previousNum && currentNum && lastOperation) {
                calculate();
                previousNum = result;
            } else {
                if (!previousNum) previousNum = currentNum;
            }
            lastOperation = operationSymbol;
        }
        update(operationSymbol); // 업데이트
    })
})

// 등호 클릭
$equal.addEventListener('click', () => {
    if (mathExpression.slice(-1) !== ')') {
        calculate();
        update("=");
    }
    $calCurrentPreview.innerText = result; // 결과 출력
    historyList.push({ expression: `${mathExpression}`, result: `${result}` }); // 히스토리 추가
    $history.innerHTML = `
        ${historyList.map(history => `
            <div style="border-top: 2px solid gray;">
                <p style="opacity: .7; color: black;">${history.expression}</p>
                <p style="font-weight: bold; font-size: 16px;">${history.result}</p>
            </div>
        `).join('')}
    `;
    // 변수 초기화
    tempResult = result;
    result = null;
    haveDot = false;
    currentNum = "";
    previousNum = "";
    lastOperation = "";
    mathExpression = "";
})

// 초기화 클릭
$allClear.addEventListener('click', () => {
    $calPreviousPreview.innerText = "";
    $calCurrentPreview.innerText = "";
    previousNum = "";
    currentNum = "";
    mathExpression = "";
    result = null;
    tempResult = null;
    haveDot = false;
    lastOperation = "";
})

// 지우기 클릭
$clear.addEventListener('click', () => {
    // 숫자가 한 자리인 경우
    if (currentNum.length === 1) {
        $calCurrentPreview.innerText = "";
        currentNum = "";
    }
    // 숫자가 두 자리 이상인 경우, 슬라이싱
    else {
        const slicedCurrentNum = currentNum.slice(0, -1);
        $calCurrentPreview.innerText = slicedCurrentNum;
        currentNum = slicedCurrentNum;
    }
})

// 입력한 식 업데이트
const update = (symbol = '') => {
    // 1. 괄호가 있는 경우
    if (haveParenthesis) {
        mathExpression += ` ${priorityCurrentNum} ${symbol}`;
        priorityCurrentNum = "";
    }
    // 2. 괄호가 없는 경우
    else {
        mathExpression += ` ${currentNum} ${symbol}`;
        currentNum = "";
    }
    $calPreviousPreview.innerText = mathExpression; // 화면에 이전 식 출력
}

// 계산
const calculate = () => {
    // 첫 번째 피연산자가 없을 경우
    if (!previousNum) {
        result = parseFloat(currentNum);
    }
    // 피연산자가 모두 있을 경우
    else {
        if (lastOperation === '*') {
            result = parseFloat(previousNum) * parseFloat(currentNum);
        } else if (lastOperation === '+') {
            result = parseFloat(previousNum) + parseFloat(currentNum);
        } else if (lastOperation === '-') {
            result = parseFloat(previousNum) - parseFloat(currentNum);
        } else if (lastOperation === '÷') {
            result = parseFloat(previousNum) / parseFloat(currentNum);
        }
    }
    lastOperation = "";
}

// 괄호 안 계산
const priorityCalculate = () => {
    if (!priorityPreviousNum) {
        result = parseFloat(priorityCurrentNum);
    } else {
        if (priorityOperation === '*') {
            result = parseFloat(priorityPreviousNum) * parseFloat(priorityCurrentNum);
        } else if (priorityOperation === '+') {
            result = parseFloat(priorityPreviousNum) + parseFloat(priorityCurrentNum);
        } else if (priorityOperation === '-') {
            result = parseFloat(priorityPreviousNum) - parseFloat(priorityCurrentNum);
        } else if (priorityOperation === '÷') {
            result = parseFloat(priorityPreviousNum) / parseFloat(priorityCurrentNum);
        }
    }
    priorityOperation = "";
}