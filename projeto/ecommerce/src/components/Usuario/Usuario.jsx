import { useContext, useEffect } from "react"
import { UsuarioContext } from "../../context/UsuarioContext"

const Usuario = () => {
    const {usuarios, getAll} = useContext(UsuarioContext)

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            {usuarios.map((usuario) => (
                <div key={usuario.id}>
                    <h1>{usuario.nome}</h1>
                    
                </div>
            ))}
        </>
    )
}

export default Usuario