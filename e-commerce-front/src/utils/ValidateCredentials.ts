function validateEmail(email: string) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function validatePassword(password: string) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
}

function validateCPF(CPF: string) {
    return /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/.test(CPF)
}

export function validateUser(user: { email: string, senha: string, cpf?: string }) {
    if (user.cpf)
        if (!validateCPF(user.cpf))
            return false
    if (validateEmail(user.email) && validatePassword(user.senha))
        return true
    return false
}

export function validateAdmin(admin: { email: string, senha: string }) {
    if (validateEmail(admin.email) && validatePassword(admin.senha))
        return true
    return false
}