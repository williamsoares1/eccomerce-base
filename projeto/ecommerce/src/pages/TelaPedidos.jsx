import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'
import { UsuarioContext } from '../context/UsuarioContext'

const TelaPedidos = () => {
  const { usuarioLogado } = useContext(AuthContext)
  const { usuarioEncontrado } = useContext(UsuarioContext)
  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        if (usuarioLogado) {
          const response = await api.get(`/pedido?idUser=${usuarioEncontrado.id}`)
          setPedidos(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
      }
    }

    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produto')
        setProdutos(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchPedidos()
    fetchProdutos()
  }, [usuarioLogado])

  const getNomeProduto = (idProduto) => {
    const produto = produtos.find((p) => p.id === idProduto)
    return produto ? produto.nome : 'Produto não encontrado'
  }

  return (
    <div>
      <h2>Meus Pedidos</h2>
      {usuarioLogado ? (
        <div>
          {pedidos.length === 0 ? (
            <p>Você ainda não fez nenhum pedido.</p>
          ) : (
            <ul>
              {pedidos.map((pedido) => (
                <li key={pedido.id}>
                  <h3>Pedido #{pedido.id}</h3>
                  <p>Valor Total: R${pedido.valorTotal}</p>
                  <ul>
                    {pedido.itens.map((item) => (
                      <li key={item.idProduto}>
                        {getNomeProduto(item.idProduto)} - Quantidade: {item.qtd}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Você precisa estar logado para ver seus pedidos.</p>
      )}
    </div>
  )
}

export default TelaPedidos