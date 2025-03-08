import jwt from 'jsonwebtoken'

export async function createToken(userData) {
    const token = jwt.sign({ 
        username: userData.username, 
        email: userData.email, 
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone         
    }, process.env.SECRET_KEY, { expiresIn: 86400 }) // 24 horas

    return token
}
