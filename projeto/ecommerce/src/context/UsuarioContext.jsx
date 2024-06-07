import { createContext, useState } from "react";
import api from "../api/api";

const UsuarioContext = createContext({})

const UserProvider = ({ children }) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [usuarioEncontrado, setUsuarioEncontrado] = useState({})
    const [senhaConferida, setSenhaConferida] = useState('')

    const validacaoLogin = async (email, senha) => {
        const response = await api.get(`/users?email=${email}`)
        const esp = response.data.find((u, index) => index == 0)
        setUsuarioEncontrado(esp)
        setSenhaConferida(esp.senha == senha ? true : false)
    }

    const getAll = async () => {
        const response = await api.get("/users")
        setUsuarios(response.data)
    }

    return (        
            <UsuarioContext.Provider value={
                { nome, email, senha, usuarios, setEmail, setSenha, setUsuarios, getAll, validacaoLogin, usuarioEncontrado, senhaConferida }
            }>
                {children}
            </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UserProvider }