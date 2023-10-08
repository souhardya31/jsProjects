const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output')

let input = "";
let result; // Define the result variable outside the try-catch block

for (let key of keys){
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if(displayOutput.innerHTML != ""){
            input = "";
            result = "";
            displayInput.textContent = "";
            displayOutput.textContent = "" ;
        }
        switch (value) {
            case "clear":
                input = "";
                displayInput.textContent = "";
                displayOutput.textContent = "";
                break;

            case "backspace":
                input = input.slice(0, -1); // Add a break statement here
                displayInput.innerHTML = CleanInput(input);
                break; // Add a break statement here

            case "=":
                let result = eval(percentOperate(input));
                displayOutput.innerHTML = result.toLocaleString('en-US'); 
                break;

            case "brackets":
                if (
                    (input.indexOf("(") === -1) ||
                    (input.indexOf("(") !== -1 &&
                        input.indexOf(")") !== -1 &&
                        input.lastIndexOf("(") < input.lastIndexOf(")")
                    )
                ) {
                    input += "(";
                } else {
                    input += ")";
                }
                displayInput.innerHTML = CleanInput(input);
                break;

            default:
                if(validateInput(value)){
                   input += value;
                displayInput.innerHTML = CleanInput(input);
                }
                break;
        }
    });
}

function CleanInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i =0; i < inputArrayLength; i++){
        switch (inputArray[i]) {
            case "*":
                inputArray[i] = `<span class="operator">x</span>`
                break;
            case "/":
                inputArray[i] = `<span class="operator">÷</span>`;
                break;
            case "+":
                inputArray[i] = `<span class="operator">+</span>`;
                break;
            case "-":
                inputArray[i] = `<span class="operator">-</span>`;
                break;
            case "(":
                inputArray[i] = `<span class="brackets">(</span>`;
                break;
            case ")":
                inputArray[i] = `<span class="brackets">)</span>`;
                break;
            case "%":
                inputArray[i] = `<span class="operator">%</span>`;
                break;
            
            
        }
    }
    return inputArray.join("");
}

function validateInput (value) {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "/", "*"];

    if (value == "." && lastInput == "."){
        return false;
    } 

    if(operators.includes(value)){
        if(operators.includes(lastInput)){
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function percentOperate() {
    let inputArray = input.split("");

    for (let i = 0; i<inputArray.length; i++){
        if (inputArray[i] == "%"){
            inputArray[i] = "/100"
        }
    }

    return inputArray.join("");
}

