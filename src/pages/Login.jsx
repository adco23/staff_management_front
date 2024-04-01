import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import API from "../api/axios";
import { Messages } from "../utils/constants";
import AlertContainer from "../components/AlertContainer";
import SuccessAccess from "../components/SuccessAccess";

const LOGIN_URL = '/auth/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [ email, setEmail ] = useState('');  
  const [ pwd, setPwd ] = useState('');
  const [ errMsg, setErrMsg ] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(LOGIN_URL, { email, password: pwd }, { headers: { 'Content-Type': 'application/json' }});

      // TODO: eliminar log
      console.log(JSON.stringify(res?.data, null, 2));

      const accessToken = res?.data?.jwt;
      const roles = res?.data?.roles;

      setAuth({ email, pwd, accessToken, roles });

      setEmail('');
      setPwd('');

      navigate(from, { replace: true });
    } catch (err) {
      // TODO: eliminar log
      console.log(err?.response.data.message);
      if(!err?.response) { setErrMsg(Messages.NO_SERVER_RESPONSE) }
      else if(err.response?.data) { setErrMsg(err.response?.data.message) }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-4">
    
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-8 items-center">

        <h1>Iniciar sesión</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">

          <label htmlFor="email-input" className="signUp-input">
            <FontAwesomeIcon icon={faEnvelope} className="text-lg text-gray-400" />
            <input
              type="email"
              id="email-input"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              ref={emailRef}
              placeholder="Correo"
              required
              autoComplete="off"
              className="w-full bg-white outline-none"
            />
          </label>
          <label htmlFor="pwd-input" className="signUp-input">
            <FontAwesomeIcon icon={faKey} className="text-lg text-gray-400" />
            <input
              type="password"
              name="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              id="pwd-input"
              placeholder="Contraseña"
              required
              className="w-full bg-white outline-none"
            />
          </label>

          <button type="submit" disabled={!email && !pwd ? true : false} className="btn-form">Iniciar sesión</button>
        </form>
        <p>
          ¿No tiene una cuenta? <span><Link to="/register">Registro</Link></span>
        </p>
        { errMsg ? <AlertContainer ref={errRef} type="error" message={errMsg}/> : false }
      </div>
    </section>
  );
};

export default Login;
