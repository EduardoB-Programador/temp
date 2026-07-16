import { zValidator } from "@hono/zod-validator"
import { produtoSchema } from "../model/schemas"
import { Postgre } from "../repo/psqlPool"
import { Hono } from "hono"
import { AuthMiddlewareAdmin } from "../AuthMiddleware"

const produto = new Hono()

const db = Postgre.getInstance()
const tabela = 'produto'

produto.get('/:id{[0-9]+}', async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarLer({id: id}, tabela)
    return c.json(info, info.code)
})

.get('/all', async c => {
    const info = await db.executarLerTudo(tabela)
    return c.json(info, info.code)
})

.post('/add', AuthMiddlewareAdmin, zValidator('json', produtoSchema), async c => {
    const obj = c.req.valid('json')
    console.log(obj)
    const info = await db.executarCriar(obj, tabela)
    return c.json(info, info.code)
})

.put('/update', AuthMiddlewareAdmin, zValidator('json', produtoSchema), async c => {
    const obj = c.req.valid('json')
    const info = await db.executarAtualizar(obj, tabela)
    return c.json(info, info.code)
})

.delete('/delete/:id{[0-9]+}', AuthMiddlewareAdmin, async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarDeletar({id: id, ativo: true}, tabela)
    return c.json(info, info.code)
})

export default produto