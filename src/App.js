//components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

//libraries
import { Route, Routes } from 'react-router-dom';

// Hooks
import { useEffect, useState } from "react";

//STyles
import './css/bootstrap.min.css';
import './css/App.css';




const App = () => {



    const addOrRemoveFromFavs = e => {  // me traigo el evento como parametro

        // veo si tengo ya favMovies, en caso que no inicio el array
        const favMovies = localStorage.getItem('favs'); // primero me traigo la info ya guardada
        let tempMoviesInFavs; 
        if(favMovies === null) {
            tempMoviesInFavs = [];  // creo array vacio
        } else {
            tempMoviesInFavs = JSON.parse(favMovies);   // si tengo algo lo convierto a JSON
        };

        console.log(tempMoviesInFavs);

        const btn = e.currentTarget;    // capturo boton de donde fue clickeado
        const dad = btn.parentElement;   //capturo el div entero de la card
        const imgURL = dad.querySelector('img').getAttribute('src');    //busco el tipo img en el div y copio el src
        const title = dad.querySelector('h5').innerText;    // trigo titulo
        const overview = dad.querySelector('p').innerText;  // traigo reseña
        //console.log(btn.dataset);   // IMPORTANTE uso esto para ver como react arma la data para poder llamarlo abajo corectamente
        
        const movieData = {
            imgURL, title, overview, //lo que esta pasando es que a imgURL se le asigna el valor de imgURL entonces usa el mismo nomhre 
            id: btn.dataset.movieId // me traigo el id que esta en el cart del button
        };


        // primero veo si la movieData ya esta en tempMoviesInFavs
        let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
            return oneMovie.id === movieData.id // si da undefinded no esta la peli, otra cosa es que esta
        });
        if (!movieIsInArray) {
            tempMoviesInFavs.push(movieData);    // incerto mi fav nuevo en el array
            // piso el array anterior con el nuevo que ya contiene el push
            localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
            setFavorites(tempMoviesInFavs);
            console.log('se agrego algo ');
        } else {    // para sacar movies de favs
            let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
                return oneMovie.id !== movieData.id //devuelve un array con todas las movies menos la de igula id   
            });
            tempMoviesInFavs = moviesLeft;  // nueva lista sin el eliminado
            localStorage.setItem('favs', JSON.stringify(moviesLeft));
            setFavorites(moviesLeft);
            console.log('se quito algo ');
        }





        
    };


    //pasaje a pagina favoritos de los favs
    // Traigo lista de favoritos y defino como mostrarla
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');
        
        // chequeo si hay algo en favs, si hay lo paso a JSON
        if(favsInLocal !== null) {
            const favsArray = JSON.parse(favsInLocal);
            setFavorites(favsArray);
        }

    }, []);


    return (
        <div>
            <Header favorites={favorites}/>

            <Routes className='container mt-3'>
                <Route path='/' element={<Login />} />
                {/* Abajo paso las "props" como argumento y la funcion a la izq el nombre con el que va a aparecer y a la der el nombre que tiene en App */}
                <Route path='/listado' element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} /> } />
                <Route path='/detalle' element={<Detalle />} />
                <Route path='/resultados' element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
                <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
                {/* IMPORTANTE: Si yo comparto una funcion y ejecuto, cuando hay un cambio de valores dentro de URL favortios
                no lo nota la propia pagina hasta refreshear. Si paso el resultado como prop entonces
                automaticamente se re-renderiza */}
            </Routes>

            <Footer />
        </div>
    );
}

export default App;

