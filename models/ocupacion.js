import mongoose from "mongoose";

const ocupacionSchema = new mongoose.Schema({
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion',
        required: true,
    },
    reserva:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva',
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_salida: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        enum: ['ACTIVA', 'FINALIZADA'], // Estados de la ocupación
        default: 'ACTIVA',
    },
});
const Ocupacion = mongoose.model('Ocupacion',ocupacionSchema)
export default Ocupacion;