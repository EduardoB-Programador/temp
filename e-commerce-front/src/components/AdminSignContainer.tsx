import { useRef } from 'react';
import '../styles/CredentialsContainer.css'
import { admin } from '../types/ModelTypes';
import { SetReactFunction } from '../types/ReactTypes';
import { validateEmail, validatePassword } from '../utils/ValidateCredentials';

//Um React Component, é apenas uma parte do site, um componente dele
export default function AdminSignContainer(props: { set: SetReactFunction<admin | undefined> }) {
    const { set } = props
    const nomeRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)

    const pEmailErr = useRef<HTMLParagraphElement>(null)
    const pPassErr = useRef<HTMLParagraphElement>(null)

    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            nome: nomeRef.current!.value,
            email: emailRef.current!.value,
            senha: senhaRef.current!.value
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

    return (
        <div id="credentials-container">
            <form onSubmit={send}>
                <label htmlFor="input">Nome</label>
                <input type="text" ref={nomeRef} />
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} onChange={emailHandler}/>
                <p id="email-error" ref={pEmailErr}></p>
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} onChange={passwordHandler}/>
                <p id='pass-error' ref={pPassErr}></p>
                <input type="submit" value='Sign in' />
            </form>
        </div>
    )
}