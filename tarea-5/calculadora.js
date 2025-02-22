//console.log('hola mundo')

console.log(process.argv)

const numeroA = process.argv[2]
const numeroB =  process.argv[4]
const problema = process.argv[3]
if (problema === "+"){ 
    const resultado = numeroA + numeroB
    console.log("tu resultado es", resultado);
}else if  (problema === "-"){
    const resultado = numeroA - numeroB 
    console.log("tu resultado es", resultado);
}else if  (problema === "*"){
    const resultado = numeroA * numeroB 
    console.log("tu resultado es", resultado);
}else if  (problema === "/"){
    const resultado = numeroA / numeroB 
    console.log("tu resultado es", resultado);
}