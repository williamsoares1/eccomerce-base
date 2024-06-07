import './App.css'
import { ProdutoProvider } from './context/ProdutosContext'
import Produto from './components/Produto/Produto'
import { UserProvider } from './context/UsuarioContext'
import Usuario from './components/Usuario/Usuario'

function App() {
  return (
    <>
    <UserProvider>
      <Usuario/>
    </UserProvider>
    </>
  )
}

export default App