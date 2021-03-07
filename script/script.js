/**
 * This self invoking method adds event listener to calculator buttons
 * @author Sivabhagya Jawahar
 */
"use strict";
(function onInit() {
    const keys = document.getElementsByClassName('key');
    for(let index = 0; index < keys.length; index++) {
        keys[index].addEventListener('click', event => {
            if (event && event.target && event.target.value) {
                const input = event.target.value.toString();
                switch(input) {
                    case 'C':
                        clearResult();
                        break;
                    case '=':
                        equal();
                        break;
                    default:
                        calculate(input);
                }
            }
        });
    }
})();

/**
 * This method is used to display the input values and calculate the inputs
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 */
function calculate(input) {
    const displayElement = document.getElementById('calc-input');
    let value = displayElement.innerHTML;
    if (checkOperators(input)) {
        if (value && value !== '-' && value.charAt(value.length - 1) !== '-') {
            value = (checkOperators(value.charAt(value.length - 2)) && value.charAt(value.length - 1) === ' ') ? value.replaceAt(value.length - 2, input) : value + ' ' + input + ' ';
        }
    } else if (input === '.') {
        value = setDecimalInput(input, value);
    } else if (input === 'negative') {
        value = plusOrMinusOperation(value);
    } else {
        value = setValidInput(input, value);
    }
    value = value.toString();
    displayElement.innerHTML = value;
    solve(value);
} 

/**
 * This method is used to evaluate the expression given
 * @param {expression} expression 
 */
function solve(expression) {
    if (expression && expression.length && !checkOperators(expression[expression.length - 1])) {
        expression = expression.replaceAll('x', '*');
        const result = Function('"use strict";return (' + expression + ')')();
        document.getElementById('calc-result').innerHTML = result != undefined ? Math.round(result * Math.pow(10, 3)) / Math.pow(10, 3) : '';
    }
}

/**
 * This method is used to display the result in input display while clicking the '='
 * @author Sivabhagya Jawahar
 */
function equal() {
    const result = document.getElementById('calc-result').innerHTML;
    document.getElementById('calc-input').innerHTML = Number(result) ? result : '';
}

/**
 * The method will clear the display value and result
 * @author Sivabhagya Jawahar
 */
function clearResult() {
    document.getElementById('calc-input').innerHTML = '';
    document.getElementById('calc-result').innerHTML = '0';
}

/**
 * The method will check whether the input value is operators are not
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 * @returns true/false
 */
function checkOperators(input) {
    return (input === '+' || input === '-' || input === 'x' || input === '/' || input === '%');
}

/**
 * The method is used for replaceAt operation
 * @author Sivabhagya Jawahar
 * @param {number} index 
 * @param {replacement string} replacement 
 * @returns replaced value
 */
String.prototype.replaceAt = function(index, replacement) {
   return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**
 * The method will check for the valid input for calculation
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 * @param {string} value 
 * @returns value
 */
function setValidInput(input, value) {
    if (!value) {
        return input;
    }
    const lastSpace = value.lastIndexOf(' ');
    if (lastSpace >= 0) {
        const substr = value.substr(lastSpace + 1, value.length);
        if (substr && substr.indexOf('.') >= 0) {
            return value + input;
        }
        return value.slice(0, lastSpace + 1) + Number(substr + input);
    }
    if (value.indexOf('.') >= 0) {
        return value + input;
    }
    return Number(value + input);
}

/**
 * The method is used to set the decimal point for calculation
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 * @param {string} value 
 * @returns value
 */
function setDecimalInput(input, value) {
    if (!value) {
        return '0.';
    }
    if (value === '-' || value.charAt(value.length - 1) === '-') {
        return value + '0.';
    }
    const lastSpace = value.lastIndexOf(' ');
    if (lastSpace >= 0) {
        const substr = value.substr(lastSpace + 1, value.length);
        if (!substr) {
            return value + '0.';
        }
        return isNaN(substr + input) ? value : value + input;
    }
    return isNaN(value + input) ? value : value + input;
}

/**
 * The method is used to calculate the plus or minus operation
 * @author Sivabhagya Jawahar
 * @param {string} value 
 * @returns value
 */
function plusOrMinusOperation(value) {
    if (!value) {
        return '-';
    }
    if (value === '-') {
        return '';
    }
    if (value.charAt(value.length - 1) === '-') {
        return value.slice(0, -1);
    }
    const lastSpace = value.lastIndexOf(' ');
    if (lastSpace >= 0) {
        let substr = value.substr(lastSpace + 1, value.length);
        if (!substr) {
            return value + '-';
        }
        substr = substr.indexOf('-') >= 0 ? substr.substr(1) : '-' + substr;
        return value.slice(0, lastSpace + 1) + substr;
    }
    return value.indexOf('-') >= 0 ? value.substr(1) : '-' + value;
}
