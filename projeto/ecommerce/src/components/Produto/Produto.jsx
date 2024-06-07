import { useContext, useEffect } from "react"
import { ProdutoContexto } from "../../context/ProdutosContext"

const Produto = () => {
    const { produtos, getAll } = useContext(ProdutoContexto)

    useEffect(()=> {
        getAll()
    }, [])

    return (
        <>
            {produtos.map((produto) => (
                <div key={produto.id}>
                    <h1>{produto.nome}</h1>
                </div>
            ))}
        </>
    )
}

export default Produto