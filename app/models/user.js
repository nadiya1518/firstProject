const connection = require('../config/db');

module.exports={
    getAllUser: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT * FROM user", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    getUserById: (id_user,nama ) =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT * FROM user WHERE id_user=? AND nama=?",[id_user], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },


}