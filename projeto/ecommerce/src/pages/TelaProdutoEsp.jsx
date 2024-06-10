import React, {useState, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { ProdutoContext } from '../context/ProdutosContext'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

const TelaProdutoEsp = () => {
    const { id } = useParams()
    const { produto, getProdutoById, getProductRating, postProductRating } = useContext(ProdutoContext)
    const [ rating, setRating ] = useState(0);
    const { usuarioLogado } = useContext(AuthContext)

    useEffect(() => {
        getProdutoById(id)
        fetchRating()
    }, [id, getProdutoById, getProductRating])

    const fetchRating = async () => {
        const productRating = await getProductRating(id)
        setRating(productRating);
    }

    if (!produto) {
        return <div>Carregando...</div>
    }
  
      const handleRatingChange = (event, newValue) => {
        setRating(newValue);
        postProductRating(produto.id, newValue);
      };
  
    return (
        <>
        {!usuarioLogado && <Redirect to="/login"/>}
      <Box className="produto-card">
        <img 
          src={produto.imgUrl} 
          alt={produto.nome} 
          className="produto-imagem" 
          />
        <Box className="produto-detalhes">
          <Typography variant="h6" component="h3" className="produto-nome">
            {produto.nome}
          </Typography>
          <Typography variant="body2" component="p" className="produto-descricao">
            {produto.descricao}
          </Typography>
          <Typography variant="h6" component="p" className="produto-preco">
            Preço: R$ {produto.preco.toFixed(2)}
          </Typography>
          <Rating 
            name="produto-rating" 
            value={rating} 
            onChange={handleRatingChange}
            className="produto-rating"
            />
          <button 
            className="produto-add-carrinho" 
            onClick={() => onAddToCart(produto)}
            >
            Adicionar ao Carrinho
          </button>
        </Box>
      </Box>
    </>
    );
  };
  
  export default TelaProdutoEsp