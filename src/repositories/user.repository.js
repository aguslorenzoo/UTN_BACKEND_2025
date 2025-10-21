import User from "../models/User.model.js"

class UserRepository {
    static async create(name, email, password){
        try{
            return await User.create({
                name: name,
                email: email,
                password: password
            })
            console.log('[SERVER]: usuario creado exitosamente')
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo crear el usuario', error)
        }
    }

    static async getAll(){
        try{
            const users = await User.find()
            console.log(users)
            return users
        }
        catch{
            console.log('[SERVER ERROR]: no se pudo obetener la lista', error)
        }
    }

    static async getById(user_id){
        try{
            const user_found = await User.findById(user_id)
            return user_found
        }
        catch{
            console.log('[SERVER ERROR]: no se pudo obetener el usuario con id ' + user_id, error)
            throw error
        }
    }

    static async getByEmail(email){
        try{
            const user_found = await User.findOne({email: email})
            console.log(user_found)
            return user_found
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el usuario con email ' + email, error)
        }
    }

    static async deleteById(user_id){
        try{
            const response = await User.findByIdAndDelete(user_id)
            console.log(response)
            return response
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para elimianrlo ' + user_id, error)
        }
    }

    static async updateById(user_id, update_user){
        try{
            await User.findByIdAndUpdate(user_id, update_user)
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para actualizar el usuario ' + user_id, error)
        }
    }
}

export default UserRepository