import axios from "axios";

const getCharacter =async(id:number)=>{
    const res=axios.get("https://rickandmortyapi.com/api/character");
    return res.data;
}

const getCharacterClasic =(id:number)=>{
    return axios.get("https://rickandmortyapi.com/api/character").then((res=>{
    return res.data;
    }))
}

getCharacterClasic(1).then((res)=>{
    console.log(res.data);
})

const getCharacterProper = async (ids:number[])=>{
    try
    {
        const chars = ids.map(async (id)=>{
        const personajes = (await axios.get<Character>(`https://rickandmortyapi.com/api/character/ ${id}`)).data;
        return personajes;
        });

            return await.Promise.all(chars);
    }catch(err)
    {
        if(axios.isAxiosError(err)){
            console.log("Error en la peticion " + err.message)
        }else{
            console.log("Error general: " + err)
        }
    }
};