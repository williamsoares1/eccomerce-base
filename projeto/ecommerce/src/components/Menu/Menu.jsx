import { Link } from "react-router-dom"
import "../../styles/menu.css"
import logo from "../../assets/imgs/logo/logo_png.png"
import logoCarrinho from "../../assets/imgs/cart.svg"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Menu = () => {
    const { usuarioLogado } = useContext(AuthContext)
    return (
        <>  
            <header>
                <div>
                    <Link to="/"><img src={logo}/></Link>
                </div>
                <div>
                    <Link to='/'>Produtos</Link>
                    <Link to='/pedido'>Pedidos</Link>
                    {!usuarioLogado && <Link to='/login'>Login</Link>}
                </div>
                <div>
                    <Link to='/carrinho'><img src={logoCarrinho}/></Link>
                </div>
            </header>
        </>
    )
}

export default Menu