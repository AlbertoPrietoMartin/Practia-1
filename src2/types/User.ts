import {ObjectId} from "mongodb";

export type usersVideoGames = {
    _id: ObjectId;
    email: string;
    videoGameLibrary:string[];
}