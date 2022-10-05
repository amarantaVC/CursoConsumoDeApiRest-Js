
//aqui creamos una instancia de axios
const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});

//con esto podemor alterar las instancias creadas por defaults de axios
api.defaults.headers.common['X-API-KEY'] = 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN'

//Copiamos la ruta de donde saldran los gatitos
const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
//como la api para sacar michis de favoritos es un endpoint dinamico entonces trabajamos la url como una arronw function y le agregamos el id que es lo dinamico, dde esta manera:
const API_URL_DELETE_FAVORITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}`

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
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        //aqui hacemos la conexion total entre la url de los gatitos para que se vean en el html
        img1.src = data[0].url;
        img2.src = data[1].url;
        // con esto guardamos uno solo de los gatos que tenemos en favoritos y evitar que se guarden los dos
        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}

async function loadFavouriteMichis(){
    //res llama a la URL DE fetch
    const res = await fetch(API_URL_FAVORITES, {
      method: 'GET',
      //estamos trabajando aqui usando headers authenticationf
      headers: {
        'X-API-KEY': 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN',
      },
    });
    //data llama a el json dela respuesta res
    const data = await res.json();
    console.log('favorites data')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      const section = document.getElementById('favoritesMichis')
      section.innerHTML = "";
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Michis favoritos');

      h2.appendChild(h2Text);
      section.appendChild(h2);
      //Aqui estamos manipulando el DOM, creando las constantes y luego manipulandolo
      data.forEach(michi => {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Sacar al michi de favoritos');

        img.src = michi.image.url
        img.width = 150;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavouriteMichi(michi.id);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);

      });
    }
}

async function saveFavouriteMichi(id) {
    //DE ESTA FORMA TRABAJAMOS CON AXIOS
    const {data, status} = await api.post('/favourites',{
      image_id: id,
    });



    //DE ESTA FORMA TRABAJAMOS CON FETCH
    // const res = await fetch(API_URL_FAVORITES, {
    //Aqui le enviamo el metodo que nosotro necesitamos para nuestra solicitud, por defecto si no enviamos nada sera un Get
        //hay que especificarlo manualmente
      // method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',

      //   'X-API-KEY': 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN',
      // },
       // por defecto siempre nos pide un header y un body, es decir la informacion como tal like en html
        //aqui colocamos cual es la imagen que queremos guardar en favorito
    //   body: JSON.stringify({
    //     image_id: id
    //   }),
    // });
    // const data = await res.json();


    if (status !== 200) {
      spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
      console.log('Michi Guardado en favoritos')
      loadFavouriteMichis();
    }
  }

async function deleteFavouriteMichi(id){
  const res = await fetch(API_URL_DELETE_FAVORITES(id), {
    //Aqui le enviamo el metodo que nosotro necesitamos para nuestra solicitud, por defecto si no enviamos nada sera un Get
        //hay que especificarlo manualmente
      method: 'DELETE',
      headers: {
        'X-API-KEY': 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN',
      },
    });
    const data = await res.json();

    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      console.log('michi eliminado de favoritos')
      loadFavouriteMichis();
      
    }
}

async function uploadMichiPhoto(){
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      //'Content-Type': 'multipart/form-data',
      'X-API-KEY': 'live_KnJzFbnChqNJHPlp0XlYIBqb8Xi6RonHByfVZdYI6zhtPxouuwNYhWuzuvEEPynN',
    },
    body: formData,
  })
  const data = await res.json();

  if (res.status !== 201){
    spanError.innerHTML = "Hubo un error:" + res.status + data.message;
  } else {
    console.log('foto de michi subida')
    console.log({data})
    console.log(data.url)
    saveFavouriteMichi(data.id);
  }
}


loadRandomMichis();
loadFavouriteMichis();
