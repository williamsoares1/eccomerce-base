import { useState } from 'react'
import api from '../../api/api'
import { Link } from 'react-router-dom'
import './Produto.css'

const ProdutoCard = ({ produto, onAddToCart }) => {
  const [quantidade, setQuantidade] = useState(1)

  const handleChange = (e) => {
    const value = Number(e.target.value)
    if (value <= produto.quantidade && value >= 1) {
      setQuantidade(value)
    }
  }

  const handleAddToCart = async () => {
    try {
      const response = await api.get(`/produto/${produto.id}`)
      const produtoAtualizado = response.data

      if (quantidade <= produtoAtualizado.quantidade) {
        onAddToCart(produto, quantidade)
      } else {
        alert('Quantidade indisponível em estoque.')
      }
    } catch (error) {
      console.error('Erro ao verificar o estoque:', error)
    }
  }

  return (
    <>
      <div>
        <img src={produto.imgUrl} alt={produto.nome}/>
        <div>
          <h3>{produto.nome}</h3>
          <p>{produto.descricao}</p>
          <p>Preço: R$ {produto.preco.toFixed(2)}</p>
          <p>Estoque: {produto.quantidade}</p>
          <button className='btn_home_carrinho' onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </button>
          <input
            type="number"
            value={quantidade}
            min="1"
            max={produto.quantidade}
            onChange={handleChange}
          />
        </div>
        <button className='btn_home_sobre'><Link to={`/produtos/${produto.id}`}>Sobre mais...</Link></button>
      </div>
    </>
  )
}

export default ProdutoCard;
