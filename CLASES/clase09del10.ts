import axios from "axios"

axios.get("https://rickandmortyapi.com/api/character/2").then((res) => {
    console.log(res.data);
})

const getCharacter = async (id: number) => {
    const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    return res.data
}

console.log(await getCharacter(1));

const getCharacterClassic = (id: number) => {
    return axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
        return res.data
    })
}

console.log(await getCharacterClassic(1));

const getCharactersProper = async (ids: number[]) => {
    try {
        const chars = ids.map(async (id) => {
                return (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data;
        });

        return await Promise.all(chars);
    } catch(err){
        if(axios.isAxiosError(err)){
            console.log("Error en la petición: " + err.message)
        } else {
            console.log("error general: " + err)
        }
    }
}
console.log( await getCharactersProper([1,2,3]));