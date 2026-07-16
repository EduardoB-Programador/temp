import { Base64 } from "js-base64"
import { admin, pagamento, produto, usuario } from "../types/ModelTypes"
import { ReactSetCookieFunction } from "../types/ReactTypes"

type payload = admin | pagamento | usuario | produto
export function setNewCookie(name:'user' | 'admin' | 'token' | 'stoken', payload: payload, setCookie: ReactSetCookieFunction) {
    const encoded = Base64.encode(JSON.stringify(payload))

    setCookie(name, encoded, {
        path: '/',
        maxAge: 86400
    })
}