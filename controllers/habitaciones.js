import Habitacion from "../models/habitaciones.js";
import habitacion from "../models/habitaciones.js";
import Reserva from "../models/reservas.js";
class HabitacionesController{
    constructor(){

    }

    async allHabitaciones(req,res){
        try{
            const habitaciones = await habitacion.find();
            res.status(200).json({message: 'getall-ok', habitaciones});
        }catch(e){
            res.status(500).json({message:"error al obtener habitaciones", error:e.message,stack: process.env.NODE_ENV === 'development' ? e.stack : undefined });
        }
    }

    async verHabitaciones(req,res){
        try{
            const buscarhabitacion = await habitacion.findById(req.params.id)   
            if(!buscarhabitacion) return res.status(404).json({message:'habitacion no encontrada'})    
                res.status(200).json({message:'habitacion encontrada', habitacion: buscarhabitacion})
        }catch(e){
            res.status(500).json({message:' error al obtener habitacion unica', error:e.message})
        }
    }
    
    async crearHabitaciones(req,res){
        try{
            const {numero, piso, tipo,precio, estado, camas, baños, tv, wifi, img }= req.body;
            const nuevaHabitacion = new habitacion({numero, piso, tipo,precio, estado, camas, baños, tv, wifi, img});
            await nuevaHabitacion.save();
            res.status(202).json({message: 'habitacion creada', habitacion: nuevaHabitacion});
        }catch(error){
            console.error("Error al crear habitación:", error); 
            res.status(500).json({
                message:'error al crear habitacion',
                error: error.message})
        }
    }

    async modificarHabitaciones(req,res){
        try{

        }catch(e){
            
        }
    }

    async elminarHabitaciones(req,res){
        try{
            const eliminarHabitacion = await habitacion.findByIdAndDelete(req.params.id);
            if(!eliminarHabitacion) return res.status(404).json({ message:'habitacion no ecnontrad' })
                res.status(200).json({message:'habitacion eleminada'})
        }catch(e){
            res.status(500).json({message:'error al elimnar habitacin', erroe:e.message})
        }
    }

    async disponibilidad(req,res){
        try{
            const { fecha_inicio, fecha_salida} = req.body;
            console.log("Fecha Inicio:", fecha_inicio);
            console.log("Fecha Salida:", fecha_salida);     
            // Verificar si las fechas son válidas
            if (!fecha_inicio || !fecha_salida || isNaN(Date.parse(fecha_inicio)) || isNaN(Date.parse(fecha_salida))) {
                return res.status(400).json({ message: 'Formato de fecha inválido. Usa YYYY-MM-DD' });
            }
        
            // convertir la el body en date
            const inicio = new Date(fecha_inicio);
            const salida = new Date(fecha_salida);

            console.log("Fecha Inicio (convertida):", inicio);
            console.log("Fecha Salida (convertida):", salida);
            // validar  fechas coherentes
            if( inicio >= salida){
                return res.status(400).json({message:' fechan incorrectas'})
            }
            // obtener todas la habitacione de la bd
            const habitaciones = await Habitacion.find();
            // creamos un arreglo donde guardar los disponibles
            const HabitacionesDisponibles = [];
            // ahora itermos y guadamos en arreglo las disponibles
            for (const habitacion of habitaciones){
                // buscar las que no solapen
                const reservadasYocupadas = await Reserva.find({
                    habitacion: habitacion._id,
                    estado: {$in:['RESERVADO','OCUPADO'] },
                    $or:[
                        {
                            fecha_inicio: { $lt: salida }, fecha_salida: { $gt: inicio },
                        }
                    ]
                });
                console.log(`Habitación ${habitacion.numero} - Reservadas/Ocupadas:`, reservadasYocupadas);

                if (reservadasYocupadas.length === 0){
                    HabitacionesDisponibles.push(habitacion);
                }
            }
            console.log("Habitaciones filtradas después de reservas:", HabitacionesDisponibles);

            res.status(200).json({message:'se obtuvo la lista', habitaciones: HabitacionesDisponibles})

        }catch(e){
            res.status(200).json({message:'error en obetner disposicion', error:e.message})
        }
    }

}
export default new HabitacionesController();