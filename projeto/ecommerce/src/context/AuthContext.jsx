import { createContext, useState } from 'react';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(false); // Inicialmente, nenhum usuário está logado

  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }