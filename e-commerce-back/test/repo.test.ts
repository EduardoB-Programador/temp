import { test, expect } from 'bun:test'
import { Postgre } from '../src/repo/psqlPool'

const psql = Postgre.getInstance()
const obj = {id: 10, nome: 'Marcio', idade: 31, altura: 1.84, ativo: true}

test('colunas da tabela', () => {
    const colunas = psql.colunasTabela(obj)
    console.log(colunas)
})

test('valores da tabela', () => {
    const valores = psql.valoresTabela(obj)
    console.log(valores)
})

test('valores e colunas do update', () => {
    const update = psql.valoresUpdate(obj)
    console.log(update)
})

test('insert', () => {
    const insert = psql.insert(obj, 'pessoa')
    console.log(insert)
})

test('select', () => {
    const select = psql.select(obj, 'pessoa')
    console.log(select)
})

test('update', () => {
    const update = psql.update(obj, 'pessoa')
    console.log(update)
})

test('delete', () => {
    const del = psql.delete(obj, 'pessoa')
    console.log(del)
})