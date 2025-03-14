import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["masculino", "femenino"]
    },
    doc_type: {
        type: String,
        required: true,
        enum: ["dni", "carne_extranjeria"]
    },
    doc_number: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 1000 * 300)
        },
        expires: '5m'
    }
})

const User = mongoose.model('User', userSchema)

export default User