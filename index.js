const expressions = [];

const $result = document.querySelector('.result');
const $expression = document.querySelector('.expression');

const initializeExpressions = () => {
  while (expressions.length) {
    expressions.pop();
  }
}

const onClickNumber = (e) => {
  if (typeof expressions[0] === 'number' && expressions.length === 1) initializeExpressions();
  expressions.push(e.target.textContent);
  $result.value = expressions.join('');
}
document.querySelector('.num-0').addEventListener('click', onClickNumber);
document.querySelector('.num-1').addEventListener('click', onClickNumber);
document.querySelector('.num-2').addEventListener('click', onClickNumber);
document.querySelector('.num-3').addEventListener('click', onClickNumber);
document.querySelector('.num-4').addEventListener('click', onClickNumber);
document.querySelector('.num-5').addEventListener('click', onClickNumber);
document.querySelector('.num-6').addEventListener('click', onClickNumber);
document.querySelector('.num-7').addEventListener('click', onClickNumber);
document.querySelector('.num-8').addEventListener('click', onClickNumber);
document.querySelector('.num-9').addEventListener('click', onClickNumber);

const onClickPoint = () => {
  if (expressions.length === 0) return;
  if (expressions[expressions.length - 1] === '.') return;
  expressions.push('.');
  $result.value = expressions.join('');
};
document.querySelector('.point').addEventListener('click', onClickPoint);

const onClickOperator = (op) => () => {
  if (expressions.length === 0) {
    alert('숫자를 먼저 입력하세요!!');
    return;
  }
  if (
    expressions[expressions.length - 1] === ' / ' ||
    expressions[expressions.length - 1] === ' * ' ||
    expressions[expressions.length - 1] === ' - ' ||
    expressions[expressions.length - 1] === ' + '
  ) {
    alert('숫자를 입력해주세요!!')
  } else {
    expressions.push(` ${op} `);
    $result.value = expressions.join('');
  }
};
document.querySelector('.divide').addEventListener('click', onClickOperator('/'));
document.querySelector('.multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('.minus').addEventListener('click', onClickOperator('-'));
document.querySelector('.plus').addEventListener('click', onClickOperator('+'));

const onClickAllClear = () => {
  if (typeof expressions[0] === 'number' && expressions.length === 1) {
    $expression.value = `Ans = ${expressions[0]}`;
  }
  initializeExpressions();
  $result.value = expressions.join('');
}
document.querySelector('.all-clear').addEventListener('click', onClickAllClear);

const onClickDelete = () => {
  expressions.pop();
  $result.value = expressions.join('');
}
document.querySelector('.delete').addEventListener('click', onClickDelete);


const onClickCalculate = () => {
  if (
    expressions.indexOf(' / ') === -1 &&
    expressions.indexOf(' * ') === -1 &&
    expressions.indexOf(' - ') === -1 &&
    expressions.indexOf(' + ') === -1
  ) {
    alert('연산자를 입력해주세요!!');
    return;
  }
  const answer = eval(expressions.join(''));
  $result.value = answer;
  $expression.value = `${expressions.join('')} =`;

  initializeExpressions();
  expressions.push(answer);
}
document.querySelector('.calculate').addEventListener('click', onClickCalculate);