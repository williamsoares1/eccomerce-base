import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const UsuarioContext = createContext({})

const UserProvider = ({ children }) => {
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [usuarios, setUsuarios] = useState([])

    const getAll = async () => {
        const response = await api.get("/users")
        setUsuarios(response.data)
    }

    return (        
            <UsuarioContext.Provider value={{ getAll, nome, email, senha, usuarios, setNome, setEmail, setSenha, setUsuarios}}>{children}</UsuarioContext.Provider>
                
    )
}

export { UsuarioContext, UserProvider }