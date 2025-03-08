import mongoose from "mongoose";
const ReservaSchema = new mongoose.Schema({

    habitacion:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Habitacion',
        required: true,
    },
    fecha_inicio:{
        type:Date,
        required:true,
    },
    fecha_salida:{
        type:Date,
        required:true,
    },
    estado:{
        type: String, 
        enum:['RESERVADO','OCUPADO','CANCELADO'],
        default:'RESERVADO',
    }
})

const Reserva = mongoose.model('Reserva',ReservaSchema);
export default Reserva;