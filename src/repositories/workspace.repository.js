import Workspace from "../models/Workspace.model.js"

class WorkspaceRepository {
    static async create (name, url_image){
        try{
            await Workspace.insertOne({
                    name: name,
                    url_image: url_image
                })
            console.log('[SERVER] workspace creado exitosamente')
        }
        catch(error){
            console.log('[SERVER]: No se pudo crear el workspace')
        }
    }

    static async getAll(){
        try{
            const workspaces = await Workspace.find()
            console.log(workspaces)
            return workspaces
        }
        catch{
            console.log('[SERVER ERROR]: no se pudo obetener la lista', error)
        }
    }

    static async getById(workspace_id){
        try{
            const workspace_found = await Workspace.findById(workspace_id)
            console.log(workspace_found)
            return workspace_found
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el workspace con id ' + user_id, error)
        }
    }

    static async deleteById(workspace_id){
        try{
            const response = await Workspace.findByIdAndDelete(workspace_id)
            console.log(response)
            return response
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id del workspace para eliminarlo ' + error)
        }
    }

    static async updateById(workspace_id, update_workspace){
        try{
            await Workspace.findByIdAndUpdate(workspace_id, update_workspace)
        }
        catch(error){
            console.log('[SERVER ERROR]: no se pudo obetener el id para actualizar el workspace ' + error)
        }
    }
}

export default WorkspaceRepository

