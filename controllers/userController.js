import { loginUser } from '../services/userService.js'

export async function logUser(req, res) {
    try {
        const token = await loginUser(req.body)

        // Guarda el token en una cookie
        res.cookie('token', token, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: 'Strict'
        })

        res.status(201).json({ message: "Token creado exitosamente", token })
    } catch (error) {
        res.status(400).json({ error: error.message }) 
    }
}