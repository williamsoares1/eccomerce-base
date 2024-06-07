import './App.css'
import Pedido from './components/Pedidos/Pedido'
import { PedidoProvider } from './context/PedidoContext'

function App() {
  return (
    <>
    <PedidoProvider>
      <Pedido/>
    </PedidoProvider>
    </>
  )
}

export default App