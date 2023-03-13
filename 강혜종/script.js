console.clear();

class Calculator {
    $previousPreview;
    $currentPreview;

    constructor($previousPreview, $currentPreview) {
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
    }

    onPressNumber(number) {
        console.log('이전 수 : ' + (this.$previousPreview.textContent ? this.$previousPreview.textContent : 0))

        if (number === '.') {
            if (this.this.$previousPreview.textContent < 1 || this.$previousPreview.textContent.includes('.'))
                return
        }

        this.$currentPreview.textContent += number
        console.log('현재 수 : ' + this.$currentPreview.textContent)
    }

    onPressOperation(operation) {
        console.log(operation)
    }

    handleMinus() {

    }

    handlePlus() {

    }

    handleMultiply() {

    }

    handleDevide() {

    }

    onEqual() {

    }

    onDelete() {

    }

    onReset() {

    }

    appendOperation(item) {
        console.log(item)
    }

}

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
                calculator.appendOperation(item.textContent)
                break
            case $plus:
                calculator.appendOperation()
                break
            case $multiply:
                calculator.appendOperation()
                break
            case $divide:
                calculator.appendOperation()
                break
            case $equal:
                calculator.appendOperation()
                break
            default:

                break
        }
        // const operation = e.target.textContent
        // calculator.onPressOperation(operation)
    })
})

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
