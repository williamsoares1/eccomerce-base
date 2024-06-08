import './App.css'
import Routes from './Routes/Routes'
import { PedidoProvider } from './context/PedidoContext'
import { ProdutoProvider } from './context/ProdutosContext'
// import Pedido from './components/Pedidos/Pedido'
// import { PedidoProvider } from './context/PedidoContext'

function App() {
  return (
    <PedidoProvider>
      <ProdutoProvider>
        <Routes />
      </ProdutoProvider>
    </PedidoProvider>
  )
}

export default App