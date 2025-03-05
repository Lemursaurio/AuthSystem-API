import { registerUser } from '../services/userService.js'

export async function createUser(req, res) {
    try {
        const newUser = await registerUser(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}