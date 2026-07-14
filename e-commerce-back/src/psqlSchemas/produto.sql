CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    nome VARCHAR UNIQUE NOT NULL,
    preco NUMERIC(5,2) NOT NULL,
    quantidade INT NOT NULL,
    admin_id_mod INT NOT NULL,
    data_criacao DATE DEFAULT NOW(),
    data_mod DATE,
    data_exp DATE DEFAULT NOW()
)