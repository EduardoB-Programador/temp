import type { MiddlewareHandler } from "hono";
import { Jwt } from "hono/utils/jwt";

export const AuthMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authentication')

    if (!token)
        return c.json({status: 'erro', mensagem: 'Não autorizado', code: 403}, 403)

    const jwt = token.split(' ')[1]!
    const payload = await Jwt.verify(jwt, process.env.JWT!, {
        alg: "HS256"
    })

    next()
}