import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api/api'

const Cadastro = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <br />
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
        <p />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <p />
        <label htmlFor="password">Senha:</label>
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <p />
        <button type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default Cadastro
