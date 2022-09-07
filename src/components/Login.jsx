// Librerias
import axios from 'axios';  // para comunicarme con la api
import swAlert from '@sweetalert/with-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';    // para cambiar de Router component


function Login() {

    const navigate = useNavigate(); // uso esto para incertar en la url nueva direccion

    // controla el envio del formulario, tengo que evitar reload y chequear validez de datos
    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target .email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === '' | password === '') {
            swAlert(<h2>Ninguno de los campos puede estar vacio</h2>);
            return
        } 
        if (!regexEmail.test(email)) {
            swAlert(<h2>Direcccion de correo electronico invalida</h2>);
            return
        }
        if (email !== 'challenge@alkemy.org' | password !== 'react') {
            swAlert(<h2>Credenciales invalidas</h2>);
            return
        }
        // axios en post usa (<url de la api>, <objeto con info a enviar>)
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            //recibe una rta
            .then(res => {
                swAlert(<h2>Perfecto! Ingresaste sin problemas</h2>);
                const tokenRecibido = res.data.token; // obtengo el token de autenticacion de user
                sessionStorage.setItem('token', tokenRecibido);   // guardo el token en el storage de la web como ('<nombre>', <valor>)
                //session solo puede guardar strings, si tengo un array, object --> stringify y viceversa
                navigate('/listado');
            })        
    };



        // para bloquear el acceso sin estar loggeado anteriormente, redirige a home
        let token = sessionStorage.getItem('token');


    return (
        <>  
            {token && <Navigate to='/listado'/>}
            <div className='container'>
                <h2>Formulario de Login</h2>
                <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>

    )
}

export default Login;