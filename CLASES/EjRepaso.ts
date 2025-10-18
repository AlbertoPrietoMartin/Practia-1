//paso id de un episodio y con ello me dices cuantos hombre mujeres y otros hay

import axios from "axios"

type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[] | Episode [];
  url: string;
  created: string; 
};

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; 
  url: string;
  created: string; 
};

type Resultado = {
    Masculino: number,
    Femenino: number,
    Otros: number
}

const genGeneros = async(idEpi: number)=>
{
    const episodio : Episode = (await(axios.get(`https://rickandmortyapi.com/api/episode)${idEpi}`))).data;

    const misPersonajes = episodio.characters.map(async(n)=>
    {
        return (await(axios.get(n))).data.gender;
    });

    const arrayGeneros = await Promise.allSettled(misPersonajes);

    const resultado : Resultado = {
        Masculino: 0,
        Femenino: 0,
        Otros: 0
    };

    const arrayGeneros = await Promise.allSettled(misPersonajes)

    arrayGeneros.map(j)=>{
        
    }


} 