import { useRef, useState } from 'react'
import { produto } from '../types/ModelTypes'
import '../styles/EntityForm.css'

type props = {
    stoken: string
    admId?: number
    onSuccess?: (produto: produto) => void
}

export default function ProductForm({ stoken, admId, onSuccess }: props) {
    const nomeRef = useRef<HTMLInputElement>(null)
    const precoRef = useRef<HTMLInputElement>(null)
    const quantidadeRef = useRef<HTMLInputElement>(null)
    const [erro, setErro] = useState('')

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErro('')

        const nome = nomeRef.current!.value.trim()
        const preco = Number(precoRef.current!.value)
        const quantidade = Number(quantidadeRef.current!.value)

        if (!nome) {
            setErro('Nome é obrigatório')
            return
        }
        if (isNaN(preco) || preco <= 0) {
            setErro('Preço inválido')
            return
        }
        if (isNaN(quantidade) || quantidade < 0) {
            setErro('Quantidade inválida')
            return
        }

        const novoProduto: produto = {
            nome,
            preco,
            quantidade,
            admin_id_mod: admId
        }
        console.log(novoProduto)

        try {
            const res = await fetch('http://localhost:3000/produto/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization-Special': stoken
                },
                body: JSON.stringify(novoProduto)
            }).then(r => r.json())

            if (res.status === 'erro') {
                setErro(res.mensagem || 'Erro ao criar produto')
                return
            }

            onSuccess?.(novoProduto)
        } catch {
            setErro('Erro de conexão com o servidor')
        }
    }

    return (
        <form className="entity-form" onSubmit={submit}>
            <h2>Adicionar Produto</h2>

            <label>Nome:</label>
            <input type="text" ref={nomeRef} required />

            <label>Preço:</label>
            <input type="number" step="0.01" min="0" ref={precoRef} required />

            <label>Quantidade:</label>
            <input type="number" step="1" min="0" ref={quantidadeRef} required />

            {erro && <p className="erro">{erro}</p>}

            <button type="submit">Salvar</button>
        </form>
    )
}