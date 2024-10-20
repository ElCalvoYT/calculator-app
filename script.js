
const numpadButtons = document.querySelectorAll(".numpad button");
const display = document.querySelector(".display h1");
const displayEvaluation = document.querySelector(".display .evaluation");
const operators = ["+", "-", "*", "/", "%"];
let evaluation;

numpadButtons.forEach(button => {
    button.addEventListener("click", () => {
        
        /* Button is a number? */
        if (button.classList.contains("numbers")) {

            removeActiveOperator();

            if (display.innerText === "0" || display.innerText === "Error") {
                clearDisplay(false);
            }
            if (operators.includes(display.innerText.slice(-1))) {
                display.innerText += " " + button.id;
                evaluation += " " + button.id;
            } else {
                display.innerText += button.id;
                evaluation += button.id;
            }
        }
        /* Button is a decimal? */
        else if (button.classList.contains("decimal")) {
            
            if (!display.innerText.includes(",")) {
                display.innerText += button.id;
                evaluation += button.id;
            }
        }
        /* Button is an operator? */
        else if (button.classList.contains("operator")) {

            removeActiveOperator();
            button.classList.add("active");

            let operator;

            if (button.id === "module") {
                operator = "%";
            } else if (button.id === "division") {
                operator = "/";
            } else if (button.id === "multiplication") {
                operator = "*";
            } else if (button.id === "subtraction") {
                operator = "-";
            } else if (button.id === "addition") {
                operator = "+";
            }

            evaluation = display.innerText + " " + operator + " ";
            console.log(evaluation);
            

            clearDisplay(true);
        }

        /* Button is clear? */
        else if (button.classList.contains("clear")) {
            clearDisplay();
        }

        /* Button is equal? */
        else if (button.classList.contains("equal")) {
            calculate()
        }
    });
});

function clearDisplay(isAC=true) {
    isAC === true ? display.innerText = "0" : display.innerText = "";

    displayEvaluation.innerText = "";
}

function removeActiveOperator() {
    document.querySelector("button.operator.active")?.classList.remove("active");
}
function calculate() {

    removeActiveOperator();

    /* replace , with . */
    display.innerText = display.innerText.replace(",", ".");
    evaluation = evaluation.replace(",", ".");

    try {
        let result = eval(evaluation);
        evaluation = evaluation.replace(".", ",");
        display.innerText = result;
        displayEvaluation.innerText = evaluation;
    } catch (error) {
        display.innerText = "Error";
    }

    /* replace . of decimal with , */
    display.innerText = display.innerText.replace(".", ",");
}

document.addEventListener("keydown", (e) => {
    
    e.preventDefault();
    if (e.key === "Escape") {
        clearDisplay();
    }
    if (e.key === "Enter") {
        calculate();
    }
    if (e.key === "Backspace") {
        display.innerText = display.innerText.slice(0, -1);
        
        if (display.innerText === "") {
            clearDisplay();
        }
    }

    if (e.code.slice(0, -1) === "Digit") {
        if (display.innerText === "0") {
            clearDisplay(false);
        }

        display.innerText += e.key;
        evaluation += e.key;
    }

});