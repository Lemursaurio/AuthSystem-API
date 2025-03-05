import { createUser, findByEmail, findByUsername } from '../repositories/userRepository.js'
import { encryptPassword } from '../utils/encryption.js'

export async function registerUser(userData) {
    const { username, email, name, surname, password, gender, phone } = userData

    const [userByUsername, userByEmail] = await Promise.all([findByUsername(username), findByEmail(email)])
    // Verificar si el usuario ya está registrado por nombre de usuario
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

