import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { useHistory } from 'react-router-dom';
import { PedidoContext } from '../context/PedidoContext';
import "../styles/produto.css"

const TelaCarrinho = () => {
  const { usuarioLogado } = useContext(AuthContext);
  const { carrinho, setCarrinho } = useContext(PedidoContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!usuarioLogado) {
      history.push("/login");
    }

    const calcularTotal = () => {
      const total = carrinho.reduce((acumulador, item) => acumulador + item.preco * item.qtd, 0);
      setTotal(total);
    }
    calcularTotal();
  }, [carrinho, history, usuarioLogado]);

  const handleQuantidadeChange = async (id, quantidade) => {
    try {
      const response = await api.get(`/produto/${id}`);
      const produtoAtualizado = response.data;

      if (Number(quantidade) <= produtoAtualizado.quantidade) {
        const novoCarrinho = carrinho.map(item =>
          item.id === id ? { ...item, qtd: Number(quantidade) } : item
        );
        setCarrinho(novoCarrinho);
      } else {
        alert('Quantidade indisponível em estoque.');
      }
    } catch (error) {
      console.error('Erro ao verificar o estoque:', error);
    }
  }

  const handleRemoverItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  }

  const handleEsvaziarCarrinho = () => {
    setCarrinho([]);
  }

  const handleFinalizarCompra = async () => {
    try {
      const verificacoes = await Promise.all(
        carrinho.map(async item => {
          const response = await api.get(`/produto/${item.id}`);
          const produtoAtualizado = response.data;
          if (item.qtd > produtoAtualizado.quantidade) {
            throw new Error(`Quantidade indisponível para o produto: ${item.nome}`);
          }
        })
      );

      const itensPedido = carrinho.map(item => ({
        idProduto: item.id,
        qtd: item.qtd
      }));

      const response = await api.post('/pedido', {
        idUser: usuarioLogado.id,
        valorTotal: total,
        itens: itensPedido
      });

      console.log('Pedido realizado com sucesso:', response.data);

      await Promise.all(carrinho.map(item =>
        api.patch(`/produto/${item.id}`, { quantidade: item.quantidade - item.qtd })
      ));

      setCarrinho([]);
      history.push('/pedido');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert(error.message);
    }
  }

  return (
    <div className="carrinho_container">
      <h2>Meu Carrinho</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {carrinho.map(item => (
              <li key={item.id} className="produto-card">
                <img src={item.imgUrl} alt={item.nome} className="produto-imagem" />
                <div className="produto-detalhes">
                  <h3 className="produto-nome">{item.nome}</h3>
                  <p className="produto-preco">Preço: R$ {item.preco.toFixed(2)}</p>
                  <input
                    type="number"
                    value={item.qtd}
                    min="1"
                    max={item.quantidade}
                    onChange={(e) => handleQuantidadeChange(item.id, e.target.value)}
                    className="produto-quantidade"
                  />
                  <button className="produto-add-carrinho" onClick={() => handleRemoverItem(item.id)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: R${total.toFixed(2)}</h3>
          <button className="produto-add-carrinho" onClick={handleEsvaziarCarrinho}>
            Esvaziar Carrinho
          </button>
          <button className="produto-add-carrinho" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}

export default TelaCarrinho;
