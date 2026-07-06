export abstract class SQLanguage {

    public colunasTabela(obj:any) {
        return `(${
            Object.entries(obj)
                .map( v => {
                    if (v[1])
                        return v[0]
                    return ''
                })
                .filter(v => v) //if (v)
                .join(', ')
        })`
    }

    public valoresTabela(obj:any) {
        return `(${
            Object.values(obj)
                .filter(v => v)
                .map(v => {
                    if (typeof v === 'number' || typeof v === 'boolean')
                        return `${v}`
                    return `'${v}'`
                })
                .join(', ')
        })`
    }

    public valoresUpdate(obj:any) {
        return Object.entries(obj)
            .map(v => {
                if (typeof v[1] === 'number' || typeof v[1] === 'boolean')
                    return `${v[0]} = ${v[1]}`
                if (typeof v[1] !== 'undefined')
                    return `${v[0]} = '${v[1]}'`
                return ''
            })
            .filter(v => v[1])
            .join(', ')
    }

    public valoresWhere(obj:any) {
        return Object.entries(obj)
            .filter(v => v[1])
            .map(v => {
                if (typeof v[1] === 'number' || typeof v[1] === 'boolean')
                    return `${v[0]} = ${v[1]}`
                return `${v[0]} = '${v[1]}'`
            })
            .join(' AND ')
    }

    public selectAll(tabela:string) {
        return `SELECT * FROM ${tabela} ORDER BY id;`
    }

    public insert(obj:any, tabela:string) {
        return `INSERT INTO ${tabela}${this.colunasTabela(obj)} VALUES${this.valoresTabela(obj)};`
    }

    public select(obj:any, tabela:string) {
        return `SELECT * FROM ${tabela} WHERE ${this.valoresWhere(obj)}`
    }

    public update(obj:any, tabela:string) {
        let { id } = obj
        if (!id)
            throw new Error('Cannot make update without id')

        return `UPDATE ${tabela} SET ${this.valoresUpdate(obj)} WHERE ${this.valoresWhere({id: id})};`
    }

    public delete(obj:any, tabela:string) {
        const { ativo, id } = obj
        if (!id)
            throw new Error("Não há como deletar sem id")

        if (!ativo)
            throw new Error('Não há como deletar sem a propriedade ativo')
        return `UPDATE ${tabela} SET ${this.valoresUpdate({ativo: false})} WHERE ${this.valoresWhere({id: id})};`
    }
}
//obj = {nome: 'gustavo', idade:21, altura:undefined}
//Object.entries(obj) = [['nome','gustavo'], ['idade',21], ['altura', undefined]]
//.map(...) if (v[1]) //'gustavo', 21, undefined
//for (let i = 0; i< obj.length; i++) {obj[i] = fun(obj[i])}
//                       ['nome', 'idade',   '']
//.filter(predicate(v) => boolean) if (obj[i]) arr2[i] = obj[i]
//                        ['nome', 'idade']
//.join()                 'nomeidade'                         
//.join(', ')             '(nome, idade)'

//INSERT INTO table(coluna1, col2) VALUES('gustavo', 21)

//SELECT * FROM table
//UPDATE table SET nome = 'luiz sandro rosa', idade = 32 WHERE id = 1;