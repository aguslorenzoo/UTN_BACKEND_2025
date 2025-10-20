import MessageChannel from "../models/MessageChannel.model.js"

class MessageChannelRepository {
    static async create(id_channel, id_sender, content){
        try{
            await MessageChannel.insertOne({
                id_channel: id_channel,
                id_sender: id_sender,
                content: content
            })
            console.log('[SERVER]: Se creo correctamente el channel message')
        }
        catch(error){
            console.log('[SERVER ERROR]: No se pudo crear el channel message')
        }
    }

    static async getAll(){
        try{
            const messageChannel = await MessageChannel.find()
            console.log(messageChannel)
            return messageChannel
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener la lista', error)
        }
    }

    static async getById(messageChannel_id){
        try{
            const messages_found = await MessageChannel.findById(messageChannel_id)
            console.log(messages_found)
            return messages_found
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el mensaje con id ' + messageChannel_id, error)
        }
    }

    static async deleteById(messageChannel_id){
        try{
            const response = await MessageChannel.findByIdAndDelete(messageChannel_id)
            console.log(response)
            return response
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id del mensaje para eliminarlo ' + error)
        }
    }

    static async updateById(messageChannel_id, update_message){
        try{
            await MessageChannel.findByIdAndUpdate(messageChannel_id, update_message)
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para actualizar el mensaje ' + error)
        }
    }
}

export default MessageChannelRepository;