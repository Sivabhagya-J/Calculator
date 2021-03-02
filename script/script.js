/**
 * The method will calculate the arithmetic operations and display the output
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 */
function calculate(input) {
    var displayElement = document.getElementById("calc-input");
    var value = displayElement.innerHTML;
    if (checkOperators(input)) {
        if (value) {
            value = checkOperators(value.charAt(value.length - 2)) ? value.replaceAt(value.length - 2, input) : value + " " + input + " ";
        }
    } else if (input === ".") {
        value = setDecimalInput(input, value);
    } else if (input !== "=") {
        value = setValidInput(input, value);
    }
    value = value.toString();
    displayElement.innerHTML = value;
    var expression = value.replaceAll(" ", "");
    if (expression && expression.length && !checkOperators(expression[expression.length - 1])) {
        expression = expression.replaceAll("x", "*");
        var result = eval(expression);
        document.getElementById("calc-result").innerHTML = result != undefined ? Math.round(result * Math.pow(10, 3)) / Math.pow(10, 3) : "";
    }
}

/**
 * The method will clear the display value and result
 * @author Sivabhagya Jawahar
 */
function clearResult() {
    document.getElementById("calc-input").innerHTML = "";
    document.getElementById("calc-result").innerHTML = "0";
}

/**
 * The method will check whether the input value is operators are not
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 * @returns true/false
 */
function checkOperators(input) {
    return (input === "+" || input === "-" || input === "x" || input === "/" || input === "%");
}

/**
 * The method is used for replaceAt operation
 * @author Sivabhagya Jawahar
 * @param {index to be removed} index 
 * @param {replacement value} replacement 
 * @returns replaced value
 */
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**
 * The method will check for the valid input for calculation
 * @author Sivabhagya Jawahar
 * @param {number/operator} input 
 * @param {number/operator} value 
 * @returns input/value based on the user's valid input
 */
function setValidInput(input, value) {
    if (value) {
        var lastSpace = value.lastIndexOf(" ");
        if (lastSpace >= 0) {
            var substr = value.substr(lastSpace + 1, value.length);
            if (substr && substr.indexOf(".") >= 0) {
                return value + input;
            }
            value = substr ? value.slice(0, lastSpace + 1) : value;
            value += Number(substr + input);
            return value;
        }
        if (value.indexOf(".") >= 0) {
            return value + input;
        }
        return Number(value + input);
    }
    return input;
}

/**
 * The method is used to set the decimal point for calculation
 * @author Sivabhagya Jawahar
 * @param {number} input 
 * @param {number/operator} value 
 * @returns value/input based on the user's valid input
 */
function setDecimalInput(input, value) {
    if (value) {
        var lastSpace = value.lastIndexOf(" ");
        if (lastSpace >= 0) {
            var substr = value.substr(lastSpace + 1, value.length);
            return isNaN(substr + input) ? value : value + input;
        }
        return isNaN(value + input) ? value : value + input;
    }
    return "0.";
}
