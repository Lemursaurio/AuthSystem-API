import nodemailer from 'nodemailer'

let transporter

// Crear transporter
async function initTransport() {
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
}

// Función para enviar emails de verificación
export async function sendVerificationEmail(email, verficationLink) {
    if (!transporter) {
        await initTransport()
    }

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verificación de Correo",
        text: verficationLink
    })
}

// Función para enviar emails de recuperación
export async function sendResetEmail(email, resetLink) {
    if (!transporter) {
        await initTransport()
    }

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Recuperación de Contraseña",
        text: resetLink
    })
}