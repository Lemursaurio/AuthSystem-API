import habitacion from "../models/habitaciones.js";

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

}
export default new HabitacionesController();