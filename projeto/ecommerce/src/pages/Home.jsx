import { useContext, useEffect, useState } from 'react';
import { ProdutoContext } from '../context/ProdutosContext';
import ProdutoCard from '../components/Produto/ProdutoCard';
import { PedidoContext } from '../context/PedidoContext';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import api from '../api/api'; // Importe a instância api aqui

const Home = () => {
  const { produtos, filtragem, cancelarFiltro, getAll } = useContext(ProdutoContext);
  const { setCarrinho } = useContext(PedidoContext);
  const { usuarioLogado } = useContext(AuthContext);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  useEffect(() => {
    // Filtrar os produtos com quantidade maior que zero
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
      console.error('Erro ao verificar o estoque:', error);
    }
  };

  return (
    <>
      <select onChange={filtragem}>
        <option value="eletronico">eletronico</option>
        <option value="variedades">variedades</option>
      </select>
      <button onClick={cancelarFiltro}>X</button>

      {usuarioLogado ? (
        <div className="home-container">
          <h1 className="home-titulo">Lista de Produtos</h1>
          <div className="lista-de-produtos">
            {produtosDisponiveis.length > 0 ? (
              produtosDisponiveis.map(produto => (
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
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Home;
