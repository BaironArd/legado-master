// ------------ SCRIPT CALCULADORA LEGACY v1.2 ------------
// NO TOCAR NADA - FUNCIONA (A VECES)
// [Español]: Calculadora Legacy - versión 1.2. No modificar nada, funciona a veces.
// [English]: Legacy calculator - version 1.2. Do not touch anything, it works (sometimes).

let buffer = "0";
// [Español]: El valor mostrado en la pantalla de la calculadora. Empieza en "0". 
// [English]: The value displayed on the calculator screen. Starts at "0".

let memoria = 0;
// [Español]: Variable que almacena el resultado de las operaciones. 
// [English]: Variable that stores the result of operations.

let ultimo_operador;
// [Español]: Almacena el último operador matemático utilizado. 
// [English]: Stores the last mathematical operator used.

function handleNumber(numStr) {
    // [Español]: Maneja la entrada de números. 
    // [English]: Handles number input.
    if (buffer === "0") {
        // [Español]: Si el buffer es "0", reemplaza el valor. 
        // [English]: If the buffer is "0", replace the value.
        buffer = numStr;
        // [Español]: Reemplaza el buffer con el número introducido. 
        // [English]: Replaces the buffer with the entered number.
    } else {
        // [Español]: Si ya hay un número, lo agrega al buffer. 
        // [English]: If there is already a number, append it to the buffer.
        buffer += numStr;
        // [Español]: Añade el número al buffer. 
        // [English]: Adds the number to the buffer.
    }
    updateScreen();
    // [Español]: Actualiza la pantalla de la calculadora. 
    // [English]: Updates the calculator screen.
}

function handleSymbol(symbol) {
    // [Español]: Maneja los símbolos y operadores. 
    // [English]: Handles symbols and operators.
    switch (symbol) {
        // [Español]: Realiza acciones según el símbolo. 
        // [English]: Performs actions based on the symbol.
        case "C":
            // [Español]: Limpia el buffer y la memoria. 
            // [English]: Clears the buffer and memory.
            buffer = "0";
            // [Español]: Restablece el buffer a "0". 
            // [English]: Resets the buffer to "0".
            memoria = 0;
            // [Español]: Restablece la memoria a 0. 
            // [English]: Resets memory to 0.
            ultimo_operador = null;
            // [Español]: Elimina el último operador. 
            // [English]: Removes the last operator.
            break;
        case "=":
            // [Español]: Realiza la operación final. 
            // [English]: Performs the final operation.
            if (ultimo_operador === null) {
                // [Español]: Si no hay operador, no hace nada. 
                // [English]: If there is no operator, do nothing.
                return;
                // [Español]: Sale de la función. 
                // [English]: Exits the function.
            }
            flushOperation(parseInt(buffer));
            // [Español]: Realiza la operación con el número en el buffer. 
            // [English]: Performs the operation with the number in the buffer.
            ultimo_operador = null;
            // [Español]: Elimina el operador después de ejecutar la operación. 
            // [English]: Removes the operator after executing the operation.
            buffer = "" + memoria;
            // [Español]: Muestra el resultado de la operación en el buffer. 
            // [English]: Displays the result of the operation in the buffer.
            memoria = 0;
            // [Español]: Resetea la memoria a 0. 
            // [English]: Resets memory to 0.
            break;
        case "+": // [Español]: Maneja la operación de suma. / [English]: Handles the addition operation.
        case "-": // [Español]: Maneja la operación de resta. / [English]: Handles the subtraction operation.
        case "*": // [Español]: Maneja la operación de multiplicación. / [English]: Handles the multiplication operation.
        case "/": // [Español]: Maneja la operación de división. / [English]: Handles the division operation.
            handleMath(symbol); // [Español]: Llama a la función para manejar la operación matemática. / [English]: Calls the function to handle the mathematical operation.
            break;
    }
    updateScreen();
    // [Español]: Actualiza la pantalla de la calculadora. 
    // [English]: Updates the calculator screen.
}

