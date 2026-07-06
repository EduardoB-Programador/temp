import { zValidator } from "@hono/zod-validator"
import { loginSchema, usuarioSchema } from "../model/schemas"
import { Hono } from "hono"
import { Postgre } from "../repo/psqlPool"
import { Jwt } from "hono/utils/jwt"

const usuario = new Hono()

const db = Postgre.getInstance()
const tabela = 'usuario'

usuario.get('/:id{[0-9]+}', async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarLer({ id: id }, tabela)
    return c.json(info, info.code)
})

    .get('/all', async c => {
        const info = await db.executarLerTudo(tabela)
        return c.json(info, info.code)
    })

    .post('/add', zValidator('json', usuarioSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarCriar(obj, tabela)
        return c.json(info, info.code)
    })

    .post('/login', zValidator("json", loginSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarLer(obj, tabela)
        if (info.status === 'erro')
            return c.json(info, info.code)
        return c.json({ ...info, token: `Bearer ${await Jwt.sign(obj, process.env.JWT!, "HS256")}` }, info.code)
    })

    .put('/update', zValidator('json', usuarioSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarAtualizar(obj, tabela)
        return c.json(info, info.code)
    })

    .delete('/delete/:id{[0-9]+}', async c => {
        const id = Number(c.req.param('id'))
        const info = await db.executarDeletar({ id: id, ativo: true }, tabela)
        return c.json(info, info.code)
    })

export default usuario