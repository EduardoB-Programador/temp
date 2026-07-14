import { useRef } from 'react'
import '../styles/CredentialsContainer.css'
import { SetReactFunction } from '../types/ReactTypes'
import { usuario } from '../types/ModelTypes'
import { validateCPF, validateEmail, validatePassword } from '../utils/ValidateCredentials'

export default function SignContainer(props: { set: SetReactFunction<usuario | undefined>, operation: string }) {
    const { set, operation } = props
    const enderecoRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)
    const CPFRef = useRef<HTMLInputElement>(null)

    const pEmailErr = useRef<HTMLParagraphElement>(null)
    const pPassErr = useRef<HTMLParagraphElement>(null)
    const pCpfErr = useRef<HTMLParagraphElement>(null)

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            email: emailRef.current!.value,
            senha: senhaRef.current!.value,
            endereco: enderecoRef.current!.value,
            cpf: CPFRef.current!.value
        })
    }

    const emailHandler = () => {
        if (!validateEmail(emailRef.current!.value))
            pEmailErr.current!.innerText = 'invalid email format'
        else
            pEmailErr.current!.innerText = ''
    }

    const passwordHandler = () => {
        if (!validatePassword(senhaRef.current!.value))
            pPassErr.current!.innerText = 'password must contain 8 characters, at least 1 uppercase and 1 lowercase letter and a number'
        else
            pPassErr.current!.innerText = ''
    }

    const CPFHandler = () => {
        if (!validateCPF(CPFRef.current!.value))
            pCpfErr.current!.innerText = 'invalid cpf format'
        else
            pCpfErr.current!.innerText = ''
    }

    return (
        <div id='credentials-container'>
            <form onSubmit={submitForm}>
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} onChange={emailHandler}/>
                <p id="email-error" ref={pEmailErr}></p>
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} onChange={passwordHandler}/>
                <p id="pass-error" ref={pPassErr}></p>
                <label htmlFor="input">Endereco</label>
                <input type="text" ref={enderecoRef} />
                <label htmlFor="input">CPF</label>
                <input type="text" ref={CPFRef} onChange={CPFHandler}/>
                <p id="cpf-error" ref={pCpfErr}></p>
                <input type="submit" value={operation} />
            </form>
        </div>
    )
}

/*
emailRef = useRef<HTMLInputElement>(null)

emailRef -> null

<input ref={emailRef}>

emailRef -> input


*/