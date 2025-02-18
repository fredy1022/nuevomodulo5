import axios from 'axios' 

const esperarSegundos = (segundos) => {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(
                `esperarsegundos${segundos}`
            )
        }, 2000)
    })
   
   
    console.log('tiempo especificado')
}





export default esperarSegundos