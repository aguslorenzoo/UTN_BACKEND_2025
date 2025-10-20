import ENVIROMENT from "../config/enviroment.config.js";
import { ServerError } from "../error.js";
import AuthService from "../services/auth.service.js";

class AuthController {
    static async register (request, response){
        try{
            const {email, name, password} = request.body
            
            await AuthService.register(email, password, name)
            response.status(201).json({
                ok: true,
                message: "Usuario registrado con exito"
            })
        }
        catch(error){
            if(error.status){
                response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                response.status(500).json({
                    ok: false,
                    message: 'Error interno del sevidor',
                    status: 500
                })
            }
        }
    }

    static async verifyEmail (request, response){
        try{
            const {verification_token} = request.params

            await AuthService.verifyEmail(verification_token)

            response.redirect(
                ENVIROMENT.URL_FRONTEND + '/login?from=verified_email'
            )
        }
        catch(error){
            if(error.status){
                response.send(`
                    <h1>${error.message}</h1>`)
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
 
                response.send(`
                    <h1>Error en el servidor, intetelo mas tarde</h1>`)
            }
        }
    }

    static async login (request, response){
        try{
            //datos que tomo del front
            const {email, password} = request.body
            //se lo paso al back 
            const {auth_token} = await AuthService.login(email, password)
            
            return response.status(200).json(
                {
                    ok: true,
                    message: 'Usuario logueado con exito',
                    status: 200,
                    body: {
                        auth_token
                    }
                }
            )
        
        }
        catch(error){
            if(error.status){
                response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                response.status(500).json({
                    ok: false,
                    message: 'Error interno del sevidor',
                    status: 500
                })
            }
        }
    }
}


export default AuthController