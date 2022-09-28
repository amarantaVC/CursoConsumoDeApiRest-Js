//Copiamos la ruta de donde saldran los gatitos
const API_KEY = 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN'
const URL = ['https://api.thecatapi.com/v1/images/search',
    '?limit=3',
    '&order=Asc',
    `&api_key=${API_KEY}`,
].join('');

//fecth nos devuelve una promesa que podemos resolver con el metodo then

/*fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        //aqui hacemos la conexion total entre la url de los gatitos para que se vean en el html
        img.src = data[0].url;
   });*/

//respuesta del reto usando async await

async function obtenerGatos(){
    //res llama a la URL DE fetch
    const res = await fetch(URL);
    //data llama a el json dela respuesta res
    const data = await res.json();
    console.log(data)
    // Document.querySelector() Devuelve el primer elemento del documento
    //que coincida con el grupo especificado de selectores.
    const img1 = document.getElementById('gato1');
    const img2 = document.getElementById('gato2');
    const img3 = document.getElementById('gato3');
    //aqui hacemos la conexion total entre la url de los gatitos para que se vean en el html
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}


obtenerGatos();