import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'
import { UsuarioContext } from '../context/UsuarioContext'
import { Redirect } from 'react-router-dom'

const TelaPedidos = () => {
  const { usuarioLogado } = useContext(AuthContext)
  const { usuarioEncontrado } = useContext(UsuarioContext)
  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
          const response = await api.get(`/pedido?idUser=${usuarioEncontrado.id}`);
          setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    }
    
    fetchPedidos()
    fetchProdutos()
  }, [])

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produto');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  const getNomeProduto = (idProduto) => {
    const produto = produtos.find((p) => p.id === idProduto);
    return produto ? produto.nome : 'Produto não encontrado';
  };

  return (
    <>
    {!usuarioLogado && <Redirect to="/login"/>}
    <div>
      <h2>Meus Pedidos</h2>
        <div>
          {pedidos.length === 0 ? (
            <p>Você ainda não fez nenhum pedido.</p>
            ) : (
              <ul>
              {pedidos.map((pedido) => (
                <li key={pedido.id}>
                  <h3>Pedido #{pedido.id}</h3>
                  <p>Valor Total: R${pedido.valorTotal}</p>
                  <h1>{pedido.idUser}</h1>
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
    </div>
    </>
  );
};

export default TelaPedidos;