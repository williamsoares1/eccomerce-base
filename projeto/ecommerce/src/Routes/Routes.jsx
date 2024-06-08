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
import TelaPedidoFinalizado from '../pages/TelaPedidos'
import TelaPedidos from '../pages/TelaPedidos'

const Routes = () => {
    return (
        <AuthProvider>
                <UserProvider>
                    <PedidoProvider>
                        <ProdutoProvider>
                            <BrowserRouter>
                                <div>
                                    <Link to='/'>home</Link>
                                    <br />
                                    <Link to='/carrinho'>carrinho</Link>
                                    <br />
                                    <Link to='/pedidos'>pedidos</Link>
                                </div>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path='/produtos/:id' component={TelaProdutoEsp} />
                                    <Route exact path='/cadastro' component={TelaCadastro} />
                                    <Route exact path='/login' component={TelaLogin} />
                                    <Route exact path='/carrinho' component={TelaCarrinho} />
                                    <Route exact path='/pedidos' component={TelaPedidos}/>
                                </Switch>
                                <footer>Direitos reservados</footer>
                            </BrowserRouter>
                        </ProdutoProvider>
                    </PedidoProvider>
                </UserProvider>
        </AuthProvider>
    )
}

export default Routes