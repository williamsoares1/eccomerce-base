import { Link } from "react-router-dom"

const Menu = () => {
    return (
        <>
            <header>
                <Link to='/'>home</Link>
                <br />
                <Link to='/carrinho'>carrinho</Link>
                <br />
                <Link to='/pedidos'>pedidos</Link>
            </header>
        </>
    )
}

export default Menu