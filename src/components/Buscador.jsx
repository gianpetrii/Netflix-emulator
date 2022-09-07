import swAlert from "@sweetalert/with-react";
import { useNavigate } from 'react-router-dom';


function Buscador() {

    // declaro navigate para enviar a "resultados" luego de buscar
    const navigate = useNavigate();

    // manejo de formulario
    const submitHandler = e => {
        e.preventDefault();     // previene el refresh de la pagina
        const keyword = e.currentTarget.keyword.value.trim();    // me traigo la keyword

        if(keyword.length === 0) {
            swAlert(<h5>No puedes dejar el campo vacio</h5>);
        } else if(keyword.length < 4) {
            swAlert(<h5>Tenes que esccribir mas de 4 caracteres</h5>);
        } else {
            e.currentTarget.keyword.value = '';
            // limpio el casillero de la busqueda
            navigate(`/resultados?keyword=${keyword}`);
        }
    };





    return (
        <>
            <form className="d-flex align-items-center" onSubmit={submitHandler}>
                <label className="form-label mb-0 mx-2">
                <input type="text" name='keyword' className="form-control" placeholder="Search..."/>
                </label>
                <button type="submit" className="btn btn-success">Buscar</button>
            </form>
        </>
    );
}

export default Buscador;