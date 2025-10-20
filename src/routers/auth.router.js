import { Router } from "express"
import AuthController from "../controllers/auth.controller.js"
import { validateRequest } from "../middlewares/validateRequest.middleware.js"
import { loginSchema, registerSchema } from "../schemas/auth.schemas.js"

//creamos una ruta de express
const authRouter = Router()

authRouter.get(
    '/test',
    (request, response) => {
        response.send({
            ok: true
        })
    }
)

authRouter.post(
    '/register', 
    validateRequest(registerSchema),
    AuthController.register
)

authRouter.get(
    '/verify-email/:verification_token',
    AuthController.verifyEmail
)

authRouter.post(
    '/login',
    validateRequest(loginSchema),
    AuthController.login
)

export default authRouter