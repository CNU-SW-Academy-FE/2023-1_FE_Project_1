const equationBox = document.querySelector(".equation");
const resultBox = document.querySelector(".result");
const numreg = /[0-9]|\./;
const opreg = /\+|\-|\*|\÷|\(|\)/;
const operate = {
    "*": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};

const preprocessing = (exp) => {
    const splited = [];
    while (exp.length) {
        if (exp[0].search(numreg) > -1) {
            let node = "";
            while (
                ((node += exp.shift()),
                exp.length && exp[0].search(numreg) > -1)
            );
            splited.push(parseFloat(node));
        } else {
            splited.push(exp.shift());
        }
    }
    return splited;
};

const calc = (exp) => {
    let loc;
    if (((loc = exp.indexOf("(")), loc > -1)) {
        const paren = exp.slice(loc, exp.indexOf(")") + 1);
        const res = calc(paren.slice(1, paren.length - 1));
        exp.splice(loc, paren.length, res);
    }
    for (const op of Object.keys(operate)) {
        if (((loc = exp.indexOf(op)), loc > -1)) {
            const res = operate[op](exp[loc - 1], exp[loc + 1]);
            exp.splice(loc - 1, 3, res);
        }
    }
    return exp[0];
};

const history = [];

document.addEventListener("keydown", (e) => {
    // e.preventDefault();
    const { key, shiftKey } = e;
    if (
        !isNaN(Number(key)) ||
        key === "." ||
        key === "+" ||
        key === "-" ||
        key === "*"
    ) {
        document
            .querySelector(`input[value="${key}"]`)
            .dispatchEvent(new Event("click"));
    } else if (key === "/") {
        document
            .querySelector(`input[value="÷"]`)
            .dispatchEvent(new Event("click"));
    } else if (key === "Escape") {
        document
            .querySelector(`input[value="AC"]`)
            .dispatchEvent(new Event("click"));
    } else if (key === "Backspace") {
        document
            .querySelector(`input[value="DEL"]`)
            .dispatchEvent(new Event("click"));
    } else if (key === "Enter") {
        document
            .querySelector(`input[value="="]`)
            .dispatchEvent(new Event("click"));
    } else if (shiftKey && (key === "(" || key === ")")) {
        equationBox.innerHTML += key;
    }
});

document.querySelectorAll(".number, .operator").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (equationBox.innerHTML === "0")
            equationBox.innerHTML = e.target.value;
        else equationBox.innerHTML += e.target.value;
    });
});

document.querySelector(".initialize").addEventListener("click", (e) => {
    equationBox.innerHTML = "0";
    resultBox.innerHTML = "";
});

document.querySelector(".delete").addEventListener("click", (e) => {
    equationBox.innerHTML =
        equationBox.innerHTML.length === 1
            ? "0"
            : equationBox.innerHTML.slice(0, -1);
});

document.querySelector(".calculate").addEventListener("click", (e) => {
    const exp = equationBox.innerHTML;
    // 숫자와 연산자로 분리함.
    const splited = preprocessing(exp.split(""));
    // 계산식이 맞는지 확인함.
    // 1. 연산자(+,-,*,÷,.)가 연속으로 2개가 들어가 있는지 확인
    // 2. 괄호가 열려 있는지 확인
    // 3. 0으로 나누는지 확인
    // 계산함.
    const res = calc(splited);
    const newRecord = document.createElement("div");
    newRecord.className = "record";
    newRecord.appendChild(document.createElement("hr"));
    newRecord.appendChild(document.createTextNode(exp));
    newRecord.appendChild(document.createElement("br"));
    newRecord.appendChild(document.createTextNode(res));
    document.querySelector(".history").appendChild(newRecord);
    resultBox.innerHTML = res;
});

// 4+(10-2/2)*(5+2) == 67
// 5*(2+7*2)/4+(10/2+8) == 33
