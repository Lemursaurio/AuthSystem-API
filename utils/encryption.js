import bcrypt from 'bcrypt'

export async function hashData(data) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(data, salt)
}

export async function compareData(data, encryptedData) {
    return await bcrypt.compare(data, encryptedData)
}