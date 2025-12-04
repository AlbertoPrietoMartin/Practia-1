import { Router} from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import {getDB } from "../mongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

const router = Router();

const SECRET = process.env.SECRET;

type User = {
    _id?: ObjectId,
    email: string,
    password: string 
}

const coleccion = () => getDB().collection<User>("UserManana");

router.post("/register", async (req, res)=>{
    try{
        const {email, password} = req.body as User;

        const users = await coleccion();

        const existing = await users.findOne({email});

        if(existing){
            return res.status(404).json({message: "Ya existe un usuario con dicho email"});
        };
    //sirve para encriptar y elegir la "dificultad" de la encriptacion (max = 25)
        const passToEncripta = await bcrypt.hash(password, 10);
        await users.insertOne({email, password: passToEncripta});

        res.status(201).json({message: "Usuario creado chachipe"});

    }catch(err){
        res.status(500).json({message:err}) //500 es error de conexion
    }
});

router.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body as User;
        const users = await coleccion();

        const user = await users.findOne({email});
        if(!user){
            return res.status(404).json({message: "No existe ningun usuario con dicho email"});
        }

        const passEncriptarYSinEncriptarIguales = await bcrypt.compare(password, user.password);

        if(!passEncriptarYSinEncriptarIguales) return res.status(401).json({message: "Contraseña incorrecta"});

        const token = jwt.sign({id: user._id?.toString, email: user.email}, SECRET as string, {
            expiresIn: "1h"
        });

        res.json({message: "Login correct Maní", token});

    }catch(err){
        res.status(500).json({message:err});
    }
});

export default router;