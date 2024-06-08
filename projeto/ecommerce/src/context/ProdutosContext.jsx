import { createContext, useState } from "react"
import api from "../api/api"

const ProdutoContext = createContext({})

const ProdutoProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([])
    const [produto, setProduto] = useState(null)

    const getAll = async () => {
        const response = await api.get("/produto")
        setProdutos(response.data)
    };

    const getProdutoById = async (id) => {
        const response = await api.get(`/produto/${id}`)
        setProduto(response.data)
    };

    return (
        <ProdutoContext.Provider value={{
            produtos,
            produto,
            getAll,
            getProdutoById
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ProdutoContext, ProdutoProvider }