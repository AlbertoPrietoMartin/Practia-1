import {Db, MongoClient} from "mongodb"; //dos clases importadas desde mongodb

let client: MongoClient;
let db: Db;

//se exporta una funcion asincrona que establece una conexion con mongo y devuelve una promesa vacia
export const connectToMongoDB = async (): Promise<void> => {
    try{
        const urlMongo = `mongodb+srv://Tito:Tito_Mongo@cluster0.1l3ckr6.mongodb.net/?appName=Cluster0`;

        //inicializa el cliente con la URL
        client = new MongoClient(urlMongo);
        
        //abre la conexion con el cluster
        await client.connect();
        
        //obtiene una referencia a la base de datos
        db = client.db("Mondongo");
        console.log("Conectado a mongo Maní!");

    }catch(err){
        console.error("Error al conectar a mongo");
        process.exit(1);
    }
}

//se exporta una instancia que devuelve la base de datos guardada en db
export const getDB = () :Db => db;