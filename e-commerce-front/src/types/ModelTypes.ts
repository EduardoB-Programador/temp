export type admin = {
    id?: number
    nome?: string
    email: string
    senha: string
    ativo?: boolean
}

export type pagamento = {
    id?: number
    preco: number
    quantidade: number
    usuario_id: number
    prod_id: number
}

export type usuario = {
    id?: number
    email: string
    senha: string
    endereco?: string
    cpf?: string
    ativo?: boolean
}

export type produto = {
    id?: number
    nome: string
    preco: number
    quantidade: number
    admin_id_mod?: number
    data_mod?: Date
    ativo?: boolean
}