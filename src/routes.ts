import { Router } from "express";//permite crear rutas del servidor principal
import { getDB } from "./mongo";//traemos la conexion a la base de datos de mongo.ts
import { ObjectId } from "mongodb";//convertir IDs que vienen en string a formato ObjetoId mongoDB

const router = Router();//para registrar los endpoints
const coleccion = () => getDB().collection("Mondongo");//devuelve la coleccion Mondongo

router.get('/', (req, res) => {
  res.send('Servidor del MegaMondongo funcionando :)');
});

router.get("/", async(req, res) =>{
    try{
        //const queryYear = req.query?.year;
        //const newer = req.query?.newer;
        //const publicationCountry = req?.query?.country;

        const page = Number(req.query?.page)||1;
        const limit = Number(req.query?.limit)||25;
        const skip = (page -1 )* limit;

        //toArray aqui convierte todos los documentos en arrays
        //const albums = await coleccion().find(publicationCountry  ? {year: {$gte : publicationCountry}} : {}).toArray();
        const albums = await coleccion().find().sort({ year: 1}).skip(skip).limit(limit).toArray();
        res.json(albums);
    }catch(err){
        res.status(404).json({error: "No hay maní"})
    }
}); 

router.post("/", async(req, res)=>{
    try{
        //insertamos un obj a la base de datos
        const result = await coleccion().insertOne(req.body);
        const idCreado = result.insertedId;
        //ej:
        const resultObject = await coleccion().findOne({_id : idCreado});
        res.status(201).json({
            mongoAck: result,
            mongoObject: resultObject,
        })
    }catch(err){
        res.status(404).json({error:"No has creado na"});
    }
})

router.post("/many", async(req, res)=>{
    try{
        const result = await coleccion().insertMany(req.body.albumbs);
        res.status(201).json(result);
    }catch(err){
        res.status(404).json({error: "No has creado na"})
    }
})

//parametro siempre string
router.get("/:id", async(req, res) =>{
    try{

        const album = await coleccion().findOne({_id :new ObjectId(req.params.id)});
        album ? res.json(album) : res.status(404).json({message : "No existe album con dicho id"})
    }catch(err){
        res.status(404).json({error: "La liste"})
    }
})

router.put("/:id", async(petision, respuesta)=>{
    try{
        const result = await coleccion().updateOne(
            {
                _id: new ObjectId(petision.params.id)
            },
            {
                $set: petision.body
            }
        );
        respuesta.json(result);
    }catch(err){
        respuesta.status(404).json({error: "No se acutalizo na"})
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const result = await coleccion().deleteOne({
            _id: new ObjectId(req.params.id)
        });

        result && res.status(204).json({message: "Objeto con id " + req.params.id+ " eliminado"});

    }catch(err){
        res.status(404).json({error: "nose elimino na de na"})
    }
})

export default router;