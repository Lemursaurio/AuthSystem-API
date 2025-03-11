import { findUserByEmail, findUserByUsername } from '../repositories/userRepository.js'
import { compareData } from '../utils/encryption.js'
import { createToken } from '../utils/jwt.js'

export async function loginUser(loginData) {
    const { credential, password, loginMethod } = loginData

    let foundUser

    // Busca el usuario usando el método de logeo elegido (email o username)
    if (loginMethod === 'email') {
        foundUser = await findUserByEmail(credential)
    } else {
        foundUser = await findUserByUsername(credential)
    }

    if (!foundUser.isVerified) {
        throw new Error('Ese usuario no está verificado')
    }

    if (!foundUser) {
        throw new Error('No se encontró un usuario con esas credenciales')
    }

    // Comparar la contraseña usando bcrypt
    const passwordsMatch = await compareData(password, foundUser.password)

    // Crear token de inicio de sesión
    if (passwordsMatch) {
        return await createToken(foundUser) 
    } else {
        throw new Error('Contraseña incorrecta')
    }
}