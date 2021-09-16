const express = require('express');
const Router = express.Router();

const UserController = require('../../controllers/user');

Router
//end point //
.get('/getAllUser', UserController.getAllUser)
.get('/getById', UserController.getUserById)

module.exports = Router;