import { produto } from '../types/ModelTypes'
import '../styles/ProductCard.css'

export default function ProductCard({ produto }: { produto: produto }) {
    console.log(produto)
    return (
        <div className="produto-card">
            <h3>{produto.nome}</h3>
            <p>Preço: R$ {produto.preco}</p>
            <p>Disponível: {produto.quantidade}</p>
        </div>
    )
}