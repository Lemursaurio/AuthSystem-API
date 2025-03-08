import express from 'express'
import { passwordRecovery, passwordReset, userRegistration, userVerification } from '../controllers/authController.js'

const route = express.Router()

route.post('/api/v1/users', userRegistration)
route.post('/api/v1/verification', userVerification)
route.post('/api/v1/recover-password', passwordRecovery)
route.post('/api/v1/reset-password', passwordReset)

export default route