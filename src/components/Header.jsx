import { Link } from 'react-router-dom';

// componentes
import Buscador from './Buscador';


function Header(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light" style={{marginBottom: '30px'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">AlkeFlix</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/listado">Listado</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contacto">Contacto</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/favoritos">Favoritos</Link>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <span className='text-success'>{`(${props.favorites.length})`}</span>
                    </li>
                </ul>
                </div>
                <Buscador />
            </div>
            </nav>
        </>
    )
};

export default Header;