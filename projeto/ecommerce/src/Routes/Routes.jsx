import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import Home from '../pages/Home';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import { AuthProvider } from '../context/AuthContext';
import TelaCadastro from '../pages/TelaCadastro';
import TelaCarrinho from '../pages/TelaCarrinho';
// import TelaLogin from '../pages/TelaLogin';
// import TelaPedidos from '../pages/TelaPedidos';
// import TelaProdutoEsp from '../pages/TelaProdutoEsp';
// import TelaProdutos from '../pages/TelaProdutos';

const Routes = () => {
    return (
        <>
            <AuthProvider>
                <CarrinhoProvider>
                        <BrowserRouter>
                            <div>
                                <Link to='/TelaProdutos'>test</Link>
                                <br />
                                <Link to='/TelaCadastro'>test</Link>
                            </div>

                        <Switch>
                            {/* <Route exact path='/' component={Home} />
                            <Route exact path='/TelaProdutos' component={TelaProdutos} />
                            <Route exact path='/post/:id' component={TelaProdutoEsp} /> */}
                            <Route exact path='/TelaCadastro' component={TelaCadastro} />
                            {/*<Route exact path='/TelaLogin' component={TelaLogin} />*/
                            <Route exact path='/TelaCarrinho' component={TelaCarrinho} />
                            /*<Route exact path='/TelaPedidos' component={TelaPedidos} />*/ }
                        </Switch>

                        <footer>Direitos reservados</footer>
                        </BrowserRouter>
                </CarrinhoProvider>
            </AuthProvider>
            
        </>
        
    );
};

export default Routes;