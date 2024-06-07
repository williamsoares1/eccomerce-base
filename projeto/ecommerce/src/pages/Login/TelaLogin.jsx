import {useState} from "react";
import './TelaLogin.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
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

export default Login;