import { ifError } from 'assert';
import fs from 'fs'

fs.readFile( 'numeros.txt', 'utf8',  (err, data) => {
    if (err) {
        console.error('error al leer el archivo: , err');
        return;
    }
        const numbers = data.includes(', ') ? data.split(', ') : data.split('\n');
        const evenNumbers = numbers.map(Number).filter(num => num %  2 === 0);
        fs.writeFile('numeros2.txt', JSON.stringify(evenNumbers),(error,) => {
            if(error){console.error(error)

                return
            }
            console.log('archivo creado')
        })
        console.log('Números pares:', "numeros2.txt", evenNumbers.join(', '));
     
});

















