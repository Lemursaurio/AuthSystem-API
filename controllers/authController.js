import { registerUser, recoverPassword, verifyUser, resetPassword } from "../services/authService.js";

export async function userRegistration(req, res) {
    try {
        const newUser = await registerUser(req.body)
        res.status(201).json({ message: 'Usuario creado exitosamente', newUser }) 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function userVerification(req, res) {
    try {
        const verifiedUser = await verifyUser(req.body)
        res.status(201).json({ message: 'Usuario verificado exitosamente', verifiedUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function passwordRecovery(req, res) {
    try {
        const resetLink = await recoverPassword(req.body)
        res.status(201).json({ message: 'Link de recuperación generado exitosamente', resetLink })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export async function passwordReset(req, res) {
    try {
        const updatedUser = await resetPassword(req.body)
        res.status(201).json({ message: 'Contraseña actualizada exitosamente', updatedUser})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}