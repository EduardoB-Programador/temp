import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import '../styles/Home.css'
import { produto } from '../types/ModelTypes'

export default function Home() {
  const [produtos, setProdutos] = useState<produto[]>([])

  useEffect(() => {
    const fetchProdutos = async () => {
      const res = await fetch('http://localhost:3000/produto/all').then(r => r.json())
      if (res.status !== 'erro')
        setProdutos(res.info ?? [])
    }

    fetchProdutos()
  }, [])

  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <MainContent>
        <div className="produtos-lista">
          {produtos.map(p => <ProductCard key={p.id} produto={p} />)}
        </div>
      </MainContent>
      <Footer />
    </>
  )
}