import MemberWorkspace from "../models/MemberWorkspace.model.js"

class MemberWorkspaceRepository {
    static async crearMiembroWorkspace (id_user, id_workspace, role){
        try{
            await MemberWorkspace.insertOne({
                id_user: id_user,
                id_workspace: id_workspace,
                role: role
            })
            console.log('[SERVER]: miembro creado')
        }
        catch(error){
            console.log('[SERVER ERROR]: No se pudo crear el miembro', error)
        }
    }

    static async getAll(){
        try{
            const memberWorkspace = await MemberWorkspace.find()
            console.log(memberWorkspace)
            return memberWorkspace
        }
        catch(error){
            console.log('[SERVER ERROR]: No se pudo obetener la lista', error)
        }
    }

    static async getById(memberWorkspace_id){
        try{
            const memberWorkspace_found = await MemberWorkspace.findById(memberWorkspace_id)
            console.log(memberWorkspace_found)
            return memberWorkspace_found
        }
        catch(error){
            console.log('[SERVER ERROR]: No se pudo obtener el miembro con con ese id', error)
        }
    }

    static async deleteById(memberWorkspace_id){
        try{
            const response = await MemberWorkspace.findByIdAndDelete(memberWorkspace_id)
            console.log(response)
            return response
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id del miembro del workspace para eliminarlo ' + error)
        }
    }

    static async updateById(memberWorkspace_id, update_memberWorkspace){
        try{
            await MemberWorkspace.findByIdAndUpdate(memberWorkspace_id, update_memberWorkspace)
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para actualizar el workspace ' + error)
        }
    }
}

export default MemberWorkspaceRepository