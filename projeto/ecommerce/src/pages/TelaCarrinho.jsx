import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CarrinhoContext } from '../context/CarrinhoContext';
import api from '../api/api';
import { useHistory } from 'react-router-dom';

const TelaCarrinho = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const { usuarioLogado } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {

    if (!usuarioLogado) {
      history.push("/login")
    }

    const calcularTotal = () => {
      const total = carrinho.reduce((acumulador, item) => acumulador + item.preco * item.quantidade, 0);
      setTotal(total);
    };
    calcularTotal();
  }, [carrinho]);

  const handleQuantidadeChange = (id, quantidade) => {
    const novoCarrinho = carrinho.map(item =>
      item.id === id ? { ...item, quantidade: Number(quantidade) } : item
    );
    setCarrinho(novoCarrinho);
  };

  const handleRemoverItem = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  const handleEsvaziarCarrinho = () => {
    setCarrinho([]);
  };

  const handleFinalizarCompra = async () => {
    if (!user) {
      console.error('Usuário não está logado.');
      history.push('/login');
    }

    try {
      const itensPedido = carrinho.map(item => ({
        idProduto: item.id,
        quantidade: item.quantidade
      }));

      const response = await api.post('/pedido', {
        idUser: user.id,
        valorTotal: total,
        itens: itensPedido
      });

      console.log('Pedido realizado com sucesso:', response.data);

      await Promise.all(carrinho.map(item =>
        api.put(`/produtos/${item.id}`, { quantidade: item.quantidade - item.quantidade })
      ));

      setCarrinho([]);
      history.push('/pedidos');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
    }
  };

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
                  value={item.quantidade}
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
  );
};

export default TelaCarrinho;