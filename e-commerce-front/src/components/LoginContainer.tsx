import { useRef } from 'react'
import '../styles/CredentialsContainer.css'
import { SetReactFunction } from '../types/ReactTypes'
import { usuario } from '../types/ModelTypes'
import { validateEmail, validatePassword } from '../utils/ValidateCredentials'

export default function LoginContainer(props: { set: SetReactFunction<usuario| undefined>, operation:string }) {
    const { set, operation } = props
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)

    const pEmailErr = useRef<HTMLParagraphElement>(null)
    const pPassErr = useRef<HTMLParagraphElement>(null)

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            email: emailRef.current!.value,
            senha: senhaRef.current!.value,
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
            pPassErr.current!.innerText = 'password must contain 8 characters, at least 1 letter and a number'
        else
            pPassErr.current!.innerText = ''
    }

    return (
        <div id='credentials-container'>
            <form onSubmit={submitForm}>
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} onChange={emailHandler}/>
                <p id='email-error' ref={pEmailErr}></p>
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} onChange={passwordHandler} />
                <p id='pass-error' ref={pPassErr}></p>
                <input type="submit" value={operation}/>
            </form>
        </div>
    )
}