import { Hono } from "hono";
import { Postgre } from "../repo/psqlPool";
import { adminSchema, loginSchema } from "../model/schemas";
import { zValidator } from "@hono/zod-validator";
import { AuthMiddlewareAdmin } from "../AuthMiddleware";
import { sign } from "hono/jwt";

const admin = new Hono()

const db = Postgre.getInstance()
const tabela = 'admin'
const JWT = process.env.JWT!

admin.get('/:id{[0-9]+}', AuthMiddlewareAdmin, async c => {
    const id = Number(c.req.param('id'))
    const info = await db.executarLer({ id: id }, tabela)
    return c.json(info, info.code)
})

    .get('/all', AuthMiddlewareAdmin, async c => {
        const info = await db.executarLerTudo(tabela)
        return c.json(info, info.code)
    })

    .post('/add', AuthMiddlewareAdmin, zValidator('json', adminSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarCriar(obj, tabela)
        return c.json(info, info.code)
    })
    //git clone http://github.com/EduardoB-Programador/temp
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJ0eUBnbWFpbC5jb20iLCJzZW5oYSI6IjEyMzQ1Njc4QXdhIn0.dCY7xFDSRmT7JWZxmi5oYWBkummfjEJJP4eg2MRP5qM
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

        return c.json({
            ...info, token: `Bearer ${await sign({
                adminPayload: info.info![0],
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
            }, JWT, "HS256")}`
        }, info.code)
    })

    .put('/update', AuthMiddlewareAdmin, zValidator('json', adminSchema), async c => {
        const obj = c.req.valid('json')
        const info = await db.executarAtualizar(obj, tabela)
        return c.json(info, info.code)
    })

    .delete('/delete/:id{[0-9]+}', AuthMiddlewareAdmin, async c => {
        const id = Number(c.req.param('id'))
        const info = await db.executarDeletar({ id: id, ativo: true }, tabela)
        return c.json(info, info.code)
    })

export default admin