class Calculator{
    elPreviousPreview;
    elCurrentPreview;
    previousOperand;
    currentOperand;
    constructor(elPreviousPreview,elCurrentPreview) {
        this.elCurrentPreview = elCurrentPreview;
        this.elPreviousPreview = elPreviousPreview;
    }

    onPressNumber(number){
        this.elPreviousPreview.textContent = this.elCurrentPreview.textContent
        if(number === '.') {
            if(this.elCurrentPreview.textContent.length < 1 || 
                this.elCurrentPreview.textContent.includes('.')
                ){
                    return;
                } 
        }
        this.elCurrentPreview.textContent += number
    }

    handleMinus(){

    }
    handlePlus(){

    }
    handleMultiply(){

    }
    handleDivide(){

    }
    onEqual(){

    }
    onDelete(){

    }
    onReset(){
        this.elPreviousPreview.textContent = '';
        this.elCurrentPreview.textContent = '';
        this.previousOperand.textContent = '';
        this.currentOperand.textContent = '';
    }
    appendOperation(oper){
        this.previousOperand = oper
        this.elCurrentPreview.textContent += oper
    }
}



const elPreviousPreview = document.querySelector("[data-previous-preview]");
const elCurrentPreview = document.querySelector("[data-current-preview]");

const elReset = document.querySelector("[data-btn-reset]")
const elDelete = document.querySelector("[data-btn-delete]")

const elNumber = document.querySelectorAll("[data-btn-number]")


const elOperaters = document.querySelectorAll("[data-btn-operation]")
const elDivide = document.querySelector("[data-btn-divide]")
const elMultiply = document.querySelector("[data-btn-multiply]")
const elMinus = document.querySelector("[data-btn-minus]")
const elPlus = document.querySelector("[data-btn-plus]")
const elEqual = document.querySelector("[data-btn-equal]")

const cal = new Calculator(elPreviousPreview, elCurrentPreview);

elNumber.forEach((number) => {
    number.addEventListener('click', (e)=> {
        const number = e.target.textContent
        cal.onPressNumber(number)
        //console.log(number)
    })
})

elOperaters.forEach((operater) =>{
    operater.addEventListener('click', (e) => {
        switch(operater){
            case elMinus:
                cal.appendOperation(e.target.textContent)
                break;
            case elPlus:
                cal.appendOperation(e.target.textContent)
                break;
            case elMultiply:
                cal.appendOperation(e.target.textContent)
                break;
            case elDivide:
                cal.appendOperation(e.target.textContent)
                break;
            case elEqual:
                cal.appendOperation(e.target.textContent)
                break;
            default:
                break;
        }
        
    })
})

elReset.addEventListener('click', () => cal.onReset())