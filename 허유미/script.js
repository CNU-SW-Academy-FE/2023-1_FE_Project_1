class Calculator {
    elePreviousPreview;
    eleCurrentPreview;
    
    
    constructor(elePreviousPreview, eleCurrentPreview) {
      this.elePreviousPreview = elePreviousPreview;
      this.eleCurrentPreview = eleCurrentPreview;
    }
    
    onPressNumber() {
      console.log("이전 수", this.elePreviousPreview.textContent);
      
      // 점을 눌렀을 때는 합산하지 마라
      if (number === ".") {
        return ;
      }
      
     
      this.eleCurrentPreview.textContent += number;
      console.log("현재 수", this.eleCurrentPreview.textContent);
    }
    
    handleMinus() {
      
    }
    handlePlus() {
      
    }
    handleMultiply() {
      
    }
    handleDivide() {
      
    }
    onEqual() {
      
    }
    onDelete() {
      
    }
    onReset() {
      
    }
    appendOperation() {
      
    }
    
    
  }
  
  
  const elePreviousPreview = document.querySelector("[data-previous-preview]");
  const eleCurrentPreview = document.querySelector("[data-current-preview]");
  
  const eleMinus = document.querySelector("[data-btn-minus]");
  const elePlus = document.querySelector("[data-btn-plus]");
  const eleMultiply = document.querySelector("[data-btn-multiply]");
  const eleDivide = document.querySelector("[data-btn-divide]");
  
  const eleReset = document.querySelector("[data-btn-reset]");
  const eleDelete = document.querySelector("[data-btn-delete]");
  const eleEqual = document.querySelector("[data-btn-equal]");
  
  const eleNumbers = document.querySelectorAll("[data-btn-number]");
  const eleOperations = document.querySelectorAll("[data-btn-operation]");
  
  const calculator = new Calculator(elePreviousPreview, eleCurrentPreview);
  
  eleNumbers.forEach((eleNumber) => {
    eleNumber.addEventListener("click", (e) => {
      const number = e.target.textContent;
      calculator.onPressNumber(number);
    });
  });
  
  
  eleOperations.forEach((eleOperation) => {
    eleOperation.addEventListener("click", (e) => {
      switch (eleOperation) {
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
    });
  })
  
  