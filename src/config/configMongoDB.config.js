import mongoose from 'mongoose'
import ENVIROMENT from './enviroment.config.js'

async function connectToMongoBD(){
    try {
        const connection_string = ENVIROMENT.MONGO_DB_CONNECTION_STRING  
        // ENVIROMENT.MONGO_DB_HOST +'/'+ ENVIROMENT.MONGO_DB_NAME + '?retryWrites=true&w=majority&appName=Cluster0'
        //await hace que se espere a que se resuleva para continuar la ejecucion
        await mongoose.connect(connection_string)
        console.log('Conexion con DB exitosa!')
    }
    catch(error){
        console.log('[SERVER ERROR]: fallo en la conexion')
        console.log('Error detallado:', error.message)
    }
}

export default connectToMongoBD