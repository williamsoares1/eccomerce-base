import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
//import Home from '../pages/Home/Home';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import { AuthProvider } from '../context/AuthContext';
import { ProdutoProvider } from '../context/ProdutosContext';
import TelaCadastro from '../pages/TelaCadastro';
import TelaCarrinho from '../pages/TelaCarrinho';
import TelaLogin from '../pages/TelaLogin';
import TelaProdutoEsp from '../pages/TelaProdutoEsp';

const Routes = () => {
    return (
        <AuthProvider>
            <CarrinhoProvider>
                <ProdutoProvider>
                    <BrowserRouter>
                        <div>
                            <Link to='/produtos'>test</Link>
                            <br />
                            <Link to='/cadastro'>test</Link>
                        </div>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/produtos/:id' component={TelaProdutoEsp} />
                            <Route exact path='/cadastro' component={TelaCadastro} />
                            <Route exact path='/login' component={TelaLogin} />
                            <Route exact path='/carrinho' component={TelaCarrinho} />
                        </Switch>
                        <footer>Direitos reservados</footer>
                    </BrowserRouter>
                </ProdutoProvider>
            </CarrinhoProvider>
        </AuthProvider>
    );
};

export default Routes;