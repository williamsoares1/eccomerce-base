import { useContext, useEffect, useState } from 'react';
import { ProdutoContexto } from '../../context/ProdutosContext';
import ProdutoCard from '../../components/Produto/ProdutoCard';

const Home = () => {
  const { produtos, getAll } = useContext(ProdutoContexto);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    getAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
    console.log('Produto adicionado ao carrinho:', produto);
  };

  console.log(produtos)
  console.log(carrinho)

  return (
    <div className="home-container">
      <h1 className="home-titulo">Lista de Produtos</h1>
      <div className="lista-de-produtos">
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <ProdutoCard 
            key={produto.id} 
            produto={produto} 
            onAddToCart={adicionarAoCarrinho}
            />
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </div>
  );
}

export default Home;