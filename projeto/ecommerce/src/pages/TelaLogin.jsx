import {useContext, useEffect, useState} from "react";
import '../styles/login.css';
import { UsuarioContext } from "../context/UsuarioContext";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TelaLogin = () => {
  const { campoEmail, senha, email, setSenha, setEmail, validacaoLogin, senhaConferida} = useContext(UsuarioContext)

  const { setUsuarioLogado } = useContext(AuthContext)

  const [loginEfetuado, setLoginEfetuado] = useState(false)

  const [campo , setCampo] = useState()

  // SE ERRAR A SENHA E DPS ACERTAR, CLIQUE NOVAMENTE NO LOGIN

  const validarSubmit = (e) => {
    e.preventDefault()
    validacaoLogin(email, senha)
    setLoginEfetuado(true)
  }

  useEffect(() => {
    if (loginEfetuado) {
      if (senhaConferida !== undefined) {

        if(senhaConferida){
          setUsuarioLogado(true)
          setCampo(<Redirect to={"/carrinho"} />)
        }else{
          setCampo(<h1>AAAAAA</h1>)
        }

        setLoginEfetuado(false);
      }
    }
  }, [senhaConferida, loginEfetuado]);

  return (
    <>
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
              {campoEmail}
          </div>
          <div className="login-form-group">
            <label className="senha-label" htmlFor="senha">Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              />
              {campo}
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </>
  )
}

export default TelaLogin