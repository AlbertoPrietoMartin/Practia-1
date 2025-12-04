// Express 
import express from "express"; //framework para crear servers http
import cors from "cors"; //middleware que permite peticiones desde otros dominios

const app = express(); //crea la aplicación
const port = 3000; //define el puerto donde se escucharan las peticiones
app.use(cors()); //habilita cors
app.use(express.json()); //permite que express entienda cuerpos JSON

type Persona = {
    id: number,
    name: string,
    lastName: string,
}

let personas:Persona[]=[
    {id: 1,
    name: "Alberto",
    lastName: "Prieto",
    },

    {id: 2,
    name: "Javier",
    lastName: "aaaaa",
    }
]

//prueba de vida del servidor
app.get("/", (req, res) => {
    res.send("Te has conectado!, esto funciona");
});

//inicio de la app
app.listen(port, () => {
    console.log("Ey, esto funciona y estás en el puerto: " + port);
});

//devuelve el array
app.get("personas", (req,res)=>{
    res.json(personas);
})

//sacas el parametro patata de URL
app.get("personas/:patata", (req,res)=>{

    //lo convierte a un numero
    const idParams = req.params.patata;

    //convierte el parametro de la URL de string a numero
    const realId = Number(idParams)

    //busca una persona con ese id en el array y si exite dvuelve el json
    //si no, responde 404
    //lo que ocurre si es true entr ? y : y lo que ocurre si es false tras el :
    const buscao = personas.find((elem)=> elem.id ===realId)
        buscao ? res.json(buscao) : res.status(404).json({
            error: "Dicha persona no existe"
        });
});

app.post("/personas", (req, res)=>{

    //obtener el ultimo elemento del array
    //aqui la ? sirve para acceder a una propiedad solo si el objeto existe, si no, devuelve undefined
    const lastID = personas.at(-1)?.id; 
    const newID = lastID ? lastID+1 : 0;

    //el cuerpo de la petición (la información que envía el cliente en un POST o PUT)
    const newName= req.body.name;
    const newLastName = req.body.lastName;

    const newPersona: Persona = {
        id: newID,
        name: req.body.name,
        lastName: req.body.lastName,
    }

    if(newName && newLastName && typeof(newName=="string") && typeof(newLastName=="string")){
        personas.push(req.body);
        res.status(201).json(req.body);
    }else{
        res.status(404).send("Wrong body for person creation")
    }

})

app.put("/persons/:id", (req, res)=>{
    //es un objeto que contiene los parámetros de la URL
    //(es decir, los valores que vienen dentro de la ruta).
    const id = Number(req.params.id);//convierte el id a numero
    //uso map para crear un nuevo array actualizando solo el elemento que coincide con el id
    //... para sobreescribir los campos
    personas = personas.map((elem)=> id == elem.id? {...elem, ...req.body}: elem ); 
    res.status(202).send("Personaje Modificado")//mensaje de confirmacion 202
})

app.delete("/persons/:id", (req, res)=>{
    //filtro para eliminar el elemento con id indicado
    personas = personas.filter((elem) => elem.id !== Number (req.params.id));
    res.status(204).send("Personaje Eliminado")//devuelvo 2004
})