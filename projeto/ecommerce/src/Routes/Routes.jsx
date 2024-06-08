import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
//import Home from '../pages/Home/Home';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import { AuthProvider } from '../context/AuthContext';
import TelaCadastro from '../pages/TelaCadastro';
//import TelaCarrinho from '../pages/TelaCarrinho';
//import TelaLogin from '../pages/TelaLogin';
// import TelaPedidos from '../pages/TelaPedidos';cl
// import TelaProdutoEsp from '../pages/TelaProdutoEsp';
// import TelaProdutos from '../pages/TelaProdutos';

const Routes = () => {
    return (
        <>
            <AuthProvider>
                <CarrinhoProvider>
                    <BrowserRouter>
                        <div>
                            <Link to='/produtos'>test</Link>
                            <br />
                            <Link to='/cadastro'>test</Link>
                        </div>
                        <Switch>
                            {/* <Route exact path='/' component={Home} />
                    <Route exact path='/produtos' component={TelaProdutos} />
                    <Route exact path='/post/:id' component={TelaProdutoEsp} /> */}
                            <Route exact path='/cadastro' component={TelaCadastro} />
                            {/* <Route exact path='/login' component={TelaLogin} />
                    <Route exact path='/carrinho' component={TelaCarrinho} /> */}
                            {/* <Route exact path='/pedidos' component={TelaPedidos} /> */}
                        </Switch>

                        <footer>Direitos reservados</footer>
                    </BrowserRouter>
                </CarrinhoProvider>
            </AuthProvider>

        </>

    );
};

export default Routes;