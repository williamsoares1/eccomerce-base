import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

// Adicione a validação da prop usando PropTypes
CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired // Garante que children seja um nó React e seja obrigatório
};
