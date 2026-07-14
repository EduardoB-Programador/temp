import { zValidator } from "@hono/zod-validator"
import { pagSchema } from "../model/schemas"
import { Hono } from "hono"
import { Postgre } from "../repo/psqlPool"
import { AuthMiddlewareAdmin } from "../AuthMiddleware"

const pagamento = new Hono()

const db = Postgre.getInstance()
const tabela = 'pagamento'

pagamento.get('/:id{[0-9]+}', AuthMiddlewareAdmin, async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarLer({id: id}, tabela)
    return c.json(info, info.code)
})

.get('/all', AuthMiddlewareAdmin, async c => {
    const info = await db.executarLerTudo(tabela)
    return c.json(info, info.code)
})

.post('/add', AuthMiddlewareAdmin, zValidator('json', pagSchema), async c => {
    const obj = c.req.valid('json')
    const info = await db.executarCriar(obj, tabela)
    return c.json(info, info.code)
})

.put('/update', AuthMiddlewareAdmin, zValidator('json', pagSchema), async c => {
    const obj = c.req.valid('json')
    const info = await db.executarAtualizar(obj, tabela)
    return c.json(info, info.code)
})

export default pagamento