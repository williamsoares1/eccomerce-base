import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const UsuarioContext = createContext({})

const UserProvider = ({ children }) => {
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [usuarios, setUsuarios] = useState([])
    let possuiCadastro;

    const getAll = async () => {
        const response = await api.get("/users")
        setUsuarios(response.data)
    }

    const validacaoLogin = async (email, senha) => {
        const response = await api.get(`/users?email=${email}`)
        possuiCadastro = response.data.length >= 1 && response.data[0].senha == senha ? true : false
    }

    return (        
            <UsuarioContext.Provider value={{ nome, email, senha, usuarios, possuiCadastro, setNome, setEmail, setSenha, setUsuarios, getAll, validacaoLogin}}>{children}</UsuarioContext.Provider>
    )
}

export { UsuarioContext, UserProvider }