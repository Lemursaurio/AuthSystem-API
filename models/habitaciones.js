import mongoose from "mongoose";

const HabitacionSchema = new mongoose.Schema({
    
    numero:{
        type:Number,
        required:true,
        unique: true,
    },
    piso:{
        type:Number,
        required:true,
    },
    precio:{
        type:Number,
        required:true,
    },
    tipo:{
        type: String,
        required: true,
    },
    estado:{
        type: String, 
        enum:['OCUPADO','DISPONIBLE'],
        default:'DISPONIBLE',
    },
    camas:{
        type:Number,
        required:true,
    },
    baños:{
        type:Number,
        required:true,
    },
    tv:{
        type:Boolean,
    },
    wifi:{
        type:Boolean
    },
    img:{
        type:String,
    }
})

const Habitacion = mongoose.model('Habitacion',HabitacionSchema);

export default Habitacion;