import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["verification", "password_reset"],
        required: true
    },
    expiresAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 1000 * 300)
        },
        expires: "5m"
    }
})

const Token = mongoose.model('Token', tokenSchema)

export default Token