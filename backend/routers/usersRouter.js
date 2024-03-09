import express from 'express'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.get('/userList', userController.getUsersFromDB);
router.post('/newUser', userController.insertUserIntoDB);
router.post('/login', userController.loginUser);


export {router as userRouter}