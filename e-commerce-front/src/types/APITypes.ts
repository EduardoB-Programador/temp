export type BackResponse = {
    status: 'sucesso' | 'erro' | 'desconhecido'
    info?: []
    mensagem?: string
    code: number
    token?: string
} 