import User from '../models/user.js'

export async function createUser(data) {
    return await User.create(data)
}

export async function findUserById(id) {
    return await User.findOne({ _id: id })
}

export async function findUserByUsername(username) {
    return await User.findOne({ username: username })
}

export async function findUserByEmail(email) {
    return await User.findOne({ email: email })
}

export async function verifyUserById(id) {
    return await User.updateOne({ _id: id }, { isVerified: true, expiresAt: null })
}

export async function updateUserPassword(id, newPassword) {
    return await User.updateOne({ _id: id }, { password: newPassword })
}