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
    const [usuarioLogado, setUsuarioLogado] = useState(false)

    const validacaoLogin = async (email, senha) => {
        const response = await api.get(`/users?email=${email}`)
        
        const esp = response.data.find((u, index) => index == 0)

        if(response.data.length != 1){
            setCampoEmail(<h1>Email não encontrado</h1>)
        }

        setUsuarioEncontrado(esp)
        console.log("antes", senhaConferida)
        setSenhaConferida(esp && esp.senha === senha)
        console.log("dps", senhaConferida)
    }

    const getAll = async () => {
        const response = await api.get("/users")
        setUsuarios(response.data)
    }

    return (        
            <UsuarioContext.Provider value={
                { nome, email, senha, usuarios, usuarioLogado, campoEmail, setEmail, setSenha, setUsuarios, setUsuarioLogado, getAll, validacaoLogin, usuarioEncontrado, senhaConferida }
            }>
                {children}
            </UsuarioContext.Provider>
    )
}

export { UsuarioContext, UserProvider }