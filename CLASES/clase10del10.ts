import axios from "axios";

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

const getCharacterWithEpisodes = async (id: number): Promise<Character> => 
{
    const personaje = (await axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)).data;
    const miArrayDeEspisodios = personaje.episode.map(async(url)=>
    {
        const miPromesa = (await axios.get<Episode>(url as string)).data;
        return miPromesa;
    })
    
    const miArrayFinal = await Promise.all(miArrayDeEspisodios);

    return {
        ...personaje,
        episode: miArrayFinal,
    };
};

const miPersonaje = await getCharacterWithEpisodes(1)

console.log(miPersonaje);


