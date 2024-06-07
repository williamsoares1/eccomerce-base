import { useContext, useEffect } from "react"
import { PedidoContext } from "../../context/PedidoContext"

const Pedido = () => {
    const {pedidos, getAll} = useContext(PedidoContext)

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            {pedidos.map((pedido) =>(
                <div key={pedido.id}>
                    <h1>{pedido.valorTotal}</h1>
                    <h2>{pedido.idUser}</h2>
                </div>
            ))}
        </>
    )
}

export default Pedido