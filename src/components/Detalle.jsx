// Librerias
import axios from 'axios';  // para comunicarme con la api
import { Navigate } from "react-router-dom";
import swAlert from '@sweetalert/with-react';   // para mostrar cartel en caso de errores

// Hooks
import { useEffect, useState } from "react";


function Detalle() {
    

    const [movie, setMovie] = useState(null);
    // para bloquear el acceso sin estar loggeado anteriormente, redirige a home
    let token = sessionStorage.getItem('token');
    


    // obtengo MovieID de la url
    let query = new URLSearchParams(window.location.search);    //  importante que no se importe xq ya no se necesita importar
    let movieID = query.get('movieID');

    
    //  traigo la info de la movie para renderizar
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=a64cfcd10d397946056ff9c503e2d056&language=es-ES`;
        axios.get(endPoint)
            .then(response => {
                const movieData = response.data;  // api devuelve respuesta dentro de "data"
                setMovie(movieData);
            })
            .catch(error => {   // para visualizar errores en la consola y manjearlos con un mensaje
                console.log(error);
                swAlert(<h2>Hubieron errores al ver detalle movies, por favor reintentar</h2>);
            })
    }, [movieID]);
    


    

    return (
        <>
            {!token && <Navigate to='/'/>}
            {!movie && <p className='container'>Cargando...</p>}    {/*aparece mientras useEffect conecta con api*/}
            {movie && 
                <>
                    <div className="row container">
                    <h2>Titulo: {movie.title}</h2>
                        <div className="col-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster"/>
                        </div>
                        <div className="col-8">
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Rating: {movie.vote_average}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Generos:</h5>
                            <ul>
                                {movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>}
        </>
    );
}

export default Detalle;