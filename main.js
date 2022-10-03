//Copiamos la ruta de donde saldran los gatitos
const API_KEY = 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN'
const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN'

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN'

const spanError = document.getElementById("error")
//fecth nos devuelve una promesa que podemos resolver con el metodo then

/*fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        //aqui hacemos la conexion total entre la url de los gatitos para que se vean en el html
        img.src = data[0].url;
   });*/

//respuesta del reto usando async await

async function loadRandomMichis(){
    //res llama a la URL DE fetch
    const res = await fetch(URL_RANDOM);
    //data llama a el json dela respuesta res
    const data = await res.json();
    console.log('random data')
    console.log(data)

    if (res.status !== 200 ) { 
        spanError.innerHTML = "Hubo un error:" + res.status;
    } else {
        // Document.querySelector() Devuelve el primer elemento del documento
        //que coincida con el grupo especificado de selectores.
        const img1 = document.getElementById('gato1');
        const img2 = document.getElementById('gato2');
        //aqui hacemos la conexion total entre la url de los gatitos para que se vean en el html
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

async function loadFavouriteMichis(){
    //res llama a la URL DE fetch
    const res = await fetch(API_URL_FAVORITES);
    //data llama a el json dela respuesta res
    const data = await res.json();
    console.log('favorites data')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
}

async function saveFavouriteMichis() {
    const res = await fetch(API_URL_FAVORITES, {
    //Aqui le enviamo el metodo que nosotro necesitamos para nuestra solicitud, por defecto si no enviamos nada sera un Get
        //hay que especificarlo manualmente
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       // por defecto siempre nos pide un header y un body, es decir la informacion como tal like en html
        //aqui colocamos cual es la imagen que queremos guardar en favorito
      body: JSON.stringify({
        image_id: '3ji'
      }),
    });
    const data = await res.json();

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
  }



loadRandomMichis();
loadFavouriteMichis();
