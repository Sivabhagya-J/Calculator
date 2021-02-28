function calculate(input) {
    var displayElement = document.getElementById("calc-input");
    var value = displayElement.innerHTML;
    if (checkOperators(input)) {
        if (value) {
            value = checkOperators(value.charAt(value.length-2)) ? value.replaceAt(value.length-2, input) : value + " " + input + " ";
        }
    } else if (input !== "=") {
        value += input;
    }
    var expression = value.replace("x", "*");
    displayElement.innerHTML = value;
    var result = eval(expression);
    //result = (result % 1 === 0) ? result : result.toFixed(3);
    document.getElementById("calc-result").innerHTML = result ? result : "";
}

function clearResult() {
    document.getElementById("calc-input").innerHTML = "";
    document.getElementById("calc-result").innerHTML = "";
}

function checkOperators(input) {
    return (input === "+" || input === "-" || input === "x" || input === "/" || input === "%");
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

