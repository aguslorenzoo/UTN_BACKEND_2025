import ENVIROMENT from "../config/enviroment.config.js";
import mailTransporter from "../config/mailTransporter.config.js";
import { ServerError } from "../error.js";
import UserRepository from "../repositories/user.repository.js";
import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    static async register(email, password, name){

        const user = await UserRepository.getByEmail(email)
        if (user){
            throw new ServerError(400, 'Email ya en uso')
        }
        const password_hashed = await brcypt.hash(password, 12)
        const user_created = await UserRepository.create(name, email, password_hashed)
        const user_id_created = user_created._id

        const verification_token = jwt.sign(
            {
                user_id: user_id_created
            },
            ENVIROMENT.JWT_SECRET
        )

        mailTransporter.sendMail(
            {
                from: ENVIROMENT.GMAIL_USER,
                to: email,
                subject: 'Verifica tu cuenta de mail',
                html:`
                    <h1>Verifica tu cuenta de mail</h1>
                    <a href="${ENVIROMENT.URL_BACKEND}/api/auth/verify-email/${verification_token}">Verificar</a>
                `
            }
        )
    }

    static async verifyEmail (verification_token){
        try{
            //nos dice si el token esta firmado con x clave
            const payload = jwt.verify(verification_token, ENVIROMENT.JWT_SECRET)
            const {user_id} = payload
            if(!user_id){
                throw new ServerError(400, 'Accion denegada, token con datos insuficientes')
            } 

            const user_found = await UserRepository.getById(user_id)
            if(!user_found){
                throw new ServerError(404, 'Usuario no encontrado')
                console.log(error)
            }

            if(user_found.verified_email){
                throw new ServerError(400, 'Usuario ya validado')
            }

            await UserRepository.updateById(user_id, {verified_email: true})
            return 
        }
        catch(error){
            //Checkeamos si el error es de la verificacion del token
            if(error instanceof jwt.JsonWebTokenError){
                throw new ServerError(400, 'Accion denegada, token invalido')
            }
            throw error
        }
    }

    static async login (email, password){
        //buscar usuario por email  
        const user_found = await UserRepository.getByEmail(email)
        //validar que exista
        if(!user_found){
            throw new ServerError(404, 'Usuario no encontrado')
        }
        //validar si verifico el email
        if(!user_found.verified_email){
            throw new ServerError(401, 'Usuario con mail no verificado')
        }
        //comparar la password recibida con la del usuario
        const is_same_password = await brcypt.compare(password, user_found.password)
        if(!is_same_password){
            throw new ServerError(401, 'Contraseña invalida')
        }
        //generar un token con datos de sesion del usuario y responderlo
        const auth_token = await jwt.sign(
            {
                name: user_found.name,
                email: user_found.email,
                id: user_found.id
            },
            ENVIROMENT.JWT_SECRET
        )
        return {
            auth_token: auth_token
        }
    }
}

export default AuthService