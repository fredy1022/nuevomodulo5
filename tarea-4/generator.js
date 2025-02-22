import fs from 'fs'
let numeros = [];
for (let i =1; i <= 1000; i++) {
    numeros += i
    if (i < 1000) {
        numeros +=', ';
    }
    }
  fs.writeFile('numeros.txt', numeros.toString(','), (err) => {
    if (err) {
      console.log('Error al escribir el archivo', err);
    } else {
      console.log('Archivo "numeros.txt" generado correctamente');
    }
  });

