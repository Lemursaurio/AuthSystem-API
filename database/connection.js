import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Conectado con MongoDB: ${con.connection.host}`)

    } catch(err) {

        console.log(err)
        process.exit(1)
    }
}

export default connectDB

