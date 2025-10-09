console.log("EJERCICIO1 :)")

function factorialRecursivo(n: number): number {
    // Tu código aquí
    //Ej1
    //Escribe una función recursiva llamada factorialRecursivo que tome un número entero no negativo 
    //como argumento y devuelva su factorial. No puedes utilizar bucles (for, while). 

    //Tenemos en cuenta el caso de que sea cero y su factorial
    if(n==0)
    {
        return 1;
    }

    //Tenemos en cuenta el caso de que sea negativo y lo avisamos por pantalla
    if(n<0)
    {
        console.log("ERROR, un numero negativo no puede tener factorial");
        return 0;
    }

    return n*factorialRecursivo(n-1);

}
 
// Ejemplo de uso:
const numero = 5;
const resultadoFactorial = factorialRecursivo(numero);
console.log(`El factorial de ${numero} es: ${resultadoFactorial}`); // Debería imprimir 120

console.log("EJERCICIO2");

//Escribe una función llamada agruparPeliculasPorGenero que tome un array de 
// objetos representando películas (con propiedades como id, title, genre_ids) y 
// devuelva un objeto donde las claves sean los IDs de género y los valores sean 
// arrays de títulos de películas pertenecientes a ese género.

interface Pelicula {
  id: number;
  title: string;
  genre_ids: number[]; // Array de IDs de géneros
}
 
function agruparPeliculasPorGenero(peliculas: Pelicula[]): { [key: number]: string[] } 
{
    //Tu código aquí

    //la key sera el numero del genero y en el array de string estaran los titulos correspondientes
    return peliculas.reduce((_resultado: { [key: number]: string[] }, _pelicula) => 
    {
        //Recorremos todos los generos de nuestras  pelis para comprobar cada una
        _pelicula.genre_ids.forEach((_generoId) => 
        {
            //Aqui miramos si ya existe ese genero y si no lo tiene creamos 
            //un hueco para el y los que vangan detras
            if (!_resultado[_generoId]) {
                _resultado[_generoId] = [];
            }

            //Metemos tambien el titulo de la pelicula para guardarlo con el genero
            _resultado[_generoId].push(_pelicula.title);
        });

    return _resultado;
    //Aqui abajo esta el valor inicial del acumulador, en este caso estara vacio por defecto
}, {});
}

//Ejemplo de uso (puedes crear un array de películas de prueba):
const peliculasDePrueba = [
    { id: 1, title: "Spiderman", genre_ids: [28, 35] },
    { id: 2, title: "Club de la Lucha", genre_ids: [10749] },
    { id: 3, title: "Cars", genre_ids: [28] }
];
 
const peliculasAgrupadas = agruparPeliculasPorGenero(peliculasDePrueba);
console.log(peliculasAgrupadas); 
// Debería imprimir un objeto con los géneros como claves y arrays de títulos como valores

console.log("EJERCICIO3");

async function obtenerTitulosDePosts(): Promise<string[]> {
  // Tu código aquí

  try 
  {
    //Llamar a la api con el fetch
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");

    //Verificar que todo es  la respuesta correcta y si no lanzamos el error
    if (!respuesta.ok) {
      throw (`ERRROR! ${respuesta.status}`);
    }

    //Convertirlo en formato JSON
    const datos = await respuesta.json();

    //Pillar solo los post
    const titulos = datos.map((post: { title: string }) => post.title);

    return titulos;

  } catch (error) 
  {
    throw (`No se pudieron obtener los títulos: ${error}`);
  }
}
 
// Ejemplo de uso:
obtenerTitulosDePosts()
  .then(titulos => {
    console.log(`Títulos de los posts: ${titulos}`);
  })
  .catch(error => {
    console.error(`Error al obtener los títulos: ${error}`);
  });
 
// Ejemplo con async/await (opcional, para practicar):
async function ejecutarObtenerTitulos() {
  try {
    const titulos = await obtenerTitulosDePosts();
    console.log(`Títulos de los posts (con async/await): ${titulos}`);
    console.log("FIN DE PROGRAMA :)");
  } catch (error) {
    console.error(`Error al obtener los títulos (con async/await): ${error}`);
  }
}
 
ejecutarObtenerTitulos();