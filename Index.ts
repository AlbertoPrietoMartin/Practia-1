import axios from "axios"
import express from "express"
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

type Team = {

 id: number

 name: string

 city: string

 titles: number

}

let teams: Team[] = [

 { id: 1, name: "Lakers", city: "Los Angeles", titles: 17 },

 { id: 2, name: "Celtics", city: "Boston", titles: 17 },

];

//req  es "request" la informacion del cliente
//y res es "response" informacion que vamos a devolverle al cliente
app.get("/", (req, res) => {
    res.send("Te has conectado!, esto funciona");
});

app.listen(port, () => {
    console.log("Ey, esto funciona y estás en el puerto: " + port);
});

//devolvemos el array PRIMER GET
app.get("/teams", (req,res)=>{
    res.json(teams);
})

//comprobamos si encontramos
app.get("/teams/:id", (req,res)=>{
    const idParams = req.params.id;
    const realId = Number(idParams)
    const buscao = teams.find((elem)=> elem.id ===realId)
        
        buscao ? res.json(buscao) : res.status(404).json({
            error: "Equipo no encontrado"
        });
});

app.post("/teams", (req, res)=>{

    const lastID = teams.at(-1)?.id; 
    //const newID = lastID ? lastID+1 : 0;

    const newID = Date.now();

    const newName= req.body.name;
    const newCity = req.body.city;
    const newTitles = req.body.titles;

    const newTeam: Team = {
        id: newID,
        name: req.body.name,
        city: req.body.city,
        titles: req.body.titles,
    }

    if(newName && newCity && newTitles && typeof(newName=="string") && typeof(newCity=="string") && typeof(newTitles=="number")){
        //teams.push(req.body);
        teams.push(newTeam);
        res.status(201).json(req.body);
    }else{
        res.status(404).send("Wrong body for teams creation")
    }

})

app.delete("/teams/:id", (req, res)=>{
    teams = teams.filter((elem) => elem.id !== Number (req.params.id));
    res.status(204).send("Team Eliminado")
})

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

//parte dos
const testAPI = async()=>{

    //obtener todos los equipos de la lista
    const miPromesa = (await(axios.get<Team[]>("http://localhost:3000/teams/"))).data;
    console.log(miPromesa);

    //crear un nuevo equipo
    const miEquipo : Team = {
        id: 1, 
        name: "asasasa", 
        city: "miami", 
        titles: 111 ,
    }

    axios.post(`http://localhost:3000/teams/`, miEquipo);

    //volver a comprobar todos los equipos y comprobar que salen los nuevos
    const miPromesa2 = (await(axios.get<Team[]>("http://localhost:3000/teams/"))).data;
    console.log(miPromesa2);

    const condicion = miPromesa2.find((elem)=>{
        if(elem.name === miEquipo.name){
            return elem;
        }
    })

    const miPromesa3 = (await (axios.delete<Team>(`http://localhost:3000/teams/${condicion?.id}`))).data;
    console.log(miPromesa3);
}

setTimeout((testAPI), 1000);