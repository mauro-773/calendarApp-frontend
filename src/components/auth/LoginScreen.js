import './LoginScreen.css';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import {
   startLoginAction,
   startRegisterAction,
} from '../../actions/authActions';
import Swal from 'sweetalert2';

const LoginScreen = () => {
   const dispatch = useDispatch();

   const [formLoginValues, handleLoginInputChange] = useForm({
      lEmail: '',
      lPassword: '',
   });
   const { lEmail, lPassword } = formLoginValues;

   const [formRegisterValues, handleRegisterInputChange] = useForm({
      rName: 'Test 2',
      rEmail: 'correo@correo.com',
      rPassword: '123456',
      rPassword2: '123456',
   });
   const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

   const handleLogin = (e) => {
      e.preventDefault();
      dispatch(startLoginAction(lEmail, lPassword));
   };

   const handleRegister = (e) => {
      e.preventDefault();
      if (rPassword !== rPassword2) {
         return Swal.fire(
            'Error',
            'Las contraseñas deben ser iguales',
            'error'
         );
      }
      dispatch(startRegisterAction(rName, rEmail, rPassword));
   };

   return (
      <div className="container login-container">
         <div className="row">
            <div className="col-md-6 login-form-1">
               <h3>Ingreso</h3>
               <form onSubmit={handleLogin}>
                  <div className="form-group">
                     <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="lEmail"
                        value={lEmail}
                        onChange={handleLoginInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="lPassword"
                        value={lPassword}
                        onChange={handleLoginInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input type="submit" className="btnSubmit" value="Login" />
                  </div>
               </form>
            </div>

            <div className="col-md-6 login-form-2">
               <h3>Registro</h3>
               <form onSubmit={handleRegister}>
                  <div className="form-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="rName"
                        value={rName}
                        onChange={handleRegisterInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="rEmail"
                        value={rEmail}
                        onChange={handleRegisterInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="rPassword"
                        value={rPassword}
                        onChange={handleRegisterInputChange}
                     />
                  </div>

                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name="rPassword2"
                        value={rPassword2}
                        onChange={handleRegisterInputChange}
                     />
                  </div>

                  <div className="form-group">
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta"
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default LoginScreen;
