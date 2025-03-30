const fs = require("fs");
const path = require("path");

function obtenerTamañoCarpeta(directorio) {
  let tamaño = 0;

  const archivos = fs.readdirSync(directorio);

  archivos.forEach((archivo) => {
    const rutaCompleta = path.join(directorio, archivo);
    const stat = fs.statSync(rutaCompleta);

    if (stat.isDirectory()) {
      tamaño += obtenerTamañoCarpeta(rutaCompleta);
    } else {
      tamaño += stat.size;
    }
  });

  return tamaño;
}

// Función para convertir bytes a un formato legible
function formatearBytes(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

module.exports = { obtenerTamañoCarpeta, formatearBytes };
