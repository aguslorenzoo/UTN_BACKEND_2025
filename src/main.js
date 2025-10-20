import ENVIROMENT from "./config/enviroment.config.js";
import connectToMongoBD from "./config/configMongoDB.config.js";
import express from 'express';
import workspaceRouter from "./routers/workspace.router.js";
import workspaceController from "./controllers/workspace.controller.js";
import authRouter from "./routers/auth.router.js";
import mailTransporter from "./config/mailTransporter.config.js";
import cors from 'cors'


connectToMongoBD()

//nos crea una app de express (servidor web)
const app = express()
//configuro a mi api como publica, cualquier dominio puede hacer peticiones a mi api
app.use(cors())

/* mailTransporter.sendMail(
    {
        from: ENVIROMENT.GMAIL_USER,
        to: 'agusdevelop21@gmail.com',
        subject: 'Mail de prueba',
        html: '<h1>hola desde node js</h1>'
    }
) */


//Listen lo usamos para dedicar un puerto a nuestro servidor
//recibe 2 parametros
//1. nro puerto
//2. callback que se ejecutara si todo sale bien
app.listen(
    ENVIROMENT.PORT || 8080,
    ()=> {
    console.log('Tu servidor se esta ejecutando correctamente en el puerto ' + ENVIROMENT.PORT)
})

//Nuesta app por defecto no esta preparada para recibir json en el body
//configuracion para que el json se transforme en un objeto de js
app.use(express.json())


app.get(
    '/test', 
    (request, response) => {
        response.send('<h1>Hola Mundo</h1>')
    }
)

app.post(
    '/sumar',
    (request, response) => { 
        const {numero_1, numero_2} = request.body
        if (typeof (numero_1) !== 'number'){
            response.send({
                error: 'Numero 1 debe ser un numero, valor actual: ' + numero_1
            })
            return
        }
        else if (typeof (numero_2) !== 'number'){
            response.send({
                error: 'Numero 2 debe ser un numero, valor actual: ' + numero_2
            })
            return
        }

        response.send({
            result: Number(numero_1 )+ Number(numero_2)
        })
    }
)

// ROUTERS
//todas las consultas con /api/auth van a ser gestionadas por el authrouter
app.use('/api/auth', authRouter)

app.use('/api/workspace', workspaceRouter)

