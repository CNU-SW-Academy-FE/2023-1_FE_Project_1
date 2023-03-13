console.clear();

// 계산기 작업 수행
class Calculator {
    $previousPreview;
    $currentPreview;
    previousOperand = ''
    operation = ''
    currentOperand = ''

    constructor($previousPreview, $currentPreview) {
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
    }

    onPressNumber(number) {
        if (number === '.') {
            if (this.currentOperand === '' || this.currentOperand === '0') {
                this.currentOperand = '0.'
                this.$currentPreview.textContent = this.currentOperand
                this.$previousPreview.textContent = this.previousOperand + ' ' + this.operation + ' ' + this.currentOperand
                return
            }
            else if (this.currentOperand < 1 || this.$previousPreview.textContent.includes('.')) {
                return
            }
        }
        if (number === '0') {
            if (this.currentOperand > 0 && !this.currentOperand.includes('.')) {
                return
            }
        }

        this.currentOperand += number
        this.$currentPreview.textContent = this.currentOperand
        this.$previousPreview.textContent = this.previousOperand + ' ' + this.operation + ' ' + this.currentOperand

        console.log('현재 수 : ' + this.$currentPreview.textContent)
    }

    handleMinus(a, b) {
        return Number(a) - Number(b)
    }

    handlePlus(a, b) {
        return Number(a) + Number(b)
    }

    handleMultiply(a, b) {
        return Number(a) * Number(b)
    }

    handleDivide(a, b) {
        if (b === '0') { return NaN}
        return Number(a) / Number(b)
    }

    onEqual() {
        let result;
        switch (this.operation) {
            case '+':
                result = this.handlePlus(this.previousOperand, this.currentOperand)
                this.$previousPreview.textContent = ''
                this.$currentPreview.textContent = result
                this.previousOperand = ''
                this.currentOperand = '' + result 
                this.operation = ''
                break
            case '-':
                result = this.handleMinus(this.previousOperand, this.currentOperand)
                this.$previousPreview.textContent = ''
                this.$currentPreview.textContent = result
                this.previousOperand = ''
                this.currentOperand = '' + result
                this.operation = ''
                break
            case '*':
                result = this.handleMultiply(this.previousOperand, this.currentOperand)
                this.$previousPreview.textContent = ''
                this.$currentPreview.textContent = result
                this.previousOperand = ''
                this.currentOperand = '' + result
                this.operation = ''
                break
            case '÷':
                result = this.handleDivide(this.previousOperand, this.currentOperand)
                this.$previousPreview.textContent = ''
                this.$currentPreview.textContent = result
                this.previousOperand = ''
                this.currentOperand = '' + result
                this.operation = ''
                break
            default:
                break
        }
    }

    onDelete() {
        const str = this.currentOperand
        if (str.length === 0) { return }
        else if (str.length === 1) {
            this.currentOperand = '0'
            if (this.previousOperand === '') { this.operation = '' }
        } else {
            this.currentOperand = str.substring(0, str.length - 1)
        }
        console.log(this.currentOperand)
        this.$currentPreview.textContent = this.currentOperand
        this.$previousPreview.textContent = this.previousOperand + ' ' + this.operation + ' ' + this.currentOperand
    }

    onReset() {
        this.$previousPreview.textContent = ''
        this.$currentPreview.textContent = ''
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = ''
        console.log("reset")
    }

    appendOperation(operation) {
        if (operation === '=') {
            this.onEqual()
            return
        }
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.operation = operation
        this.$previousPreview.textContent = this.previousOperand + ' ' + this.operation + ' '
        this.$currentPreview.textContent = ''
    }

}

// DOM 제어 변수 선언
const $previousPreview = document.querySelector("[data-previous-preview]");

const $currentPreview = document.querySelector("[data-current-preview]");

const $minus = document.querySelector("[data-btn-minus]");
const $plus = document.querySelector("[data-btn-plus]");
const $multiply = document.querySelector("[data-btn-multiply]");
const $divide = document.querySelector("[data-btn-divide]");

const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");
const $equal = document.querySelector("[data-btn-equal]");

const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");

const calculator = new Calculator($previousPreview, $currentPreview)


// 이벤트 처리
$numbers.forEach((item) => {
    item.addEventListener("click", (e) => {
        const number = e.target.textContent
        calculator.onPressNumber(number)
    });
});

$operations.forEach((item) => {
    item.addEventListener("click", (e) => {
        switch (item) {
            case $minus:
                calculator.appendOperation(e.target.textContent)
                break
            case $plus:
                calculator.appendOperation(e.target.textContent)
                break
            case $multiply:
                calculator.appendOperation(e.target.textContent)
                break
            case $divide:
                calculator.appendOperation(e.target.textContent)
                break
            case $equal:
                calculator.appendOperation(e.target.textContent)
                break
            default:

                break
        }
        // const operation = e.target.textContent
        // calculator.onPressOperation(operation)
    })
})

$reset.addEventListener('click', (e) => calculator.onReset())
$delete.addEventListener('click', (e) => calculator.onDelete())

// console.log($currentPreview)
// console.log($previousPreview)
// console.log($minus)
// console.log($plus)
// console.log($multiply)
// console.log($divide)
// console.log($reset)
// console.log($delete)
// console.log($equal)
// console.log($numbers)
// console.log($operations)
