import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { Link } from 'react-router-dom';
const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}


export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }



    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }    
    }, [errorMessage])
    



    return (
        <div className="login-container vh-100 d-flex align-items-center justify-content-center">
            <div className="login-form-1 w-75">
                <h3>Ingreso</h3>
                <form onSubmit={ loginSubmit }>
                    <div className="form-group mb-2">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="loginEmail"
                            value={ loginEmail }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="loginPassword"
                            value={ loginPassword }
                            onChange={ onLoginInputChange }
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
                <Link to="/auth/register">¿No tienes cuenta? - Regístrate</Link>
            </div>
        </div>
    )
}