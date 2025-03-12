import { findUserByEmail, findUserByDocNumber } from '../repositories/userRepository.js'
import { compareData } from '../utils/encryption.js'
import { createToken } from '../utils/jwt.js'

export async function loginUser(loginData) {
    const { credential, password, loginMethod } = loginData

    let foundUser

    // Busca el usuario usando el método de logeo elegido (email o número de documento [dni, extranjeria])
    if (loginMethod === 'email') {
        foundUser = await findUserByEmail(credential)
    }
    if (loginMethod === 'dni') {
        foundUser = await findUserByDocNumber(loginMethod, credential)
    } 
    if (loginMethod === 'carne_extranjeria') {
        foundUser = await findUserByDocNumber(loginMethod, credential)
    }

    if (!foundUser) {
        throw new Error('No se encontró un usuario con esas credenciales')
    }

    if (!foundUser.isVerified) {
        throw new Error('Ese usuario no está verificado')
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