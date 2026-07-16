import { useRef, useState } from 'react'
import { pagamento } from '../types/ModelTypes'
import '../styles/EntityForm.css'

type props = {
    stoken: string
    onSuccess?: (pagamento: pagamento) => void
}

export default function PaymentForm({ stoken, onSuccess }: props) {
    const precoRef = useRef<HTMLInputElement>(null)
    const quantidadeRef = useRef<HTMLInputElement>(null)
    const usuarioIdRef = useRef<HTMLInputElement>(null)
    const prodIdRef = useRef<HTMLInputElement>(null)
    const [erro, setErro] = useState('')

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErro('')

        const preco = Number(precoRef.current!.value)
        const quantidade = Number(quantidadeRef.current!.value)
        const usuario_id = Number(usuarioIdRef.current!.value)
        const prod_id = Number(prodIdRef.current!.value)

        if ([preco, quantidade, usuario_id, prod_id].some(n => isNaN(n) || n <= 0)) {
            setErro('Todos os campos devem ser números válidos maiores que zero')
            return
        }

        const novoPagamento: pagamento = { preco, quantidade, usuario_id, prod_id }

        try {
            const res = await fetch('http://localhost:3000/pagamento/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization-Special': stoken
                },
                body: JSON.stringify(novoPagamento)
            }).then(r => r.json())

            if (res.status === 'erro') {
                setErro(res.mensagem || 'Erro ao criar pagamento')
                return
            }

            onSuccess?.(novoPagamento)
        } catch {
            setErro('Erro de conexão com o servidor')
        }
    }

    return (
        <form className="entity-form" onSubmit={submit}>
            <h2>Adicionar Pagamento</h2>

            <label>Preço:</label>
            <input type="number" step="0.01" min="0" ref={precoRef} required />

            <label>Quantidade:</label>
            <input type="number" step="1" min="0" ref={quantidadeRef} required />

            <label>ID do Usuário:</label>
            <input type="number" step="1" min="1" ref={usuarioIdRef} required />

            <label>ID do Produto:</label>
            <input type="number" step="1" min="1" ref={prodIdRef} required />

            {erro && <p className="erro">{erro}</p>}

            <button type="submit">Salvar</button>
        </form>
    )
}