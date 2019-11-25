CREATE TABLE Cliente (
	CPF			    NUMERIC(11)		NOT NULL	PRIMARY KEY,
    nome_cliente    VARCHAR(40)	    NOT NULL,
	end_cliente		VARCHAR(80)	    NOT NULL,
	email_cliente   VARCHAR(20) 	NOT NULL,
	tel_cliente		NUMERIC(9)		NOT NULL
);

CREATE TABLE Animal (
	cod_animal		NUMERIC(5)		NOT NULL	PRIMARY KEY,
	nome_animal		VARCHAR(20)     NOT NULL,
	tipo			VARCHAR(10)	    NOT NULL,
	alergia			VARCHAR(80)	    NOT NULL,
	raca			VARCHAR(20)	    NOT NULL,
	porte			VARCHAR(10)	    NOT NULL,
	fk_Cliente_CPF	NUMERIC(11)		NOT NULL
);

CREATE TABLE Veterinario (
	CRMV			    NUMERIC(5)		NOT NULL	PRIMARY KEY,
	CPF                 NUMERIC(5)		NOT NULL,
	nome_veterinario	VARCHAR(40)	    NOT NULL,
	end_veterinario	    VARCHAR(80)	    NOT NULL,
	email_veterinario	VARCHAR(20)	    NOT NULL,
	tel_veterinario	    NUMERIC(9)		NOT NULL,
	salario_vet         FLOAT(9, 2)		NOT NULL
);

CREATE TABLE Tosador (
	CPF			    NUMERIC(11)		NOT NULL	PRIMARY KEY,
	nome_tosador	VARCHAR(40)	    NOT NULL,
	end_tosador		VARCHAR(80)	    NOT NULL,
	email_tosador	VARCHAR(20)	    NOT NULL,
	tel_tosador		NUMERIC(9)		NOT NULL,
    salario_tos		FLOAT(9,2)		NOT NULL
);

CREATE TABLE Produto (
    cod_produto     NUMERIC(5)		NOT NULL	PRIMARY KEY,
	nome_produto	VARCHAR(40)	    NOT NULL,
	marca			VARCHAR(20) 	NOT NULL,
	valor_unitario	FLOAT(9, 2)		NOT NULL,
	qtd_estoque		NUMERIC(5)		NOT NULL
);


CREATE TABLE Solicita (
    fk_Cliente_CPF      NUMERIC(11)		NOT NULL,
	data_solicitacao	DATETIME		NOT NULL
);

CREATE TABLE Compra (
	cod_compra			    NUMERIC(5)	NOT NULL	PRIMARY KEY,
	data_hora_compra		DATETIME	NOT NULL,
	fk_Produto_cod_produto	NUMERIC(5)	NOT NULL,
    fk_Cliente_CPF		    NUMERIC(11)	NOT NULL
);

CREATE TABLE Servico (
	cod_servico			    NUMERIC(5)	NOT NULL	PRIMARY KEY,
    preco_banho			    FLOAT(9,2),
    preco_tosa			    FLOAT(9,2),
    servico_TIPO			NUMERIC(1)	NOT NULL,
    fk_Animal_cod_animal	NUMERIC(5)	NOT NULL,
    fk_Tosador_CPF		    NUMERIC(11)	NOT NULL
);

CREATE TABLE Consulta (
    cod_consulta            NUMERIC(5)      NOT NULL    PRIMARY KEY,
	data_hora_consulta		DATETIME		NOT NULL,
	diagnostico			    VARCHAR(80),
	valor				    FLOAT(9,2)		NOT NULL,
    fk_Veterinario_CRMV	    NUMERIC(5)		NOT NULL,
    fk_Animal_cod_animal	NUMERIC(5)		NOT NULL
);

ALTER TABLE Animal ADD CONSTRAINT FK_Animal_1
	FOREIGN KEY (fk_Cliente_CPF)
	REFERENCES Cliente(CPF);

ALTER TABLE Servico ADD CONSTRAINT FK_Servico_1
	FOREIGN KEY (fk_Animal_cod_animal)
	REFERENCES Animal(cod_animal)
	ON DELETE CASCADE;

ALTER TABLE Servico ADD CONSTRAINT FK_Servico_2
	FOREIGN KEY (fk_Tosador_CPF)
	REFERENCES Tosador(CPF);

ALTER TABLE Solicita ADD CONSTRAINT FK_Solicita_1
	FOREIGN KEY (fk_Cliente_CPF)
	REFERENCES Cliente(CPF)
	ON DELETE SET NULL;

ALTER TABLE Compra ADD CONSTRAINT FK_Compra_1
	FOREIGN KEY (fk_Produto_cod_produto)
	REFERENCES Produto(cod_produto)
	ON DELETE SET NULL;

ALTER TABLE Compra ADD CONSTRAINT FK_Compra_2
	FOREIGN KEY (fk_Cliente_CPF)
	REFERENCES Cliente(CPF)
	ON DELETE SET NULL;

ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_1
	FOREIGN KEY (fk_Veterinario_CRMV)
	REFERENCES Veterinario(CRMV);

ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_2
	FOREIGN KEY (fk_Animal_cod_animal)
	REFERENCES Animal(cod_animal);