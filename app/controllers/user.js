const userModel = require('../models/user')
var jwt = require('jsonwebtoken');


module.exports = {
    
    getAllUser: (req, res)=>{
        userModel.getAllUser()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },


    getUserById: (req, res)=>{
        const  id_user = req.query.id_user
        const  nama = req.query.nama

        userModel.getUserById(id_user,nama)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
   
}
