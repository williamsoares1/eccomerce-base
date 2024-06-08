import { useContext, useEffect, useState } from 'react'
import { ProdutoContext } from '../../context/ProdutosContext'
import ProdutoCard from '../../components/Produto/ProdutoCard'
import { PedidoContext } from '../../context/PedidoContext'

const Home = () => {
  const { produtos, getAll } = useContext(ProdutoContext)
  const { carrinho, setCarrinho } = useContext(PedidoContext)

  useEffect(() => {
    getAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const adicionarAoCarrinho = (produto, quantidade) => {
    const produtoComQuantidade = { ...produto, qtd: quantidade }
    setCarrinho((prevCarrinho) => [...prevCarrinho, produtoComQuantidade])
    console.log('Produto adicionado ao carrinho:', produtoComQuantidade)
  }

  console.log(carrinho)

  return (
    <div className="home-container">
      <h1 className="home-titulo">Lista de Produtos</h1>
      <div className="lista-de-produtos">
        {produtos.length > 0 ? (
          produtos.map(produto =>(
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
  )
}

export default Home