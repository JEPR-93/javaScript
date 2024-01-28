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
async function obtenerPalabraAleatoria() {
    const palabrasDesdeJSON = await obtenerPalabrasDesdeJSON();
    const todasLasPalabras = [...palabras, ...palabrasAdicionales, ...palabrasDesdeJSON];
    return todasLasPalabras[Math.floor(Math.random() * todasLasPalabras.length)];
}

// Nueva función que utiliza fetch para obtener palabras desde un archivo JSON local
async function obtenerPalabrasDesdeJSON() {
    try {
        const response = await fetch('palabras.json'); // Nombre del archivo con las palabras
        const data = await response.json();
        return data.palabras;
    } catch (error) {
        console.error('Error al cargar las palabras desde el archivo JSON:', error);
        return [];
    }
}

// Función para mostrar la palabra actualizada en la interfaz
function mostrarPalabra(palabra) {
    document.getElementById('palabra').innerText = palabra.join(' ');
}

// Función para mostrar los intentos restantes
function mostrarIntentos(intentos) {
    document.getElementById('intentos').innerText = `Intentos restantes: ${intentos}`;
}

// Función para mostrar las letras usadas
function mostrarLetrasUsadas(letrasUsadas) {
    document.getElementById('letras-usadas').innerText = `Letras usadas: ${letrasUsadas.join(', ')}`;
}

// Función para actualizar la imagen del ahorcado
function actualizarImagenAhorcado() {
    const imagenAhorcado = document.getElementById('imagen-ahorcado');
    imagenAhorcado.src = `/asset/img/ahorcado.png-${6 - intentosRestantes}.png`;
}

// Nueva función con desestructuración
function mostrarInformacionJuego({ palabra, intentos, letrasUsadas }) {
    mostrarPalabra(palabra);
    mostrarIntentos(intentos);
    mostrarLetrasUsadas(letrasUsadas);
    actualizarImagenAhorcado();
}

// Modificación para usar la nueva función de mostrarInformacionJuego
function manejarEntrada(letra) {
    letrasUsadas.includes(letra) ? alert('Ya has utilizado esa letra. Elige otra.') : letrasUsadas.push(letra);

    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            palabraSecreta[i] === letra ? palabraAdivinada[i] = letra : null;
        }
    } else {
        intentosRestantes--;
    }

    mostrarInformacionJuego({
        palabra: palabraAdivinada,
        intentos: intentosRestantes,
        letrasUsadas: letrasUsadas
    });

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
    mostrarInformacionJuego({
        palabra: palabraAdivinada,
        intentos: intentosRestantes,
        letrasUsadas: letrasUsadas
    });
}

// Inicializar el juego al cargar la página
mostrarInformacionJuego({
    palabra: palabraAdivinada,
    intentos: intentosRestantes,
    letrasUsadas: letrasUsadas
});

// Evento para manejar la entrada del usuario
document.addEventListener('keydown', function (event) {
    const letra = event.key.toLowerCase();
    letra.match(/[a-z]/) && letra.length === 1 ? manejarEntrada(letra) : null;
});

