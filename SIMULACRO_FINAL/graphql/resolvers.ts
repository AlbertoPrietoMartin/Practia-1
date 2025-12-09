import { IResolvers } from "@graphql-tools/utils";
import { buyRopita, createUser, validateUser } from "../collections/userRopitaDeFuencarral";
import { signToken } from "../auth";
import { validate } from "graphql";
import { createRopita, getRopasFromIDs, getRopita } from "../collections/dichaRopitadeFuencarral";
import { getDB } from "../db/db";

export const resolvers: IResolvers = {
    
    Query: {
        clothes: async(_, {page, size})=>{
            return await getRopita(page,size);
        },

        clothing: async(_, {id})=>{
            return await getRopita(id);
        },

        me: async (_, __, {user})=>{
            if(!user) throw new Error("Logeate o na de na");

            return {
                _id: user._id.toString(),
                ...user
            }
        }
    },

    User:{
        clothes:async (parent)=>{
            return await getRopasFromIDs(parent.clothes);
        }
    },

    Mutation: {
        register: async(_, {email, password})=>{
            const idDelClienteCreado = await createUser(email, password);
            return signToken(idDelClienteCreado);
        },

        login: async(_, {email,password})=>{
            const user = await validateUser(email, password);
            if(!user) throw new Error("Bad credentials");
            
            return signToken(user._id.toString());
        },

        addClothing: async(_, {name, size, color, price}, {user})=>{
            if(!user) throw new Error ("Tienes que estar logueado ")
            const result = await createRopita(name, size, color, price);

            return result;
        },

        buyClothing: async (_, {clothingId}, {user})=>{
            if(!user) throw new Error ("Tienes que estar logeado para comprar ropa");

            return await buyRopita(clothingId, user._id);
        }

    }

}
