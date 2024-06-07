
import './ProdutoCard.css'; // Importa o CSS para estilização

const ProdutoCard = ({ produto, onAddToCart }) => {
  return (
    <div className="produto-card">
      <img src={produto.imgUrl} alt={produto.nome} className="produto-imagem" />
      <div className="produto-detalhes">
        <h3 className="produto-nome">{produto.nome}</h3>
        <p className="produto-descricao">{produto.descricao}</p>
        <p className="produto-preco">Preço: R$ {produto.preco.toFixed(2)}</p>
        <p className="produto-estoque">Estoque: {produto.quantidade}</p>
        <button 
          className="produto-add-carrinho" 
          onClick={() => onAddToCart(produto)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};



export default ProdutoCard;
