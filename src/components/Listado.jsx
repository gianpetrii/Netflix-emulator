// librerias
import { Link, Navigate } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';   // para mostrar cartel en caso de errores
import axios from 'axios';  //para conectar a api de movies

// Hooks
import { useEffect, useState } from 'react';  // para mostrar las movies

// Estilos


function Listado(props) {   // en el argumento me traigo todo lo que quiero desde App

    // para bloquear el acceso sin estar loggeado anteriormente, redirige a home
    let token = sessionStorage.getItem('token');
    /*
    useEffect(() => {
        token = sessionStorage.getItem('token');
        if (token === null) {
            navigate('/');
        }
    }, []); //array vacio para que solo se ejecute una vez
    */



    //  traigo las peliculas y las cargo para mostrar
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        // en el link cambie el idioma "en-US" --> "es-ES" y agregue mi key en el llamado
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=a64cfcd10d397946056ff9c503e2d056&language=es-ES&page=1';
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;  // api devuelve respuesta dentro de "data"
                setMoviesList(apiData.results);
            })
            .catch(error => {   // para visualizar errores en la consola y manjearlos con un mensaje
                console.log(error);
                swAlert(<h2>Hubieron errores, por favor reintentar</h2>);
            })
    }, [setMoviesList]);
    



    return (
        <>  
            <div className='container'>
                {!token && <Navigate to='/'/>}  {/*si tengo el token muestro la pag y sino redirecciono*/}
                <div className='row'>
                    {/* Estructura cards */}
                    {moviesList.map((oneMovie, idx) => {
                        return (
                            <div className="col-3" key={idx}>
                                <div className="card my-4"> {/* margen de bootstrap */}
                                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
                                <button 
                                    onClick={props.addOrRemoveFromFavs} 
                                    className='favourite-btn'
                                    data-movie-id={oneMovie.id}
                                    >🖤</button>
                                <div className="card-body">
                                    <h5 className="card-title">{oneMovie.title.substring(0, 30)}</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0, 100)}...</p>
                                    {/* importante como mando id de peli seleccionada, el path funciona xq el link busca coincidencia inicial */}
                                    <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link> 
                                </div>
                                </div>
                            </div>
                        )
                    })
                    }

                </div>
            </div>
        </>
    )
};

export default Listado;