import express from 'express'
import { createUser } from '../controllers/userController.js'
import { logUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/api/v1/users', createUser)
route.post('/api/v1/login', logUser)

export default route