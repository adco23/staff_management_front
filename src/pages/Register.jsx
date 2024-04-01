import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import { Messages } from "../utils/constants";
import Tooltip from "../components/Tooltip";
import AlertContainer from "../components/AlertContainer";
import SuccessAccess from "../components/SuccessAccess";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;   TODO: descomentar la validación
const PWD_REGEX = /^[0-9]+$/; // TODO eliminar la validación
const REGISTER_URL = '/auth/sign-up';

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [ email, setEmail ] = useState('');
  const [ validEmail, setValidEmail ] = useState(false);
  const [ emailFocus, setEmailFocus ] = useState(false);
  
  const [ pwd, setPwd ] = useState('');
  const [ validPwd, setValidPwd ] = useState(false);
  const [ pwdFocus, setPwdFocus ] = useState(false);

  const [ matchPwd, setMatchPwd ] = useState('');
  const [ validMatchPwd, setValidMatchPwd ] = useState(false);
  const [ matchPwdFocus, setMatchPwdFocus ] = useState(false);

  const [ errMsg, setErrMsg ] = useState('');
  const [ success, setSuccess ] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatchPwd(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg(Messages.INVALID_ENTRY);
      return;
    }

    try {
      const res = await API.post(REGISTER_URL, { email, password: pwd }, { headers: { 'Content-Type': 'application/json' }});

      // TODO: eliminar log
      console.log(JSON.stringify(res?.data, null, 2));
      setSuccess(true);
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      // TODO: eliminar log
      console.log(err)
      if(!err?.response) { setErrMsg(Messages.NO_SERVER_RESPONSE) }
      else if(err.response?.data) { setErrMsg(err.response?.data.message) }
    }
  }  

  return (
    
    <section className="flex flex-col items-center justify-center px-6 py-4">
    {
      success
      ? <SuccessAccess />
      :
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-8 items-center">

        <h1>Crear cuenta</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">
          <label htmlFor="email-input" className={ emailFocus && email && !validEmail ? "signUp-input-error" : "signUp-input"}>
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
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="w-full bg-white outline-none"
            />
            { (emailFocus && email && !validEmail) && <AlertContainer type="error" message={Messages.PWD_IS_NOT_VALID} /> }
          </label>
          <label htmlFor="pwd-input" data-tip={Messages.PWD_REGEX} className={ pwdFocus && !validPwd ? "signUp-input-error tooltip tooltip-right" : "signUp-input tooltip tooltip-right"}>
            <FontAwesomeIcon icon={faKey} className="text-lg text-gray-400" />
            <input
              type="password"
              name="pwd"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              id="pwd-input"
              placeholder="Contraseña"
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="w-full bg-white outline-none"
            />
            { (pwdFocus && !validPwd) && <AlertContainer type="error" message={Messages.PWD_IS_NOT_VALID} />}
          </label>
          <label htmlFor="confirm-pwd-input" className={matchPwdFocus && !validMatchPwd ? "signUp-input-error" : "signUp-input"}>
            <FontAwesomeIcon icon={faKey} className="text-lg text-gray-400" />
            <input
              type="password"
              name="confirm-pwd"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              id="confirm-pwd-input"
              placeholder="Confirmar contraseña"
              required
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              className="w-full bg-white outline-none"
            />
            { (matchPwdFocus && !validMatchPwd) && <AlertContainer type="error" message={Messages.PWD_MATCH_INVALID} />}
          </label>

          <button type="submit" disabled={!validEmail || !validPwd || !validMatchPwd ? true : false} className="btn-form">Registrarse</button>
        </form>
        <p>
          ¿Ya está registrado? <span><a href="/login">Iniciar sesión</a></span>
        </p>
        { errMsg ? <AlertContainer ref={errRef} type="error" message={errMsg}/> : false }
      </div>
    }
    </section>
  );
};

export default Register;
