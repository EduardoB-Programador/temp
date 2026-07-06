import { useRef } from 'react'
import '../styles/CredentialsContainer.css'
import { SetReactFunction } from '../types/ReactTypes'
import { usuario } from '../types/ModelTypes'

export default function SignContainer(props: { set: SetReactFunction<usuario| undefined>, operation:string }) {
    const { set, operation } = props
    const enderecoRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)
    const CPFRef = useRef<HTMLInputElement>(null)

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        set({
            email: emailRef.current!.value,
            senha: senhaRef.current!.value,
            endereco: enderecoRef.current!.value,
            cpf: CPFRef.current!.value
        })
    }

    return (
        <div id='credentials-container'>
            <form onSubmit={submitForm}>
                <label htmlFor="input">Email</label>
                <input type="email" ref={emailRef} />
                <label htmlFor="input">Senha</label>
                <input type="password" ref={senhaRef} />
                <label htmlFor="input">Endereco</label>
                <input type="text" ref={enderecoRef} />
                <label htmlFor="input">CPF</label>
                <input type="text" ref={CPFRef} />
                <input type="submit" value={operation}/>
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