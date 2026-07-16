import z from "zod";

export const adminSchema = z.object({
    id: z.number().positive().optional(),
    nome: z.string(),
    email: z.email(),
    senha: z.string().min(8),
    ativo: z.boolean().optional()
})

export const pagSchema = z.object({
    id: z.number().positive().optional(),
    preco: z.number(),
    quantidade: z.int(),
    usuario_id: z.int(),
    prod_id: z.int()
})

export const usuarioSchema = z.object({
    id: z.number().positive().optional(),
    email: z.email(),
    senha: z.string().min(8),
    endereco: z.string(),
    cpf: z.string().length(14),
    ativo: z.boolean().optional()
})

export const produtoSchema = z.object({
    id: z.number().positive().optional(),
    nome: z.string(),
    preco: z.number(),
    quantidade: z.int(),
    admin_id_mod: z.int().optional(),
    data_mod: z.date().optional(),
    ativo: z.boolean().optional()
})

//novo
export const loginSchema = z.object({
    email: z.email(),
    senha: z.string()
})