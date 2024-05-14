// Variables para el número secreto, el número de intentos y el contador de intentos
let numeroSecreto, intentos, contadorIntentos;

// Función para iniciar el juego
function iniciarJuego() {
    // Genera un número secreto aleatorio entre 1 y 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    // Inicializa el número de intentos y el contador de intentos
    intentos = 10;
    contadorIntentos = 0;
    // Limpia el mensaje y el contador de intentos en la interfaz de usuario
    document.getElementById('mensaje').textContent = '';
    document.getElementById('contadorIntentos').textContent = 'Intentos: 0';
}

// Función para adivinar el número
function adivinarNumero() {
    // Obtiene el número del jugador del campo de entrada
    let numeroJugador = document.getElementById('numeroJugador').value;

    // Verifica que el número del jugador sea válido
    if(numeroJugador == '' || numeroJugador < 1 || numeroJugador > 100) {
        alert('Por favor, ingresa un número entre 1 y 100.');
        return;
    }

    // Incrementa el contador de intentos y lo actualiza en la interfaz de usuario
    contadorIntentos++;
    document.getElementById('contadorIntentos').textContent = 'Intentos: ' + contadorIntentos;

    // Comprueba si el número del jugador es igual al número secreto
    if(numeroJugador == numeroSecreto) {
        // Si el jugador adivina el número, muestra un mensaje de victoria
        document.getElementById('mensaje').textContent = "¡Has adivinado el número en " + contadorIntentos + " intentos! El número secreto es " + numeroSecreto;
    } else {
        // Si el jugador no adivina el número, decrementa el número de intentos
        intentos--;

        // Da retroalimentación al jugador sobre si el número secreto es mayor o menor
        if(numeroJugador < numeroSecreto) {
            document.getElementById('mensaje').textContent = "El número secreto es mayor. Te quedan " + intentos + " intentos.";
        } else if(numeroJugador > numeroSecreto) {
            document.getElementById('mensaje').textContent = "El número secreto es menor. Te quedan " + intentos + " intentos.";
        }
    }

    // Si el jugador se queda sin intentos, muestra un mensaje de derrota
    if(intentos == 0) {
        document.getElementById('mensaje').textContent = "Has perdido. El número secreto era " + numeroSecreto;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    iniciarJuego();
}

// Inicia el juego cuando se carga la página
iniciarJuego();

// Agrega los Event Listeners
document.getElementById('adivinar').addEventListener('click', adivinarNumero);
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
document.getElementById('numeroJugador').addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
        adivinarNumero();
    }
});

document.getElementById('numeroJugador').focus();