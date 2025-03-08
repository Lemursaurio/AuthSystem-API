import express from 'express'
import { logUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/api/v1/login', logUser)

export default route