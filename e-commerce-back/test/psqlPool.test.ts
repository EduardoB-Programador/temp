import { test, expect } from "bun:test"
import { Postgre } from "../src/repo/psqlPool"

const psql = Postgre.getInstance()
const obj = {nome: 'maurinho', email: 'mauro@example.com', senha: 'mario123'}
const tabela = 'admin'

test('insert', async () => {
    const data = await psql.executarCriar(obj, tabela)
    console.log(data)
    expect(data.status).toBe('sucesso')
})

test('select', async () => {
    const data = await psql.executarLer(obj, tabela)
    console.log(data)
    expect(data.status).toBe('sucesso')
})

test('update', async () => {
    obj.nome = 'ambrosin'
    const data = await psql.executarAtualizar(obj, tabela)
    console.log(data)
    expect(data.status).toBe('sucesso')
})

test('delete', async () => {
    const data = await psql.executarDeletar(obj, tabela)
    console.log(data)
    expect(data.status).toBe('sucesso')
})

test('select all', async () => {
    const data = await psql.executarLerTudo(tabela)
    console.log(data)
    expect(data.status).toBe('sucesso')
})