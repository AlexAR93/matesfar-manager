
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { Link } from 'react-router-dom';
const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}


export const RegisterPage = () => {

    const { startRegister } = useAuthStore();

    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }
  return (
        <div className="login-container vh-100 d-flex align-items-center justify-content-center">
            <div className="login-form-2 w-75">
                <h3>Registro</h3>
                <form onSubmit={ registerSubmit }>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="registerName"
                            value={ registerName }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="registerEmail"
                            value={ registerEmail }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña" 
                            name="registerPassword"
                            value={ registerPassword }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña" 
                            name="registerPassword2"
                            value={ registerPassword2 }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Crear cuenta" />
                    </div>
                </form>
                <Link to="/auth/login">¿Tienes cuenta? - Ingresa</Link>
            </div>
    </div>
  )
}
