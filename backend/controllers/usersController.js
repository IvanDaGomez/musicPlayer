export class usersController{
    static async getAllUsers(req, res){
        try {
            const users = await usersModel.getAllUsers();
            if (!users) throw new Error("Cannot Read Users")
            res.send(users)
        }
        catch (err){

        }
    }
    
}