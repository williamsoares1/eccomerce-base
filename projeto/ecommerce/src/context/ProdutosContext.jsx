import { createContext, useState } from "react"
import api from "../api/api"

const ProdutoContext = createContext({})

const ProdutoProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([])
    const [produto, setProduto] = useState(null)

    const getAll = async () => {
        const response = await api.get("/produto")
        setProdutos(response.data)
    }

    const getProdutoById = async (id) => {
        const response = await api.get(`/produto/${id}`)
        setProduto(response.data)
    }

    const filtragem = async (e) => {
        const response = await api.get(`/produto?categoria=${e.target.value}`)
        setProdutos(response.data)
    }

    const cancelarFiltro = () => {
        getAll()
    }

    return (
        <ProdutoContext.Provider value={{
            produtos,
            produto,
            filtragem,
            cancelarFiltro,
            getAll,
            getProdutoById
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ProdutoContext, ProdutoProvider }