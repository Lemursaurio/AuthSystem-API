import express from 'express'
import { createUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/api/v1/users', createUser)

export default route