// ------------ SCRIPT CALCULADORA LEGACY v1.2 ------------
// [Español]: Encabezado con nombre y versión del script.
// [English]: Header with the script name and version.
// NO TOCAR NADA - FUNCIONA (A VECES)
// [Español]: Nota del autor indicando que funciona solo a veces.
// [English]: Author note indicating it works sometimes.

// Estado global de la calculadora
// [Español]: 'buffer' guarda la cadena actual mostrada en pantalla.
// [English]: 'buffer' stores the current string displayed on screen.
let buffer = "0";
// [Español]: 'memoria' almacena el valor acumulado (la memoria de la operación).
// [English]: 'memoria' stores the accumulated value (operation memory).
let memoria = 0;
// [Español]: 'ultimo_operador' recuerda el operador pendiente (+ - * /).
// [English]: 'ultimo_operador' remembers the pending operator (+ - * /).
let ultimo_operador;

// Manejo de entrada numérica
// [Español]: Añade un dígito al buffer o lo reemplaza si es "0".
// [English]: Appends a digit to the buffer or replaces it if it's "0".
function handleNumber(numStr) {
  if (buffer === "0") {
    buffer = numStr;
  } else {
    buffer += numStr;
  }
  updateScreen();
}

// Manejo de símbolos/operadores especiales (C, =, +, -, *, /)
function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      memoria = 0;
      ultimo_operador = null;
      break;
    case "=":
      if (ultimo_operador === null) {
        return;
      }
      flushOperation(parseInt(buffer));
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
  }
  updateScreen();
}

// Preparar operación aritmética
function handleMath(symbol) {
  if (buffer === "0" && memoria === 0) {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (memoria === 0) {
    memoria = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  ultimo_operador = symbol;
  buffer = "0";
}

// Ejecuta la operación guardada entre 'memoria' y el valor actual
function flushOperation(intBuffer) {
  if (ultimo_operador === "+") {
    memoria += intBuffer;
  } else if (ultimo_operador === "-") {
    memoria -= intBuffer;
  } else if (ultimo_operador === "*") {
    memoria *= intBuffer;
  } else if (ultimo_operador === "/") {
    memoria /= intBuffer;
  }
}

// Actualiza la pantalla HTML con el valor del buffer
function updateScreen() {
  const laPantalla = document.getElementById("display");
  laPantalla.innerText = buffer;
}

// Inicializa la calculadora
function init() {
  // console.log("Calculadora inicializada...");
  document
    .querySelector(".buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

// Procesa los clics en los botones
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

// Ejecuta la inicialización
init();
