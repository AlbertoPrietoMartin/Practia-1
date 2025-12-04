import { gql } from "apollo-server";

export const typeDefs = gql`

    type User {
        id: ID!,
        email: String!
    }

    type VideoGame {
        id: ID!
        name: String!
        plataform: String!
        releaseDate: String!
    }

    type Query {
        me: User,
        getVideoGames: [VideoGame!]!
        getVideoGame(_id:ID!):VideoGame
    }

    #add devuelve el objeto creado y login y register el token jwt
    type Mutation {
        addVideoGame(name: String!, releaseDate: Int!, plataform: String!): VideoGame!
        register(email:String!, password: String!): String!
        login(email:String!, password: String!): String!
    }

`;