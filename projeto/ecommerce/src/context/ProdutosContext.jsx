import { createContext, useState } from "react";
import api from "../api/api"

const ProdutoContext = createContext({})

const ProdutoProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([])
    const [img, setImg] = useState()
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [preco, setPreco] = useState()
    const [estoque, setEstoque] = useState()
    const [avaliacao, setAvaliacao] = useState()

    const getAll = async () => {
        const response = await api.get("/produto")
        setProdutos(response.data)
    }

    return (
        <ProdutoContext.Provider value={{
            produtos, 
            img, 
            nome, 
            descricao, 
            preco, 
            estoque, 
            avaliacao, 
            setImg, 
            setNome, 
            setDescricao, 
            setPreco, 
            setEstoque, 
            setAvaliacao, 
            getAll, 
        }}>
            {children}
        </ProdutoContext.Provider>
    );
}

export { ProdutoContext, ProdutoProvider }