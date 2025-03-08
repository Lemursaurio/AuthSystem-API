import Reserva from '../models/reservas.js';
import Habitacion from "../models/habitaciones.js";


class reservasController{
    constructor(){

    }

    async verReservas(req,res){
        try{
            const allHabitaciones = await Reserva.find();
            res.status(200).json({ message:'geall-ok',Reserva:allHabitaciones })
        }catch(e){
            res.status(500).json({message:' error en obtner reservas', error:e.message})
        }
    }
    async buscarReserva(req,res){
        try{
            const buscarReserva = await Reserva.findById(req.params.id);
            res.status(201).json({message:'se econtro la reserca', Reserva:buscarReserva});
        }catch(e){
            res.status(500).json({message:'error al buscar reserva', error:e.message})
        }
    }
    async crearReserva(req,res){
        try{

            const {fecha_inicio, fecha_salida, habitacion} = req.body;

            // validar si la habitacion existe
            const existenciahabitacion = await Habitacion.findById(habitacion);
            if(!existenciahabitacion) 
                {return res.status(404).json({message:'habitacion no existe'})
            }

            // validar que las fechas sean coherentes
            if( new Date(fecha_inicio) >=  new Date(fecha_salida)){
                return res.status(400).json({message: 'la fecha de inicio debe ser menor a la de la salida'})
            }

            // validar que la habitacion este disponible en dichas fechas
            const reservasExistentes = await Reserva.find({
                Habitacion,
                estado: {$in:['RESERVADO','OCUPADO']}, 
                $or:[
                    {
                        fecha_inicio: { $lt: new Date(fecha_salida) }, 
                        fecha_salida: { $gt: new Date(fecha_inicio) }
                    }
                ]
            })
            if(reservasExistentes.length > 0){
                return res.status(400).json({message:'la habitacion no esta disponible para las fechas solicitadas'})
            }

            // crear la nueva reserva
            const newReserva = new Reserva({habitacion, fecha_inicio, fecha_salida, estado:'RESERVADO',});

            await newReserva.save();

            res.status(201).json({message:'se creo una reserva', Reserva: newReserva})
        }catch(e){
            res.status(500).json({message:'error en crear reserva', error:e.message})
        }
    }
    
    async cancelarReserva(req,res){
        try{
            const eliminarReserva = await Reserva.findByIdAndDelete(req.params.id);
            res.status(200).json({message:'la reserva fue cancelada',Reserva: eliminarReserva})
        }catch(e){
            res.status(500).json({message:' error en cancelar la reserca', error:e.message})
        }
    }

    


}

export default new reservasController();