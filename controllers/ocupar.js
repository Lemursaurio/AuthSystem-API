import Reserva from '../models/reservas.js';
import Habitacion from "../models/habitaciones.js";


class ocuparController{
    constructor(){

    }
    
    async ocuparHabitacionDisponible(req,res){
        try{
            const {fecha_inicio,fecha_salida,habitacion}= req.body;
        
           // validar fechas coherentes

           if( new Date(fecha_inicio) >= new Date(fecha_salida)){
            return res.status(400).json({message:'la fecha de salida debe ser mayor'})
           }

           // validar que la habitacino este dispuesto en fechas ingresadas
        
           const horariosSolapa = await Reserva.find({
            Habitacion,
            estado: {$in:['RESERVADO','OCUPADO ']},
            $or:[
                {
                    fecha_inicio: { $lt: new Date(fecha_salida) }, 
                    fecha_salida: { $gt: new Date(fecha_inicio) }
                }
            ]
            });
          
            if(horariosSolapa.length > 0){
                return res.status(400).json({message:'horario no disponible'})
            }

            // ocupar una habitacion
            const ocuparHabitacion = new Reserva({habitacion, fecha_inicio, fecha_salida, estado:'OCUPADO',});
            await ocuparHabitacion.save();
            res.status(200).json({message:'se ocupo la habitacion'})
        }catch(e){
            res.status(500).json({message:'error en ocupar habitacion', error:e.message})
        }
    }

    async ocuparHabitacionRerservada(req,res){
        try{
            const validarReserva = await Reserva.findById(req.params.id);
            if(!validarReserva){
                return res.status(400).json({message:'no se encontro la reserva'})
            }

            //actualizar estado de reserva a ocupado
            validarReserva.estado = 'OCUPADO';
            await validarReserva.save();
            res.status(200).json({message:'se ocupo la reserva', Reserva: validarReserva});

        }catch(e){
            res.status(500).json({message:'error en ocupar reserva', error:e.message})

        }
    }

}

export default new ocuparController();