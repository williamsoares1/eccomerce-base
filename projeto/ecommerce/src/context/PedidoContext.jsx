import { createContext, useEffect, useState } from "react"
import api from "../api/api"

const PedidoContext = createContext({})

const PedidoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [pedidos, setPedidos] = useState([])

    const getAll = async () => {
        const response = await api.get("/pedido")
        setPedidos(response.data)
    }

    return (
        <PedidoContext.Provider value={{ getAll, carrinho, pedidos, setCarrinho, setPedidos }}>{children}</PedidoContext.Provider>
    )
    
}

export {PedidoContext, PedidoProvider}

