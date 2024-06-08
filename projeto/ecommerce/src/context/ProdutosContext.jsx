import { createContext, useState } from "react"
import api from "../api/api"

const ProdutoContext = createContext({})

const ProdutoProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([])

    const getAll = async () => {
        const response = await api.get("/produto")
        setProdutos(response.data)
    }

    return (
        <ProdutoContext.Provider value={{
            produtos,
            getAll, 
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ProdutoContext, ProdutoProvider }