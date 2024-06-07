import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(false); // Inicialmente, nenhum usuário está logado

  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  );
};