import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialmente, nenhum usuário está logado

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Adicione a validação das props usando PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired // Garante que children seja um nó React e seja obrigatório
};