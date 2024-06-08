import { createContext, useState } from "react";
import api from "../api/api";

const UsuarioContext = createContext({})

const UserProvider = ({ children }) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [usuarioEncontrado, setUsuarioEncontrado] = useState({})
    const [senhaConferida, setSenhaConferida] = useState(undefined)
    const [campoEmail, setCampoEmail] = useState()

    const validacaoLogin = async (email, senha) => {
        await api.get(`/users?email=${email}`)
            .then(response => {
                const usuarioObj = response.data.find((u, index) => index === 0)
          
                if (response.data.length !== 1) {
                  setCampoEmail(<h1>Email não encontrado</h1>)
                }
          
                setUsuarioEncontrado(usuarioObj)
                setSenhaConferida(usuarioObj && usuarioObj.senha === senha)
            })
            .catch(e => {
                console.error(e)
                setSenhaConferida(false)
            });
    }

    const getAll = async () => {
        const response = await api.get("/users")
        setUsuarios(response.data)
    }

    return (        
        <UsuarioContext.Provider value={
            { nome, email, senha, usuarios, campoEmail, setEmail, setSenha, setUsuarios, getAll, validacaoLogin, usuarioEncontrado, senhaConferida }
        }>
            {children}
        </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UserProvider }
