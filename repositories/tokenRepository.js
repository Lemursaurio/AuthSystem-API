import Token from "../models/token.js"

export async function createToken(data) {
    return await Token.create(data)
}

export async function deleteToken(data) {
    return await Token.deleteOne(data)
}

export async function findTokenByUserId(userId) {
    return await Token.findOne({ userId: userId })
}