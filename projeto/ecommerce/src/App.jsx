import './App.css'
import Routes from './Routes/Routes'
import { ProdutoProvider } from './context/ProdutosContext'
// import Pedido from './components/Pedidos/Pedido'
// import { PedidoProvider } from './context/PedidoContext'

function App() {
  return (
    <ProdutoProvider>
      <Routes />
    </ProdutoProvider>
  )
}

export default App