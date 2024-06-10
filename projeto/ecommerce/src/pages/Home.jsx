import { useContext, useEffect, useState } from 'react'
import { ProdutoContext } from '../context/ProdutosContext'
import ProdutoCard from '../components/Produto/ProdutoCard'
import { PedidoContext } from '../context/PedidoContext'
import { AuthContext } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const Home = () => {
  const { produtos, filtragem, cancelarFiltro, getAll } = useContext(ProdutoContext)
  const { setCarrinho } = useContext(PedidoContext)
  const { usuarioLogado } = useContext(AuthContext)

  useEffect(() => {
    getAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const adicionarAoCarrinho = (produto, quantidade) => {
    const produtoComQuantidade = { ...produto, qtd: quantidade }
    setCarrinho((prevCarrinho) => [...prevCarrinho, produtoComQuantidade])
  }

  return (
    <>

    <select onChange={filtragem}>
      <option value="eletronico">
        eletronico
      </option>
      <option value="variedades">
        variedades
      </option>
    </select>
    <button onClick={cancelarFiltro}>X</button>

    {usuarioLogado ? <div className="home-container">
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
      : <Redirect to="/login"/>}
    </>
  )
}

export default Home