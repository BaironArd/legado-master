// MODULO DE CALCULADORA v2 - LEGACY
let buffer = "0";
let memoria = 0;
let ultimo_operador;
let historial = [];

// [Español]: Constante que define el número máximo de elementos en el historial.
// [English]: Constant defining the maximum number of items in the history.
const MAX_HISTORY_ITEMS = 5; 

// [Español]: Función que maneja la lógica de los números ingresados.
// [English]: Function that handles the logic of the entered numbers.
function handleNumber(numStr) {
    if (buffer === "0") { buffer = numStr; } else { buffer += numStr; }
    updateScreen();
}

// [Español]: Función que maneja los símbolos (operadores y funciones científicas).
// [English]: Function that handles the symbols (operators and scientific functions).
function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0"; memoria = 0; ultimo_operador = null;
            break;
        case "=":
            if (ultimo_operador === null) { return; }
            // [Español]: La función de cálculo ahora maneja la lógica del historial de forma centralizada.
            // [English]: The calculation function now handles the history logic in a centralized manner.
            flushOperationAndLog(parseInt(buffer));
            ultimo_operador = null;
            buffer = "" + memoria;
            memoria = 0;
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleMath(symbol);
            break;
        case "sin":
        case "cos":
        case "tan":
            if (buffer === "0") return;
            {
                let cientifico_result;
                let val = parseFloat(buffer);

                if (symbol == "sin") { 
                    cientifico_result = Math.sin(val); 
                }
                else if (symbol == "cos") { 
                    cientifico_result = Math.cos(val); 
                }
                else if (symbol == "tan") { 
                    cientifico_result = Math.tan(val); 
                }

                buffer = "" + cientifico_result;
                logHistory(symbol + "(" + val + ") = " + cientifico_result);
            }
            break;
    }
    updateScreen();
}

// [Español]: Función que maneja las operaciones matemáticas básicas.
// [English]: Function that handles basic mathematical operations.
function handleMath(symbol) {
    if (buffer === "0" && memoria === 0) { return; }
    let intBuffer = parseInt(buffer);
    if (memoria === 0) {
        memoria = intBuffer;
    } else {
        flushOperationAndLog(intBuffer);
    }
    ultimo_operador = symbol;
    buffer = "0";
}

// [Español]: Función que realiza la operación de cálculo y maneja el historial.
// [English]: Function that performs the calculation operation and handles the history.
function flushOperationAndLog(intBuffer) {
    flushOperation(intBuffer); 
    // [Español]: Solo realiza el cálculo. 
    // [English]: Just performs the calculation.
    let logEntry = memoria + " " + ultimo_operador + " " + intBuffer + " = " + memoria;
    logHistory(logEntry); 
    // [Español]: Llama a logHistory para manejar el historial.
    // [English]: Calls logHistory to handle the history.
}

// [Español]: Función que maneja el cálculo de las operaciones aritméticas.
// [English]: Function that handles the calculation of arithmetic operations.
function flushOperation(intBuffer) {
    if (OPERATIONS[ultimo_operador]) { 
        memoria = OPERATIONS[ultimo_operador](memoria, intBuffer); 
    }
}

// [Español]: Función que maneja el historial y se asegura de que no exceda el límite.
// [English]: Function that handles the history and ensures it does not exceed the limit.
function logHistory(logEntry) {
    historial.push(logEntry);
    if (historial.length > MAX_HISTORY_ITEMS) {
        historial.shift();
    }
    console.log(historial);
}

function updateScreen() {
    document.getElementById("display").innerText = buffer;
}

function init() {
    document.querySelector(".buttons").addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });
}

function buttonClick(value) {
    if (isNaN(parseInt(value))) { handleSymbol(value); } else { handleNumber(value); }
}

init();

// [Español]: Objeto que almacena las operaciones matemáticas.
// [English]: Object that stores mathematical operations.
const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};
