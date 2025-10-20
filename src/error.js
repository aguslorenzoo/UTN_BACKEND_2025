
function ejecutarSuma() {
    try {
        // intenta ejecutar este bloque de codigo
        console.log(sumar(2))
    }
    catch(error){
        //en caso de que falle, catch atrapa el error y sigue ejecutando
        console.log('La operacion sumar ha fallado')
        console.log('RAZON: ', error)
    }
    finally{
        //Finalmente, o independientemente de lo que pase ejecuta esto
        console.log("Finalizo el intento de ejecucion de sumar")
    }
} 
console.log('Aunque halla un fallo en el programa se sigue ejecutando lo demas, como este texto')

export class ServerError extends Error{
    constructor(status, message){
        super(message)
        this.status = status
    }
}