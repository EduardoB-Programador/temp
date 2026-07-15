import { zValidator } from "@hono/zod-validator"
import { loginSchema, usuarioSchema } from "../model/schemas"
import { Hono } from "hono"
import { Postgre } from "../repo/psqlPool"
import { AuthMiddlewareUser } from "../AuthMiddleware"
import { sign } from "hono/jwt"

const usuario = new Hono()

const db = Postgre.getInstance()
const tabela = 'usuario'
const JWT = process.env.JWT!

usuario.get('/:id{[0-9]+}', AuthMiddlewareUser, async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarLer({ id: id }, tabela)
    return c.json(info, info.code)
})

    .get('/all', AuthMiddlewareUser, async c => {
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

        try {
            if (!(info.info![0].email === obj.email && info.info![0].senha === obj.senha))
                return c.json({ status: 'erro', mensagem: 'credenciais incorretas ou usuario inexistente', code: 401 }, 401)
        } catch {
            return c.json({ status: 'erro', mensagem: 'credenciais incorretas ou usuario inexistente', code: 401 }, 401)
        }

        return c.json({ ...info, token: `Bearer ${await sign({
            userPayload: info.info![0],
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }, JWT, "HS256")}` }, info.code)
    })

    .put('/update', AuthMiddlewareUser, zValidator('json', usuarioSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarAtualizar(obj, tabela)
        return c.json(info, info.code)
    })

    .delete('/delete/:id{[0-9]+}', AuthMiddlewareUser, async c => {
        const id = Number(c.req.param('id'))
        const info = await db.executarDeletar({ id: id, ativo: true }, tabela)
        return c.json(info, info.code)
    })

export default usuario