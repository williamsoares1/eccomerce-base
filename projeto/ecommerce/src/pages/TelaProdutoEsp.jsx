import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProdutoContext } from '../context/ProdutosContext';

const TelaProdutoEsp = () => {
    const { id } = useParams();
    const { produto, getProdutoById } = useContext(ProdutoContext);

    useEffect(() => {
        getProdutoById(id);
    }, [id, getProdutoById]);

    if (!produto) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="produto-detalhes">
            <img src={produto.imgUrl} alt={produto.nome} className="produto-imagem" />
            <h3 className="produto-nome">{produto.nome}</h3>
            <p className="produto-descricao">{produto.descricao}</p>
            <p className="produto-preco">Preço: R$ {produto.preco.toFixed(2)}</p>
            <p className="produto-estoque">Estoque: {produto.quantidade}</p>
        </div>
    );
};

export default TelaProdutoEsp;