import bcrypt from 'bcrypt'

export async function encryptPassword(password) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

export async function comparePassword(password, encryptedPass) {
    return await bcrypt.compare(password, encryptedPass)
}