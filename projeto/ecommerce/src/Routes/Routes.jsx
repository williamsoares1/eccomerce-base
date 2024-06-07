import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import TelaCadastro from '../pages/TelaCadastro';
import TelaCarrinho from '../pages/TelaCarrinho';
import TelaLogin from '../pages/TelaLogin';
import TelaPedidos from '../pages/TelaPedidos';
import TelaProdutoEsp from '../pages/TelaProdutoEsp';
import TelaProdutos from '../pages/TelaProdutos';

const Routes = () => {
    return (
        <BrowserRouter>
            <div style={{ backgroundColor: 'red' }}>
                <Link to='/TelaProdutos'>Ver posts</Link>
                <br />
                <Link to='/TelaCadastro'>Criar um post</Link>
            </div>

            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/TelaProdutos' component={TelaProdutos} />
                <Route exact path='/post/:id' component={TelaProdutoEsp} />
                <Route exact path='/TelaCadastro' component={TelaCadastro} />
                <Route exact path='/TelaLogin' component={TelaLogin} />
                <Route exact path='/TelaCarrinho' component={TelaCarrinho} />
                <Route exact path='/TelaPedidos' component={TelaPedidos} />
            </Switch>

            <footer>Direitos reservados</footer>
        </BrowserRouter>
    );
};

export default Routes;