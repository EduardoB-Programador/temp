import { admin, pagamento, produto, usuario } from "./ModelTypes"

export type BackResponse = {
    status: 'sucesso' | 'erro' | 'desconhecido'
    info?: (admin|pagamento|usuario|produto)[]
    mensagem?: string
    code: number
    token?: string
} 