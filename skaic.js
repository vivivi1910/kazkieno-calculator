console.log('veikia');

var calculator = {
    displayResult: '0',       //curent calculator value
    firstOperand: null,       //contains first operand
    secondOperand: false,     //waits for the first operand to be finished
    operator: null,           //waits for the value of operator
};

function input(num) {   //gets value of clicked button and saves to displayResult property
    var {displayResult, secondOperand} = calculator;

    if (secondOperand == true) {
        calculator.displayResult = num;
        calculator.secondOperand = false;
    } else {
        calculator.displayResult = displayResult === '0' ? num : displayResult + num;
    }
};

function inputDecimal(dot) {    //displays dot if it is not in displayResult yet
    if (!calculator.displayResult.includes(dot)) {
        calculator.displayResult += dot;
    }
};

function handleOperator(nextOperator) {
    var {firstOperand, displayResult, operator} = calculator;
    var inputValue = parseFloat(displayResult);   //converts a string to number

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        var result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayResult = String(result);
        calculator.firstOperand = result;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOperator;
};

var performCalculation = {    //calculation object
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function updateAnswer() {   //takes input.answer and displays the current value
    var display = document.getElementById('answer');
    display.value = calculator.displayResult;
};

updateAnswer();

var keys = document.querySelector('.container');  //registers click events in a .container elements
keys.addEventListener('click', (e) => {
    var {target} = event;

    if (target.classList.contains('operator')) {    //when operator is clicked

        if(target.classList.contains('equal')) {    //if equal() is called, will show data in a table
            document.getElementById('a').innerHTML = calculator.firstOperand;
            document.getElementById('action').innerHTML = calculator.operator;
            document.getElementById('b').innerHTML = calculator.displayResult;
            // document.getElementById('sort').innerHTML = ;
        }

        handleOperator(target.value);   // gives values to handleOperator()
        updateAnswer();

        if(!target.classList.contains('equal') & target.classList.contains('operator')) {   //clears input.answer after equal()
            document.getElementById('answer').value = '';
        }

        return;
    }

    if (target.classList.contains('decimal')) {   //when decimal is clicked
        inputDecimal(target.value); //gives value to handleDecimal()
        updateAnswer();
        return;
    }

    input(target.value); //tells input() the value of clicked button
    updateAnswer();
});
