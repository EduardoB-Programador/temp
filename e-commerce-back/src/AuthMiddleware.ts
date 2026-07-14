import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const JWT = process.env.JWT!

export const AuthMiddlewareUser: MiddlewareHandler = createMiddleware( async (c, next) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return c.json({status: 'erro', mensagem: 'Não autorizado', code: 401}, 401)

    const token = authHeader.split(' ')[1]!
    
    try {
        const payload = await verify(token, JWT, 'HS256')
        c.set('userPayload', payload)
        await next()
    } catch {
        return c.json({status: 'erro', code: 401, mensagem: 'Token invalido ou expirado'}, 401)
    }
})

export const AuthMiddlewareAdmin: MiddlewareHandler = createMiddleware( async (c, next) => {
    const authHeader = c.req.header('Authorization-Special')

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return c.json({status: 'erro', mensagem: 'Não autorizado', code: 401}, 401)

    const token = authHeader.split(' ')[1]!
    //Bearer abvlbiuluLRBLOOUKbrkuvIUBÇ.KHEB<kvurblubvlysbilu.yelvybsukwyvbewyyBIYFIY
    try {
        const payload = await verify(token, JWT, 'HS256')
        c.set('admPayload', payload)
        await next()
    } catch {
        return c.json({status: 'erro', code: 401, mensagem: 'Token invalido ou expirado'}, 401)
    }
})