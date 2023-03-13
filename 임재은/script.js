function App() {
    let isInit = true;
    let clickedEqual = false;
    const calculator = new Calculator();
    const prevPreview = document.querySelector('.cal-previous-preview');
    const currPreview = document.querySelector('.cal-current-preview');

    const addValueToPrevPreview = (value) => {
        prevPreview.innerText = prevPreview.innerText === '0' ? value : prevPreview.innerText + " " + value;
    }

    const onClickNum = (num) => {
        afterCalc();
        if (currPreview.innerText === '0') {
            currPreview.innerText = num;
        }
        else {
            currPreview.innerText += num;
        }
    }

    const onClickOperator = (operator) => {
        if (clickedEqual) {
            clickedEqual = false;
            prevPreview.innerText = currPreview.innerText;
            currPreview.innerText = '';
        }
        addValueToPrevPreview(currPreview.innerText + " " + operator);
        currPreview.innerText = '0';
    }

    const onClickReset = () => {
        currPreview.innerText = "0";
        document.querySelector('.cal-previous-preview').innerText = '0';
    }

    const onClickDelete = () => {
        if (currPreview.innerHTML.length !== 1) {
            currPreview.innerHTML = currPreview.innerText.substr(0, currPreview.innerText.length-1);
        }
          else {
            currPreview.innerHTML = 0;
        }
    }

    const onClickPoint = () => {
        const float = parseFloat(currPreview.innerHTML);
        currPreview.innerHTML = currPreview.innerHTML.endsWith('.') ? float
        : float % 1 ? float : float + '.';
    }

    const onClickEqual = () => {
        afterCalc();
        clickedEqual = true;
        addValueToPrevPreview(currPreview.innerText);
        currPreview.innerText = calculator.infixToPrefix(prevPreview.innerText.split(' '));
    }

    const afterCalc = () => {
        if (clickedEqual) {
            clickedEqual = false;
            prevPreview.innerText = 0;
            currPreview.innerText = 0;
        }
    }

    const onClick = (value) => {
        if (clickedEqual) {
            clickedEqual = false;
            if (value === '+' || value === '-' || value === '*' || value === '÷') {
                prevPreview.innerText = currPreview.innerText;
                currPreview.innerText = '';
            }
            else {
                prevPreview.innerText = 0;
                currPreview.innerText = 0;
            }
        }
        switch (value) {
            case 'AC':
                currPreview.innerText = "0";
                document.querySelector('.cal-previous-preview').innerText = '0';
                break;

            case 'DEL':
                if (currPreview.innerHTML.length !== 1) {
                    currPreview.innerHTML = currPreview.innerText.substr(0, currPreview.innerText.length-1);
                }
                  else {
                    currPreview.innerHTML = 0;
                }
                break;

            case '=':
                clickedEqual = true;
                addValueToPrevPreview(currPreview.innerText);
                currPreview.innerText = calculator.infixToPrefix(prevPreview.innerText.split(' '));
                break;

            case '.':
                const float = parseFloat(preview.innerHTML);
                currPreview.innerHTML = currPreview.innerHTML.endsWith('.') ? float
                : float % 1 ? float : float + '.';
                break;

            default: // case: number
                console.warn(`invalid button ${value}`)
        }
    }

    const render = () => {
        if (!isInit) {
    
        } else {
            document.addEventListener('click', (e) => {
                const numButton = e.target.closest('.cal-num');
                if (numButton) {
                    onClickNum(numButton.innerText);
                }

                const operButton = e.target.closest('.cal-operator');
                if (operButton) {
                    onClickOperator(operButton.innerText);
                }

                const resetButton = e.target.closest('.cal-reset');
                if (resetButton) {
                    onClickReset();
                }

                const deleteButton = e.target.closest('.cal-delete');
                if (deleteButton) {
                    onClickDelete();
                }

                const equalButton = e.target.closest('.cal-equal');
                if (equalButton) {
                    onClickEqual();
                }

                const pointButton = e.target.closest('.cal-point');
                if (pointButton) {
                    onClickPoint();
                }
            });
            isInit = false;
        }
    }

    render();
}


class Calculator {
    constructor() {
        this.priority = {
            '(': 0,
            ')': 0,
            '*': 2,
            '÷': 2,
            '/': 2,
            '+': 3,
            '-': 3
        };
    }

    infixToPrefix(expression) {
        const stack = [];
        const prefixExpression = [];

        while (expression.length !== 0) {
            const popValue = expression.pop();

            if (!isNaN(popValue)) {
                prefixExpression.push(popValue);
            }
            else {

                if (stack.length === 0) {
                    stack.push(popValue);
                }
                else {
                    
                    while (this.priority[stack[stack.length-1]] < this.priority[popValue]) {
                        prefixExpression.push(stack.pop());
                    }
                    stack.push(popValue);
                }
            }
        }
        if (stack.length !== 0) {
            prefixExpression.push(...stack.reverse());
        }
        return this.prefixCalculate(prefixExpression.reverse());
    }

    prefixCalculate(expression) {
        const stack = [];

        for (const e of expression) {
            stack.push(e);

            while (!isNaN(stack[stack.length-1]) && !isNaN(stack[stack.length-2])) {
                const second = Number(stack.pop());
                const first = Number(stack.pop());
                const operator = stack.pop();
                const result = this.calcualate(operator, first, second);
                stack.push(result);
            }
        }
        return stack[0];
    }

    calcualate(operator, v1, v2) {
        switch (operator) {
            case '+':
                return v1 + v2;
            case '-':
                return v1 - v2;
            case '*':
                return v1 * v2;
            case '/':
                return v1 / v2;
            case '÷':
                return v1 / v2;
            default:
                console.log('operator is not valid.', operator);
        }
    }
    
}

new App();