import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import { AuthProvider } from '../context/AuthContext'
import { ProdutoProvider } from '../context/ProdutosContext'
import { PedidoProvider } from '../context/PedidoContext'
import { UserProvider } from "../context/UsuarioContext"
import TelaCadastro from '../pages/TelaCadastro'
import TelaCarrinho from "../pages/TelaCarrinho"
import TelaLogin from '../pages/TelaLogin'
import TelaProdutoEsp from '../pages/TelaProdutoEsp'
import TelaPedidos from '../pages/TelaPedidos'
import Menu from '../components/Menu/Menu'
import Rodape from '../components/Rodape/Rodape'

const Routes = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <PedidoProvider>
                    <ProdutoProvider>
                        <BrowserRouter>
                            <Menu/>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/produtos/:id' component={TelaProdutoEsp} />
                                <Route exact path='/cadastro' component={TelaCadastro} />
                                <Route exact path='/login' component={TelaLogin} />
                                <Route exact path='/carrinho' component={TelaCarrinho} />
                                <Route exact path='/pedido' component={TelaPedidos}/>
                            </Switch>
                            <Rodape/>
                        </BrowserRouter>
                    </ProdutoProvider>
                </PedidoProvider>
            </UserProvider>
        </AuthProvider>
    )
}

export default Routes