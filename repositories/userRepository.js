import User from '../models/user.js'

export async function createUser(data) {
    return await User.create(data)
}

export async function findByUsername(username) {
    return await User.findOne({ username: username })
}

export async function findByEmail(email) {
    return await User.findOne({ email: email })
}