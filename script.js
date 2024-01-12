// Lista de palabras para el juego
const palabras = ["javascript", "html", "css", "python", "react", "angular", "nodejs"];

// Array de búsqueda adicional
const palabrasAdicionales = ["java", "php", "typescript", "mongodb", "redux"];

// Objeto de búsqueda adicional
const objetosBusqueda = {
    lenguajes: ["java", "php", "typescript"],
    frameworks: ["react", "angular"],
    basesDeDatos: ["mongodb", "mysql"]
};

// Seleccionar una palabra aleatoria
let palabraSecreta = obtenerPalabraAleatoria();

// Inicializar el estado del juego
let palabraAdivinada = Array(palabraSecreta.length).fill("_");
let intentosRestantes = 6;
let letrasUsadas = [];

// Función para obtener una palabra aleatoria de los arrays
function obtenerPalabraAleatoria() {
    const todasLasPalabras = [...palabras, ...palabrasAdicionales];
    return todasLasPalabras[Math.floor(Math.random() * todasLasPalabras.length)];
}

// Función para mostrar la palabra actualizada en la interfaz
function mostrarPalabra() {
    document.getElementById('palabra').innerText = palabraAdivinada.join(' ');
}

// Función para mostrar los intentos restantes
function mostrarIntentos() {
    document.getElementById('intentos').innerText = `Intentos restantes: ${intentosRestantes}`;
}

// Función para mostrar las letras usadas
function mostrarLetrasUsadas() {
    document.getElementById('letras-usadas').innerText = `Letras usadas: ${letrasUsadas.join(', ')}`;
}

// Función para actualizar la imagen del ahorcado
function actualizarImagenAhorcado() {
    const imagenAhorcado = document.getElementById('imagen-ahorcado');
    imagenAhorcado.src = `/asset/img/ahorcado.png-${6 - intentosRestantes}.png`;
}

// Función para manejar la entrada del usuario
function manejarEntrada(letra) {
    letrasUsadas.includes(letra) ? alert('Ya has utilizado esa letra. Elige otra.') : letrasUsadas.push(letra);

    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            palabraSecreta[i] === letra ? palabraAdivinada[i] = letra : null;
        }
    } else {
        intentosRestantes--;
    }

    mostrarPalabra();
    mostrarIntentos();
    mostrarLetrasUsadas();
    actualizarImagenAhorcado();

    if (intentosRestantes === 0) {
        alert(`¡Perdiste! La palabra era "${palabraSecreta}".`);
        reiniciarJuego();
    } else if (!palabraAdivinada.includes("_")) {
        alert("¡Felicidades! ¡Has adivinado la palabra!");
        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    palabraSecreta = obtenerPalabraAleatoria();
    palabraAdivinada = Array(palabraSecreta.length).fill("_");
    intentosRestantes = 6;
    letrasUsadas = [];
    mostrarPalabra();
    mostrarIntentos();
    mostrarLetrasUsadas();
    actualizarImagenAhorcado();
}

// Inicializar el juego al cargar la página
mostrarPalabra();
mostrarIntentos();
mostrarLetrasUsadas();
actualizarImagenAhorcado();

// Evento para manejar la entrada del usuario
document.addEventListener('keydown', function (event) {
    const letra = event.key.toLowerCase();
    letra.match(/[a-z]/) && letra.length === 1 ? manejarEntrada(letra) : null;
});

