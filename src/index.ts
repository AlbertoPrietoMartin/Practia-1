import { connectToMongoDB } from "./mongo";//conectar visual con la base de datos MongoDB
import express from "express";
import rutasAuth from "./routes/auth";
import dotenv from "dotenv";//para cargar las variables .env
import rutasPatata from "./routes/patata";

dotenv.config();//cargar las variables definidas del .env en el proyecto

connectToMongoDB();//lama la funcion que se conecta a mongo db
const app = express();
app.use(express.json());

app.use("/auth", rutasAuth);

app.listen(3000, ()=> console.log("El API comenzó en el puerto 3000"));