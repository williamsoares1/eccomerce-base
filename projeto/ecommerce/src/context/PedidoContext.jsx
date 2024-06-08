import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const PedidoContext = createContext({})

const PedidoProvider = ({children}) => {
    const [valorTotal, setValorTotal] = useState()
    const [iduser, setIduser] = useState()
    const [carrinho, setCarrinho] = useState([])
    const [pedidos, setPedidos] = useState([])

    const getAll = async () => {
        const response = await api.get("/pedido")
        setPedidos(response.data)
    }

    return (
        <PedidoContext.Provider value={{getAll ,valorTotal ,iduser ,carrinho, pedidos, setValorTotal, setIduser, setCarrinho, setPedidos}}>{children}</PedidoContext.Provider>
    )
    
}

export {PedidoContext, PedidoProvider}

