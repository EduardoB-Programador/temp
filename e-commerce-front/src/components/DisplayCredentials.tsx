import { useRef } from 'react';
import '../styles/DisplayCredentials.css'
import { admin, usuario } from '../types/ModelTypes';
import { isAdmin } from '../utils/UserState';
import { SetReactFunction } from '../types/ReactTypes';

type payload = admin | usuario | undefined
type removeCookiesFun = (param: 'user' | 'admin' | 'token' | 'stoken') => void

export default function DisplayCredentials(props: { payload: payload, set: SetReactFunction<payload>, removeCookies: removeCookiesFun }) {
    const { payload, set, removeCookies } = props
    const nomeRef = useRef<HTMLInputElement>(null)
    const newNomeRef = useRef<HTMLInputElement>(null)
    const senhaRef = useRef<HTMLInputElement>(null)
    const newSenhaRef = useRef<HTMLInputElement>(null)
    const enderecoRef = useRef<HTMLInputElement>(null)
    const newEnderecoRef = useRef<HTMLInputElement>(null)
    const salvarInputRef = useRef<HTMLInputElement>(null)

    if (!payload)
        return <></>

    const logout = () => {
        removeCookies('user')
        removeCookies('token')
        removeCookies('admin')
        removeCookies('stoken')
    }

    const alterar = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (isAdmin(payload)) {
            nomeRef.current!.style.display = 'none'
            newNomeRef.current!.style.display = 'inline'
        }
        senhaRef.current!.style.display = 'none'
        newSenhaRef.current!.style.display = 'inline'
        enderecoRef.current!.style.display = 'none'
        newEnderecoRef.current!.style.display = 'inline'

        salvarInputRef.current!.style.display = "inline"
    }

    const submitChanges = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isAdmin(payload)) {

            const nome = newNomeRef.current?.value
            const senha = newSenhaRef.current?.value

            set({ ...payload, nome: nome || payload.nome, senha: senha || payload.senha })
            
        } else {
            
            const senha = newSenhaRef.current?.value
            const endereco = newEnderecoRef.current?.value
            
            set({ ...payload, senha: senha || payload.senha, endereco: endereco || payload.endereco})

        }
    }


    return (
        <>
            {
                isAdmin(payload) ?

                    <form id='credentials-form' onSubmit={submitChanges}>
                        <label>Id:</label>
                        <br />
                        <input type="text" disabled value={payload.id} />
                        <br />
                        <label>Nome:</label>
                        <br />
                        <input type="text" ref={nomeRef} disabled value={payload.nome} />
                        <input type="text" ref={newNomeRef} style={{ display: 'none' }} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" disabled value={payload.email} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        {/* taria tudo funcionando essa bosta aqui, se eu tivesse pensado em colocar um placeholder ao inves de value, catiço */}
                        <input type="text" ref={senhaRef} disabled value={payload.senha} />
                        <input type="text" ref={newSenhaRef} style={{ display: 'none' }} />
                        <br />
                        <label>Ativo:</label>
                        <br />
                        <input type="text" disabled value={payload.ativo ? 'verdadeiro' : 'falso'} />
                        <br />
                        <br />
                        <button type='button' onClick={alterar} >Alterar credenciais</button>
                        <input type="submit" ref={salvarInputRef} style={{ display: 'none' }} value='Salvar' />
                        <br />
                        <button type='button' onClick={logout}>logout</button>
                    </form>

                    :

                    <form id='credentials-form' onSubmit={submitChanges}>
                        <label>Id:</label>
                        <br />
                        <input type="text" disabled value={payload.id} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" disabled value={payload.email} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="text" ref={senhaRef} disabled value={payload.senha} />
                        <input type="text" ref={newSenhaRef} style={{ display: 'none' }} />
                        <br />
                        <label>Endereço:</label>
                        <br />
                        <input type="text" ref={enderecoRef} disabled value={payload.endereco} />
                        <input type="text" ref={newEnderecoRef} style={{ display: 'none' }} />
                        <br />
                        <label>CPF:</label>
                        <br />
                        <input type="text" disabled value={payload.cpf} />
                        <br />
                        <label>Ativo:</label>
                        <br />
                        <input type="text" disabled value={payload.ativo ? 'verdadeiro' : 'falso'} />
                        <br />
                        <button onClick={alterar} >Alterar credenciais</button>
                        <input type="submit" ref={salvarInputRef} style={{ display: 'none' }} value='Salvar' />
                        <br />
                        <button onClick={logout}>logout</button>
                    </form>

            }
        </>
    )
}