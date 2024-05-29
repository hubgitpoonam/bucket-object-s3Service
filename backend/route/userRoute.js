const express = require('express');
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, loginUser } = require('../controller/userController');



const router = express.Router();

router.post('/login', loginUser);

router.post('/user/create', createUser);

router.get('/get/user', getAllUsers);

router.get('/get/user/:id', getUserById);

router.put('/user/update/:id', updateUserById);

router.delete('/user/delete/:id', deleteUserById);


module.exports = router;