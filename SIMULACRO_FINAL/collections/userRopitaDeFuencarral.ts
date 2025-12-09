import bcrypt from "bcryptjs";
import { getDB } from "../db/db";
import { CLOTHING_COLLECTION, USER_COLLECTION } from "../utils";
import { getRopitaPorID } from "./dichaRopitadeFuencarral";
import { ObjectId } from "mongodb";

export const createUser = async(email: string, passsword: string) =>{
    const db = getDB();
    const passwordEncriptaita = await bcrypt.hash(passsword, 10);

    const result = await db.collection(USER_COLLECTION).insertOne({
        email,
        password: passwordEncriptaita,
        clothes: []
    });

    return result.insertedId.toString();

}

export const validateUser = async(email:string, password: string)=>{
    const db =getDB();

    const user = await db.collection(USER_COLLECTION).findOne({email});
    if(!user) return null;

    const passComparada = await bcrypt.compare(password, user.password);
    if(!passComparada) throw new Error ("Contraseña mal mani");

    return user;
}

export const buyRopita = async(idDeRopa: string, userId:string)=>{
    const db = getDB();
    const ropitaAnadir = await getRopitaPorID(idDeRopa);

    if(!ropitaAnadir) return new Error ("Tal ropa no existe");

    await db.collection(USER_COLLECTION).updateOne({_id: new ObjectId(userId)}, {
        $addToSet: {clothes: idDeRopa}
    });

    const updateUser = await db.collection(USER_COLLECTION).findOne({_id: new ObjectId(userId)});
    return updateUser;
}