function handleMath(symbol) {
    // [Español]: Maneja las operaciones matemáticas. 
    // [English]: Handles mathematical operations.
    if (buffer === "0" && memoria === 0) {
        // [Español]: Si el buffer y la memoria están vacíos, no hace nada. 
        // [English]: If the buffer and memory are empty, do nothing.
        return;
        // [Español]: Sale de la función. 
        // [English]: Exits the function.
    }
    let intBuffer = parseInt(buffer);
    // [Español]: Convierte el valor del buffer a entero. 
    // [English]: Converts the buffer value to an integer.
    if (memoria === 0) {
        // [Español]: Si la memoria está vacía, guarda el valor en memoria. 
        // [English]: If memory is empty, store the value in memory.
        memoria = intBuffer;
        // [Español]: Almacena el valor del buffer en la memoria. 
        // [English]: Stores the buffer value in memory.
    } else {
        // [Español]: Si hay valor en memoria, realiza la operación. 
        // [English]: If there is a value in memory, perform the operation.
        flushOperation(intBuffer);
        // [Español]: Realiza la operación con el valor del buffer. 
        // [English]: Performs the operation with the buffer value.
    }
    ultimo_operador = symbol;
    // [Español]: Guarda el operador actual. 
    // [English]: Stores the current operator.
    buffer = "0";
    // [Español]: Restablece el buffer a "0". 
    // [English]: Resets the buffer to "0".
}

function flushOperation(intBuffer) {
    // [Español]: Ejecuta la operación matemática seleccionada. 
    // [English]: Executes the selected mathematical operation.
    if (ultimo_operador === "+") {
        // [Español]: Si el operador es suma, suma los valores. 
        // [English]: If the operator is addition, adds the values.
        memoria += intBuffer;
        // [Español]: Suma el valor del buffer a la memoria. 
        // [English]: Adds the buffer value to memory.
    } else if (ultimo_operador === "-") {
        // [Español]: Si el operador es resta, resta los valores. 
        // [English]: If the operator is subtraction, subtracts the values.
        memoria -= intBuffer;
        // [Español]: Resta el valor del buffer a la memoria. 
        // [English]: Subtracts the buffer value from memory.
    } else if (ultimo_operador === "*") {
        // [Español]: Si el operador es multiplicación, multiplica los valores. 
        // [English]: If the operator is multiplication, multiplies the values.
        memoria *= intBuffer;
        // [Español]: Multiplica el valor del buffer por la memoria. 
        // [English]: Multiplies the buffer value by memory.
    } else if (ultimo_operador === "/") {
        // [Español]: Si el operador es división, divide los valores. 
        // [English]: If the operator is division, divides the values.
        memoria /= intBuffer;
        // [Español]: Divide la memoria por el valor del buffer. 
        // [English]: Divides memory by the buffer value.
    }
}

function updateScreen() {
    // [Español]: Actualiza el valor de la pantalla de la calculadora. 
    // [English]: Updates the calculator screen value.
    let laPantalla = document.getElementById("display");
    // [Español]: Obtiene el elemento de la pantalla por su ID. 
    // [English]: Gets the display element by its ID.
    laPantalla.innerText = buffer;
    // [Español]: Muestra el valor del buffer en la pantalla. 
    // [English]: Displays the buffer value on the screen.
}

// INICIALIZADOR DE BOTONES
function init() {
    // [Español]: Inicializa los botones de la calculadora. 
    // [English]: Initializes the calculator buttons.
    console.log("Calculadora inicializada...");
    // [Español]: Muestra un mensaje de que la calculadora ha sido inicializada. 
    // [English]: Displays a message that the calculator has been initialized.
    document.querySelector(".buttons").addEventListener("click", function (event) {
        // [Español]: Agrega un evento de clic a los botones. 
        // [English]: Adds a click event to the buttons.
        buttonClick(event.target.innerText);
        // [Español]: Llama a la función `buttonClick` con el texto del botón. 
        // [English]: Calls the `buttonClick` function with the button text.
    });
}

function buttonClick(value) {
    // [Español]: Maneja el clic de un botón. 
    // [English]: Handles a button click.
    if (isNaN(parseInt(value))) {
        // [Español]: Si el valor no es un número, maneja el símbolo. 
        // [English]: If the value is not a number, handles the symbol.
        handleSymbol(value);
        // [Español]: Llama a la función `handleSymbol` para manejar el símbolo. 
        // [English]: Calls the `handleSymbol` function to handle the symbol.
    } else {
        // [Español]: Si el valor es un número, maneja el número. 
        // [English]: If the value is a number, handles the number.
        handleNumber(value);
        // [Español]: Llama a la función `handleNumber` para manejar el número. 
        // [English]: Calls the `handleNumber` function to handle the number.
    }
}
init();
// [Español]: Inicializa la calculadora.
// [English]: Initializes the calculator.
