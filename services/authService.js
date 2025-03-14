import crypto from 'crypto'
import { compareData, hashData } from '../utils/encryption.js' 
import { sendResetEmail, sendVerificationEmail } from '../utils/nodemailer.js'

import { createUser, findUserById, findUserByEmail, findUserByDocNumber, updateUserPassword, verifyUserById } from '../repositories/userRepository.js'
import { createToken, deleteToken, findTokenByUserId } from '../repositories/tokenRepository.js'


export async function registerUser(userData) {
    const { email, name, surname, password, gender, doc_type, doc_number, phone } = userData

    // Buscar un usuario por número de doc. y email al mismo tiempo usando promesas
    const [userByDocNumber, userByEmail] = await Promise.all([findUserByDocNumber(doc_number), findUserByEmail(email)])

    // Verificar si el usuario ya está registrado por nombre de usuario y email
    if (userByDocNumber) {
        if (userByDocNumber.isVerified) {
            throw new Error('Ya existe una cuenta con ese número de documento')
        } else {
            throw new Error('Se envió un correo para verificar un usuario con esas credenciales, inténtelo más tarde')
        }    
    } 

    if (userByEmail) {       
        if (userByEmail.isVerified) {
            throw new Error('Ya existe una cuenta con ese email')
        } else {
            throw new Error('Se envió un correo para verificar un usuario con esas credenciales, inténtelo más tarde')
        }  
    } 

    // Encriptar la contraseña usando bcrypt
    const encryptedPass = await hashData(password)

    // Crear un nuevo usuario (no verificado)
    const newUser = {
        email,
        name,
        surname,
        password: encryptedPass,
        gender,
        doc_type,
        doc_number,
        phone,
        isVerified: false 
    }

    // Guardar en BD
    const savedUser = await createUser(newUser)

    // Crear token y link de verificación
    const verificationLink = await createLink(savedUser._id, "verification")

    // Enviar email de verificación
    await sendVerificationEmail(email, verificationLink)

    return savedUser
} 

export async function verifyUser(linkData) {
    const { token, userId } = linkData

    await verifyTokenFromLink(token, "verification", userId)

    const updatedUser = await verifyUserById(userId)

    return updatedUser
}

export async function recoverPassword(emailData) {
    const { email } = emailData

    const foundUser = await findUserByEmail(email)

    if (!foundUser) {
        throw new Error('No existe un usuario con ese correo electrónico')
    }

    const resetLink = await createLink(foundUser._id, "password_reset")

    await sendResetEmail(email, resetLink)

    return resetLink
}

export async function resetPassword(resetData) {
    const { token, userId, newPassword } = resetData

    await verifyTokenFromLink(token, "password_reset", userId)

    // Encriptar la contraseña usando bcrypt
    const encryptedPass = await hashData(newPassword)

    const updatedUser = await updateUserPassword(userId, encryptedPass)

    return updatedUser
}

async function createLink(userId, linkType) {

    // Si es un link de recuperación, eliminar algún token anterior pertenecientes al usuario
    if (linkType === "password_reset") {
        
        const foundToken = await findTokenByUserId(userId)

        if (foundToken) {
            await deleteToken(foundToken)
        }
    } 

    const token = crypto.randomBytes(32).toString('hex')

    const hashedToken = await hashData(token)

    const newToken = {
        userId: userId,
        token: hashedToken,
        type: linkType
    }

    await createToken(newToken)

    const link = `${process.env.FRONT_URL}/${linkType}?token=${token}&id=${userId}`

    return link
}

async function verifyTokenFromLink(token, linkType, userId) {
    const foundToken = await findTokenByUserId(userId)
    const foundUser = await findUserById(userId)

    if (!foundToken || !foundUser) {
        throw new Error('El token adjuntado al enlace o el usuario ya no son válidos')
    }

    if (foundToken.type !== linkType) {
        throw new Error('El token encontrado no corresponde al tipo del enlace')
    }

    const sameToken = await compareData(token, foundToken.token)
    if (!sameToken) {
        throw new Error('Token inválido')
    }
}
