import { useState, useContext } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import api from '../api/api'
import { AuthContext } from "../context/AuthContext"
import "../styles/login_cadastro.css"

const Cadastro = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { usuarioLogado } = useContext(AuthContext);

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido')
      return
    }

    if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres')
      return
    }

    try {
      const { data: existingUsers } = await api.get('/users')
      const isEmailTaken = existingUsers.some(user => user.email == email)

      if (isEmailTaken) {
        alert('Email já cadastrado')
        return
      }

      const response = await api.post('/users', {
        nome: name,
        email: email,
        senha: password
      })

      console.log('Usuário cadastrado com sucesso:', response.data)

      setName('')
      setEmail('')
      setPassword('')

      if (response.status === 201) {
        history.push('/login')
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  return (
    <>
      <div className="login-cadastro-box">
  <h2>Cadastro</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">Nome:
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Informe seu nome: "
          required
        />
      </label>
    </div>
    <div>
      <label htmlFor="email">Email:
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Informe seu email: "
          required
        />
      </label>
    </div>
    <div className='box_senha'>
      <label htmlFor="password">Senha:
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Informe sua senha: "
          required
        />
      </label>
    </div>
    <div>
      <button className="btn_cadastro" type="submit">Cadastrar</button>
    </div>
  </form>
</div>

    </>
  )
}

export default Cadastro
