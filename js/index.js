(function(win,doc){
  'use strict';

  var $visor = doc.querySelector('[data-js="visor"]');
  var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  var $buttonOperations = doc.querySelectorAll('[data-js="button-operation"]');
  var $buttonCE = doc.querySelector('[data-js="button-ce"]');
  var $buttonEqual = doc.querySelector('[data-js="button-equal"]');

  Array.prototype.forEach.call($buttonsNumbers, function(button){
    button.addEventListener('click', handleClickNumber, false);
  });

  Array.prototype.forEach.call($buttonOperations, function(button){
    button.addEventListener('click', handleClickOperation, false);
  });

  $buttonCE.addEventListener('click', handleClickCE,false);
  $buttonEqual.addEventListener('click', handleClickEqual,false);

  function handleClickNumber(evet){
    $visor.value += this.value;
  }

  function handleClickCE(){
    $visor.value = 0;
  }

  function handleClickOperation(){
    $visor.value = removeLastItemIfIsAnOperator($visor.value);
    $visor.value += this.value;
  }

  function isLastItemAndOperaton(number) {
    var operations = ['+','-','x','÷'];
    var lastItem = number.split('').pop();
    return operations.some(function(operator) {
      return operator === lastItem;
    })
  }

  function removeLastItemIfIsAnOperator(number){
    if(isLastItemAndOperaton(number))
      return number.slice(0,-1);    

      return number;
  }

  function handleClickEqual(){
    $visor.value = removeLastItemIfIsAnOperator($visor.value);
    var allValues = $visor.value.match(/\d+[+x÷-]?/g);
    $visor.value = allValues.reduce(function(accumulated, actual){
      var firstValue = accumulated.slice(0,-1);
      var operator = accumulated.split('').pop();
      var lastValue = removeLastItemIfIsAnOperator(actual);
      var lastOperator = isLastItemAndOperaton(actual) ? actual.split('').pop() : '';
      switch(operator)
      {
        case '+':
          return (Number(firstValue) + Number(lastValue)) + lastOperator;
        case '-':
          return (Number(firstValue) - Number(lastValue)) + lastOperator;
        case 'x':
          return (Number(firstValue) * Number(lastValue)) + lastOperator;
        case '÷':
          return (Number(firstValue) / Number(lastValue)) + lastOperator;
      }      
    });    
  }    
})(window, document);