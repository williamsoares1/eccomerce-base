import { createContext, useState } from "react"
import api from "../api/api"

const ProdutoContext = createContext({})

const ProdutoProvider = ({ children }) => {
    const [produtos, setProdutos] = useState([])
    const [produto, setProduto] = useState(null)
    const [ratings, setRatings] = useState([])

    const getProductRating = async (id) => {
        try {
            const response = await api.get(`/ratings?productId=${id}`);
            if (response.data.length > 0) {
                return response.data.reduce((acc, rating) => acc + rating.value, 0) / response.data.length;
            } else {
                return 0;
            }
        } catch (error) {
            console.error("Erro ao buscar avaliação do produto:", error);
            return 0;
        }
    };

    const postProductRating = async (id, rating) => {
        try {
            // Sempre cria uma nova avaliação
            const response = await api.post("/ratings", { productId: id, value: rating });
            setRatings(prevRatings => [...prevRatings, response.data]);
            console.log("Avaliação enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar avaliação do produto:", error);
        }
    }

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
            getProdutoById,
            getProductRating,
            postProductRating
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ProdutoContext, ProdutoProvider }