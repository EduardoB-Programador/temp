CREATE TABLE pagamento(
    id SERIAL PRIMARY KEY,
    preco NUMERIC(6,2) NOT NULL,
    quantidade INT NOT NULL,
    usuario_id INT NOT NULL,
    prod_id INT NOT NULL,
    data_exp DATE DEFAULT NOW(),
    FOREIGN KEY(usuario_id) REFERENCES usuario(id),
    FOREIGN KEY(prod_id) REFERENCES produto(id)
)