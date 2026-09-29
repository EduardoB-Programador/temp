const emails = []
const senhas = []

function cadastrar() {
    let email = document.getElementById('email-cad').value
    let senha = document.getElementById('senha-cad').value

    if (!email.trim() || !senha.trim())
        return

    //mais verificações
    emails.push(email)
    senhas.push(senha)

    document.getElementById("mensagem-cad").innerText = "Cadastrado " + email
}

function logar() {
    const email = document.getElementById('email-log').value
    const senha = document.getElementById('senha-log').value

    for (let i = 0; i < emails.length; i++) {
        if (email === emails[i] && senha === senhas[i]){
            document.getElementById("mensagem-log").innerText = "Logado como " + email
            return
        }
    }

    document.getElementById("mensagem-log").innerText = "Credenciais incorretas"
}