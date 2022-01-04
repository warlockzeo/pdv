import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login as S } from './styles';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState('');

  const isLogged = useSelector((state) => state?.pdv?.logged);

  const fetchLogin = async (actualLogin, actualPassword) => {
    let resp;

    await fetch(`${process.env.REACT_APP_URLBASEAPI}fazerlogin`, {
      method: 'POST',
      body: JSON.stringify({
        login: actualLogin,
        password: actualPassword
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resp = responseJson.message;
      });

    return resp;
  };

  const handleLogin = async () => {
    setLogging(true);
    if (login && password) {
      setError('');
      const respFetch = await fetchLogin(login, password);

      if (respFetch === 'ok') {
        sessionStorage.setItem('login', JSON.stringify(true));
        setLogged(true);
      } else {
        setError('Usuário ou senha inválidos');
      }
    } else {
      setError('Usuario e/ou senha não informados');
    }
    setTimeout(() => setLogging(false), 3000);
  };

  useEffect(() => {
    setLogin('');
    setPassword('');
    setLogged(false);
    sessionStorage.removeItem('login');
  }, []);

  return (
    <S.wrap>
      {logged ? (
        <Navigate to="/" />
      ) : logging ? (
        <div>Logando...</div>
      ) : (
        <>
          {error && <S.error>{error}</S.error>}
          <S.input
            type="text"
            placeholder="Login"
            onChange={(e) => setLogin(e.currentTarget.value)}
          />
          <S.input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <S.button
            className="btn btn-success form-control"
            onClick={handleLogin}>
            Efetuar Login
          </S.button>
        </>
      )}
    </S.wrap>
  );
};

export default Login;
