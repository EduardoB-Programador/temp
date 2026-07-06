import { useRef } from 'react'
import '../styles/CredentialsContainer.css'
import { SetReactFunction } from '../types/ReactTypes'
import { usuario } from '../types/ModelTypes'

export default function LoginContainer(props: { set: SetReactFunction<usuario| undefined>, operation:string }) {
    const { set, operation } = props
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            email: emailRef.current!.value,
            senha: senhaRef.current!.value,
        })
    }

    return (
        <div id='credentials-container'>
            <form onSubmit={submitForm}>
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} />
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} />
                <input type="submit" value={operation}/>
            </form>
        </div>
    )
}