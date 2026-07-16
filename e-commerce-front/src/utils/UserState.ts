import { admin, usuario } from "../types/ModelTypes"

export function isLoggedIn(cookies:{token?:string, stoken?:string}) {
    return cookies.stoken || cookies.token
}

export function isAdminLoggedIn(cookies:{stoken?:string}) {
    return cookies.stoken
}

export function isAdmin(payload:admin|usuario): payload is admin {
    return 'nome' in payload
}