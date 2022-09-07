// Hooks
import { useState, useEffect } from "react";

// Librerias
import axios from 'axios'; 
import swAlert from "@sweetalert/with-react";
import { Navigate, Link, useParams } from 'react-router-dom'; 


function Resultados(props) {

    // para bloquear el acceso sin estar loggeado anteriormente, redirige a home
    let token = sessionStorage.getItem('token');



    // obtengo el KEYWORD del buscador desde la url
    let query = new URLSearchParams(window.location.search);    //  importante que no se importe xq ya no se necesita importar
    let keyword = query.get('keyword');

    // supuestamente obtiene lo que varia en la url, el keyword en este caso
    const { params } = useParams(); // Si lo sacono funca pero ni lo llamo!!!!!

    //  traigo las peliculas y las cargo para mostrar
    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(() => {
        // en el link cambie el idioma "en-US" --> "es-ES" y agregue mi key en el llamado
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=a64cfcd10d397946056ff9c503e2d056&language=es-ES&query=${keyword}`;
        axios.get(endPoint)
            .then(response => {
                const moviesArray = response.data.results;  // api devuelve respuesta dentro de "data"
                
                // en caso de no resultados
                if(moviesArray.length === 0) {
                    swAlert(<h2>No hay resultados que coincidan con tu busqueda</h2>);
                };
                setMoviesResults(moviesArray);
            })

            .catch(error => {   // para visualizar errores en la consola y manjearlos con un mensaje
                console.log(error);
                swAlert(<h2>Hubieron errores</h2>);
            });
        console.log(keyword);   // se ejecuta cada vez que pongo algo nuevo en en el buscador
            
    }, [keyword]);



    return (
        <>
            {!token && <Navigate to='/'/>}  {/*si tengo el token muestro la pag y sino redirecciono*/}
            <h2>Buscaste: <em>{keyword}</em></h2>
            {moviesResults.length === 0 && <div className="container mt-5"><h1>No hay resultados</h1></div>}
            <div className='container'>    
                <div className='row'>
                    {/* Estructura cards */}
                    {moviesResults.map((oneMovie, idx) => {
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
    );
}

export default Resultados;