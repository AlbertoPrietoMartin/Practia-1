import { format } from "path";
import { IResolvers } from "@graphql-tools/utils";
import { title } from "process";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/users";
import { signToken } from "../auth";
import { validate } from "graphql";

const COLLECTION = "VideoGames";

export const resolvers: IResolvers = {
    Query : {
        //busca y convierte todos los docs en arrays
        getVideoGames: async ()=>{
            const db = getDB();
            return db.collection(COLLECTION).find().toArray();
        },
        
        //devuelve un juego especifico segun su id
        getVideoGame: async (_, {_id}: {_id: string}) => {
            const db =getDB();
            return db. collection(COLLECTION).findOne({_id: new ObjectId(_id)});
        },
        
        //devuelve toda la info del usuario logueado, email e id
        //el segundo es dos _ porq no se puede repetir
        me: async(_, __, {user})=>{
            if(!user){
                return null;
            };

            return {
                id: user._id.toString(),
                email: user.email
            }
        }
    },


    Mutation: {
        //añades un juego y devuelves el Id de ese nuevo juego
        addVideoGame: async (_, {name,  releaseYear, platform}: {name: string, releaseYear: number, platform: string}) =>{
            const db = getDB();
            const result = await db.collection(COLLECTION). insertOne({
                name,
                releaseYear,
                platform
            });
            return {
                _id: result.insertedId, 
                name, 
                releaseYear,
                platform
            } 
        },
        
        //crea el usuario en la db y devuelve su Id
        register: async(_, {email, password}: {email:string, password: string})=>{
            const userId = await createUser(email,password);
            return signToken(userId);
        },

        //valida el email y la contraseña, devuelve un jwt
        login: async(_, {email, password}: {email:string, password: string})=>{
            const user = await validateUser(email, password);
            if(!user)
            {
                throw new Error("Esos credenciales te lo has inventao Paqui");
            }

            return signToken(user._id.toString());


        }
    }
}

/*
type Album = {
    id: string,
    title: string,
    artist: string,
    releaseDate: string,
    format?: string
};

const albums:Album[] = [
    {
        id:"1",
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        releaseDate: "1973-03-01",
        format: "Vinyl"
    },
    {
        id:"2",
        title: "Revolver",
        artist: "The Beatles",
        releaseDate: "1966-08-05",
        format: "CD"
    }
];



export const resolvers:IResolvers = {
    Query: {
        getAlbums:()=> albums,
        getAlbum: (_, {id}) => albums.find((x) => x.id === id)
    },

    Mutation: {
        addAlbum:(_, {title, artist, releaseDate, format})=>{
            const newAlbum ={
                id:String(albums.length + 1),
                title,
                artist,
                releaseDate,
                format
            };
            albums.push(newAlbum);
            return albums.find((x)=>(x.id === String(albums.length)));
        }
    }
}*/