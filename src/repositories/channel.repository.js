import Channel from "../models/Channel.model.js"

class ChannelRepository {
    static async create(id_workspace, name){
        try{
            await Channel.insertOne({
                id_workspace: id_workspace,
                name: name
            })
            console.log('[SERVER]: Se creo correctamente el channel')
        }
        catch(error){
            console.log('[SERVER ERROR]: No se pudo crear el channel', error)
        }
    }

    static async getAll(){
        try{
            const channel = await Channel.find()
            console.log(channel)
            return channel
        }
        catch{
            console.log('[SERVER ERROR]: no se pudo obetener la lista', error)
        }
    }

    static async getById(channel_id){
        try{
            const channel_found = await Channel.findById(channel_id)
            console.log(channel_found)
            return channel_found
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el channel con ese id ' + user_id, error)
        }
    }

    static async deleteById(channel_id){
        try{
            const response = await Channel.findByIdAndDelete(channel_id)
            console.log(response)
            return response
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id del channel para eliminarlo ' + error)
        }
    }

    static async updateById(channel_id, update_channel){
        try{
            await Channel.findByIdAndUpdate(channel_id, update_channel)
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para actualizar el channel ' + error)
        }
    }
}

export default ChannelRepository