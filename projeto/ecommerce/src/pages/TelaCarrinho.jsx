import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'
import { useHistory } from 'react-router-dom'
import { PedidoContext } from '../context/PedidoContext'
import { UsuarioContext } from '../context/UsuarioContext'

const TelaCarrinho = () => {
  const { usuarioLogado } = useContext(AuthContext)
  const { carrinho, setCarrinho, buscarPorUsuario } = useContext(PedidoContext)
  const { usuarioEncontrado, setUsuarioEncontrado } = useContext(UsuarioContext)
  const [total, setTotal] = useState(0)
  const history = useHistory()

  useEffect(() => {
    if (!usuarioLogado) {
      history.push("/login")
    }


    const calcularTotal = () => {
      const total = carrinho.reduce((acumulador, item) => acumulador + item.preco * item.qtd, 0)
      setTotal(total)
    }
    calcularTotal()
  }, [carrinho])

  const handleQuantidadeChange = (id, quantidade) => {
    const novoCarrinho = carrinho.map(item => item.id === id ? { ...item, qtd: Number(quantidade) } : item
    )
    setCarrinho(novoCarrinho)
  }

  const handleRemoverItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id)
    setCarrinho(novoCarrinho)
  }

  const handleEsvaziarCarrinho = () => {
    setCarrinho([])
  }

  const handleFinalizarCompra = async () => {
    try {
      const itensPedido = carrinho.map(item => {
        ({
          idProduto: item.id,
          qtd: item.qtd
        })
      })

      const response = await api.post('/pedido', {
        idUser: usuarioEncontrado.id,
        valorTotal: total,
        itens: itensPedido
      })

      console.log('Pedido realizado com sucesso:', response.data)

      await Promise.all(carrinho.map(item => {
        api.patch(`/produto/${item.id}`, { quantidade: item.quantidade - item.qtd })
      }
      ))

      setCarrinho([])
      buscarPorUsuario(usuarioEncontrado.id)
      history.push(`/pedido`)
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
    }
  }

  return (
    <div>
      <h2>Meu Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {carrinho.map(item => (
              <li key={item.id}>
                <img src={item.imgUrl} alt={item.nome} width="50" />
                <p>{item.nome}</p>
                <p>R${item.preco}</p>
                <input
                  type="number"
                  min="1"
                  value={item.qtd}
                  onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                />
                <button onClick={() => handleRemoverItem(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <h3>Total: R${total}</h3>
          <button onClick={handleEsvaziarCarrinho}>Esvaziar Carrinho</button>
          <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
        </>
      )}
    </div>
  )
}

export default TelaCarrinho