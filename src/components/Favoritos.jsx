// Hooks
import { useState, useEffect } from "react";

// Librerias
import { Navigate, Link } from 'react-router-dom';



function Favoritos(props) {

    // para bloquear el acceso sin estar loggeado anteriormente, redirige a home
    let token = sessionStorage.getItem('token');


    /*
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
    */



    return (
        <>
            {!token && <Navigate to='/'/>}  {/*si tengo el token muestro la pag y sino redirecciono*/}

            <div className='container'>
                <h2>Seccion de Favoritos: </h2>
                {props.favorites.length === 0 && <h1>No tienes favoritos</h1>}    
                <div className='row'>
                    {/* Estructura cards */}
                    {props.favorites.map((oneMovie, idx) => { {/* IMPORTANTE: ya no llamo a api sino que comunico con localstorage, x eso img no funca sin nuevo 'src' */}
                        return (
                            <div className="col-3" key={idx}>
                                <div className="card my-4"> {/* margen de bootstrap */}
                                <img src={oneMovie.imgURL} className="card-img-top" alt="..."/>
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

export default Favoritos;