import { useContext, useEffect, useState } from 'react';
import { ProdutoContext } from '../context/ProdutosContext';
import ProdutoCard from '../components/Produto/Produto';
import { PedidoContext } from '../context/PedidoContext';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import api from '../api/api';
import "../styles/home.css"

const Home = () => {
  const { produtos, filtragem, getAll } = useContext(ProdutoContext);
  const { setCarrinho } = useContext(PedidoContext);
  const { usuarioLogado } = useContext(AuthContext);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("")

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const produtosFiltrados = produtos.filter(produto => produto.quantidade > 0);
    setProdutosDisponiveis(produtosFiltrados);
  }, [produtos]);

  const adicionarAoCarrinho = async (produto, quantidade) => {
    try {
      const response = await api.get(`/produto/${produto.id}`);
      const produtoAtualizado = response.data;

      if (quantidade <= produtoAtualizado.quantidade) {
        const produtoComQuantidade = { ...produto, qtd: quantidade };
        setCarrinho(prevCarrinho => [...prevCarrinho, produtoComQuantidade]);
      } else {
        alert('Quantidade indisponível em estoque.');
      }
    } catch (error) {
      console.error('Erro ao verificar o estoque:', error)
    }
  };

  return (
    <>
      {!usuarioLogado && <Redirect to="/login" />}
    <div className='produto_container'>
    <div className='filtros'>
        <div>
          <select onChange={filtragem}>
            <option value="eletronico">eletronico</option>
            <option value="variedades">variedades</option>
          </select>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Buscar produto" 
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            />
        </div>
      </div>

        <div>
          <h1>Lista de Produtos</h1>
          <div>
            {produtosDisponiveis.length > 0 ? (
              produtos
              .filter(produto => 
                produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
              ).filter(produto => produto.quantidade > 0)
              .map(produto => (
                <ProdutoCard
                  key={produto.id}
                  produto={produto}
                  onAddToCart={adicionarAoCarrinho}
                />
              ))
            ) : (
              <p>Nenhum produto disponível no momento.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
