import { Link } from "react-router-dom"
import "../../styles/menu.css"
import logo from "../../assets/imgs/logo/logo_png.png"
import logoCarrinho from "../../assets/imgs/cart.svg"

const Menu = () => {
    return (
        <>
            <header>
                <div>
                    <a href="/"><img src={logo}/></a>
                </div>
                <div>
                    <Link to='/'>Produtos</Link>
                    <Link to='/pedidos'>Pedidos</Link>
                </div>
                <div>
                    <Link to='/carrinho'><img src={logoCarrinho}/></Link>
                </div>
            </header>
        </>
    )
}

export default Menu