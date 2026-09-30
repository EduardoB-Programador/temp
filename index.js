const usuarios = []

function cadastrar() {
    let email = document.getElementById('email-cad').value
    let senha = document.getElementById('senha-cad').value

    if (!email.trim() || !senha.trim())
        return

    //mais verificações
    const usuario = {
        email: email,
        senha: senha
    }

    usuarios.push(usuario)

    document.getElementById("mensagem-cad").innerText = "Cadastrado " + email
}

function logar() {
    const email = document.getElementById('email-log').value
    const senha = document.getElementById('senha-log').value

    for (const user of usuarios) {
        if (user.email === email && user.senha === senha) {
            document.getElementById("mensagem-log").innerText = "Logado como " + user.email
            return
        }
    }

    document.getElementById("mensagem-log").innerText = "Credenciais incorretas"
}