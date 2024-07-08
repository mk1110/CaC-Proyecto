// const API_MOVIES = 'https://api.themoviedb.org/3/movie/popular'
const API_PINTURERIA = 'http://localhost:5502/producto'
import { API_PINTURERIA  } from './config.js'

const options = {
    method: 'GET', 
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTI2ZDgzMDU2NjMzNmJhNmU4Mzc2NGIyZjZiZmI2MSIsInN1YiI6IjY1Y2U2NDA0MTNhMzg4MDE4NzlmNjBmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZTxSjr1fLqIi2LSwadmPT37grY2IF6y3d4LUHLbEmE'
    }
}

const obtenerProductos = async () => {
    const resultado = await fetch(`${ API_PINTURERIA}/producto`, options)
    const data = await resultado.json()

    const productos = data
    console.log(productos)
     // Seleccionar el contenedor donde se mostrarán los productos
    let divContenedor = document.querySelector('.contenedor')

    // Iterar sobre cada producto y crear su elemento HTML
    for (let i = 0; i < productos.length; i++) {
        // Crear el HTML para el producto actual
        const ProductoInsertar =`
          <div class="contenedor">
            
                <img src="${API_PINTURERIA }./img/${productos[i].poster_url}"  alt="" class="detail-img">
                <div class="product-detail">
                    <a href="./templates/alba.html" ><p class="product-text" >${productos[i].nombre}</p><p class="product-text">${productos[i].precio}</p></a> 
                </div>
            </div>
           `  
        // Insertar el HTML de los productos en el contenedor
        divContenedor.insertAdjacentHTML('beforeend', ProductoInsertar)
    }
    if (productos.length === 0) {
        divContenedor.insertAdjacentHTML('beforeend', "<p>No hay productos en el sistema 😮</p>")
    }
}

//ESTO LO COPIE PORQUE NO ME ACUERDO SI TAMBIEN VA, LO DEJO ASI DESPUES SE MODIFICA SI LO NECESITAMOS
obtenerPelis()

/*
const agregarPeli = async (newMovie) => {
    const response = await fetch(API_MOVIES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            
        },
        body: JSON.stringify(newMovie)
    });

    const data = await response.json();
    console.log('New Movie Added:', data);
};

// Ejemplo de cómo llamar a agregarPeli con una nueva película
const nuevaPeli = {
    id:120,
    title: "Test",
    release_year: 2010,
    adult: false
};

agregarPeli(nuevaPeli); // Llama para agregar una nueva película
*/
