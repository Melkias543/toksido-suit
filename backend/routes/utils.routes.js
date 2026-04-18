import express from 'express'
import { authMiddleware, authorize } from '../middlewares/auth.midlware.js'
import utilsController from '../controllers/utils.controller.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema } from '../validator/authValidator.js'


const utilsUser = express.Router()


utilsUser.get('/all-user' ,authMiddleware , authorize('admin'),utilsController.getALLUser)
utilsUser.get('/user-count',authMiddleware , authorize('admin'),utilsController.getCountOfALLUser)
utilsUser.get('/suit-count',authMiddleware , authorize('admin'),utilsController.getCountOfALLProduct)
utilsUser.get('/get-role', authMiddleware, authorize('admin'), utilsController.getrole)
utilsUser.post('/create-user',validate(registerSchema), authMiddleware, authorize('admin'), utilsController.createUser)
utilsUser.delete('/delete-user/:id', authMiddleware, authorize('admin'), utilsController.deleteUser)

// utilsUser.get('')

export default utilsUser