class Calculator{
  elePreviousPreview;
  eleCurrentPreview;

  constructor(elePreviousPreview, eleCurrentPreview){
    this.elePreviousPreview = elePreviousPreview;
    this.eleCurrentPreview = eleCurrentPreview;
  }

  onPressNumber(number){
    console.log(this.elePreviousPreview.textContent);

    if ( number === '.'){
      if(this.eleCurrentPreview.textContent.length < 1 ||
        this.eleCurrentPreview.textContent.includes(".")
      ){
        return;
      }
    }
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

const elePreviousPreview = document.querySelector("[data-previous-preview]");
const eleCurrentPreview = document.querySelector("[data-current-preview]");


const eleDivide = document.querySelector("[data-btn-divide]");
const eleMinus = document.querySelector("[data-btn-minus]");
const elePlus = document.querySelector("[data-btn-plus]");
const eleMultiply = document.querySelector("[data-btn-multiply]");

const eleReset = document.querySelector("[data-btn-reset]");
const eleDelete = document.querySelector("[data-btn-delete]");
const eleEqual = document.querySelector("[data-btn-equal]");

const eleOperations = document.querySelectorAll("[data-btn-operation]");
const eleNumbers = document.querySelectorAll("[data-btn-number]");

const calculator = new Calculator(elePreviousPreview, eleCurrentPreview);

eleNumbers.forEach( eleNumber =>{
  eleNumber.addEventListener("click", (e)=>{
    // const number = e.target.textContent;
    // console.log(number);
    calculator.onPressNumber();
  })
})

eleOperations.forEach( eleOperation =>{
  eleOperation.addEventListener("click", (e)=>{
    // const operation = e.target.textContent;
    // console.log(operation);
    switch(eleOperation){
      case eleMinus:
        calculator.appendOperation();
        break;
      case elePlus:
        calculator.appendOperation();
        break;
      case eleMultiply:
        calculator.appendOperation();
        break;
      case eleDivide:
        calculator.appendOperation();
        break;
      case eleEqual:
        calculator.appendOperation();
        break;
      default:
        break;
    }
    console.log(eleOperation);
  })
})