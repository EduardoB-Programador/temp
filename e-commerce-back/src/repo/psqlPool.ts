import { Pool } from "pg";
import { SQLanguage } from "./SQLanguage";

type DBResponse = {
    status: 'sucesso' | 'erro' | 'desconhecido'
    info?: any[]
    mensagem?:string | unknown
    code: 201 | 200 | 404 | 500
}

/**
Essa classe representa o banco de dados PostgreSQL
@implements SQLanguage
Usa a interface SQLanguage para traduzir todos os objetos
*/
export class Postgre extends SQLanguage {
    private readonly psql = new Pool({
        host: process.env.DB_HOST ?? '',
        port: Number(process.env.DB_PORTA),
        user: process.env.DB_USER ?? '',
        password: process.env.DB_SENHA ?? '',
        database: process.env.DB_NOME ?? ''
    })
    private static postgresql:Postgre

    private constructor() {
        super()
    }

    public static getInstance() {
        if (!Postgre.postgresql)
            Postgre.postgresql = new Postgre()
        return Postgre.postgresql
    }

    public async executarCriar(obj:any, tabela:string):Promise<DBResponse> {
        const frase = this.insert(obj, tabela)
        
        try {
            await this.psql.query(frase)
            return {status: 'sucesso', code: 201}
        } catch (err) {
            if (err instanceof Error)
                return {status: 'erro', code: 500, mensagem: err.message}
            return {status: 'desconhecido', code: 500, mensagem: err}
        }
    }

    public async executarLer(obj:any, tabela:string):Promise<DBResponse> {
        const frase = this.select(obj, tabela)

        try {
            const info = await this.psql.query(frase)
            if (!info.rows)
                return {status: 'erro', code: 404, mensagem: 'Não encontrado'}
            return {status: 'sucesso', code: 200, info: info.rows}
        } catch (err) {
            if (err instanceof Error)
                return {status: 'erro', code: 500, mensagem: err.message}
            return {status: 'desconhecido', code: 500, mensagem: err}
        }
    }

    public async executarLerTudo(tabela:string):Promise<DBResponse> {
        const frase = this.selectAll(tabela)

        try {
            const info = await this.psql.query(frase)

            if (!info.rows)
                return {status: 'erro', code: 404, mensagem: 'Não encontrado'}
            return {status: 'sucesso', code: 200, info: info.rows}
        } catch (err) {
            if (err instanceof Error)
                return {status: 'erro', code: 500, mensagem: err.message}
            return {status: 'desconhecido', code: 500, mensagem: err}
        }
    }

    public async executarAtualizar(obj:any, tabela:string):Promise<DBResponse> {
        const frase = this.update(obj, tabela)

        try {
            await this.psql.query(frase)
            return {status: 'sucesso', code: 200}
        } catch (err) {
            if (err instanceof Error)
                return {status:'erro', code: 500, mensagem: err.message}
            return {status: 'desconhecido', code: 500, mensagem: err}
        }
    }

    public async executarDeletar(obj:any, tabela:string):Promise<DBResponse> {
        const frase = this.delete(obj, tabela)

        try {
            await this.psql.query(frase)
            return {status: 'sucesso', code: 200}
        } catch (err) {
            if (err instanceof Error)
                return {status:'erro', code: 500, mensagem: err.message}
            return {status: 'desconhecido', code: 500, mensagem: err}
        }
    }
}   

/*
Postgre => providencia o banco de dados
SQLanguage => traduz o obj para uma query
*/