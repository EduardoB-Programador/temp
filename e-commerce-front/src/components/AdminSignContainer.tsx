import { useRef } from 'react';
import '../styles/CredentialsContainer.css'
import { admin } from '../types/ModelTypes';
import { SetReactFunction } from '../types/ReactTypes';

export default function AdminSignContainer(props: { set: SetReactFunction<admin | undefined> }) {
    const { set } = props
    const nomeRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)

    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            nome: nomeRef.current!.value,
            email: emailRef.current!.value,
            senha: senhaRef.current!.value
        })
    }

    return (
        <div id="credentials-container">
            <form onSubmit={send}>
                <label htmlFor="input">Nome</label>
                <input type="text" ref={nomeRef} />
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} />
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} />
                <input type="submit" value='Sign In' />
            </form>
        </div>
    )
}