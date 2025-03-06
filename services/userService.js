import { createUser, findByEmail, findByUsername } from '../repositories/userRepository.js'
import { comparePassword, encryptPassword } from '../utils/encryption.js'
import { createToken } from '../utils/jwt.js'

export async function registerUser(userData) {
    const { username, email, name, surname, password, gender, phone } = userData

    const [userByUsername, userByEmail] = await Promise.all([findByUsername(username), findByEmail(email)])
    // Verificar si el usuario ya está registrado por nombre de usuario y email
    if (userByUsername) {
        throw new Error('Ya existe una cuenta con ese nombre de usuario')
    } 

    if (userByEmail) {
        throw new Error('Ya existe una cuenta con ese email')
    } 
    // Encriptar la contraseña usando bcrypt
    const encryptedPass = await encryptPassword(password)

    // Crear un nuevo usuario
    const newUser = {
        username,
        email,
        name,
        surname,
        password: encryptedPass,
        gender,
        phone 
    }

    // Guardar en BD
    await createUser(newUser)
    return newUser
} 

export async function loginUser(loginData) {
    const { credential, password, loginMethod } = loginData

    let foundUser

    if (loginMethod === 'email') {
        foundUser = await findByEmail(credential)
    } else {
        foundUser = await findByUsername(credential)
    }

    if (!foundUser) {
        throw new Error('No se encontró un usuario con esas credenciales')
    }

    const passwordsMatch = await comparePassword(password, foundUser.password)

    if (passwordsMatch) {
        return await createToken(foundUser) 
    } else {
        throw new Error('Contraseña incorrecta')
    }
}