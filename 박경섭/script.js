class Calculator{
    elPreviousPreview;
    elCurrentPreview;
    constructor(elPreviousPreview,elCurrentPreview) {
        this.elCurrentPreview = elCurrentPreview;
        this.elPreviousPreview = elPreviousPreview;
    }

    onPressNumber(number){
        this.elPreviousPreview.textContent = this.elCurrentPreview.textContent
        console.log(this.elPreviousPreview.textContent)
        if(number === '.') {
            if(this.elCurrentPreview.textContent.length < 1 || 
                this.elCurrentPreview.textContent.includes('.')
                ){
                    return;
                } 
        }
        this.elCurrentPreview.textContent += number
        console.log(this.elCurrentPreview.textContent)
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

    }
    appendOperation(){

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
                cal.appendOperation()
                break;
            case elPlus:
                cal.appendOperation()
                break;
            case elMultiply:
                cal.appendOperation()
                break;
            case elDivide:
                cal.appendOperation()
                break;
            case elEqual:
                cal.appendOperation()
                break;
            default:
                break;
        }
        
    })
})