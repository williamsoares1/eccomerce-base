import {useContext, useState} from "react";
import '../styles/TelaLogin.css';
import { UsuarioContext } from "../context/UsuarioContext";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const TelaLogin = () => {
  const history = useHistory()

  const { senha, setSenha, email, setEmail, validacaoLogin, usuarioEncontrado, senhaConferida } = useContext(UsuarioContext)

  const validarSubmit = (e) => {
    e.preventDefault()
    validacaoLogin(email, senha)
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={validarSubmit}>
        <div className="login-form-group">
          <label className="login-label" htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label className="senha-label" htmlFor="senha">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};

export default TelaLogin;