import { useState } from 'react'
import './ProdutoCard.css' // Importa o CSS para estilização
import { Link } from 'react-router-dom'

const ProdutoCard = ({ produto, onAddToCart }) => {
  const [quantidade, setQuantidade] = useState(1)

  return (
    <>
    {produto.quantidade != 0 && <div className="produto-card">
      <img src={produto.imgUrl} alt={produto.nome} className="produto-imagem" />
      <div className="produto-detalhes">
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>
        <p className="produto-preco">Preço: R$ {produto.preco.toFixed(2)}</p>
        <p className="produto-estoque">Estoque: {produto.quantidade}</p>
        <button 
          className="produto-add-carrinho" 
          onClick={() => onAddToCart(produto, quantidade)}
        >
          Adicionar ao Carrinho
        </button>
        <input
          type="number"
          value={quantidade}
          min="1"
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>
      <button><Link to={`/produtos/${produto.id}`}>Sobre mais...</Link></button>
    </div>}
    </>
  )
}



export default ProdutoCard;
