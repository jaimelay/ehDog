const { execSQLQuery } = require('../config/db');

module.exports = {
    create_db() {
        execSQLQuery('CREATE DATABASE eh_dog;');
    },

    createTableCliente() {
        const tableCliente = `CREATE TABLE Cliente (
            CPF			NUMERIC(11)		NOT NULL	PRIMARY KEY,
            nome_cliente		VARCHAR(40)	NOT NULL,
            end_cliente		VARCHAR(80)	NOT NULL,
            email_cliente		VARCHAR(20)	NOT NULL,
            tel_cliente		NUMERIC(9)		NOT NULL
        );`;
        execSQLQuery(tableCliente);
    },

    createTableAnimal() {
        const tableAnimal = `CREATE TABLE Animal (
            cod_animal		NUMERIC(5)		NOT NULL	PRIMARY KEY,
            nome_animal		VARCHAR(20)	NOT NULL,
            tipo			VARCHAR(10)	NOT NULL,
            alergia			VARCHAR(80)	NOT NULL,
            raca			VARCHAR(20)	NOT NULL,
            porte			VARCHAR(10)	NOT NULL,
            fk_Cliente_CPF	NUMERIC(11)		NOT NULL
        );`;
        execSQLQuery(tableAnimal);
    },
    
    createTableVeterinario() {
        const tableVeterinario = `CREATE TABLE Veterinario (
            CRMV    NUMERIC(5)		NOT NULL	PRIMARY KEY,
            CPF     NUMERIC(11)		NOT NULL,
            nome_veterinario	VARCHAR(40)	NOT NULL,
            end_veterinario	VARCHAR(80)	NOT NULL,
            email_veterinario	VARCHAR(20)	NOT NULL,
            tel_veterinario	NUMERIC(9)		NOT NULL,
            salario_vet		FLOAT(9, 2)		NOT NULL
        );`;
        execSQLQuery(tableVeterinario);
    },
    
    createTableTosador() {
        const tableTosador = `CREATE TABLE Tosador (
            CPF			NUMERIC(11)		NOT NULL	PRIMARY KEY,
            nome_tosador	VARCHAR(40)	NOT NULL,
            end_tosador		VARCHAR(80)	NOT NULL,
            email_tosador	VARCHAR(20)	NOT NULL,
            tel_tosador		NUMERIC(9)		NOT NULL,
            salario_tos		FLOAT(9,2)		NOT NULL
        );`;
        execSQLQuery(tableTosador);
    },
    
    createTableProduto() {
        const tableProduto = `CREATE TABLE Produto (
                cod_produto		NUMERIC(5)		NOT NULL	PRIMARY KEY,
                nome_produto	VARCHAR(40)	NOT NULL,
                marca			VARCHAR(20)	NOT NULL,
                valor_unitario	FLOAT(9,2)		NOT NULL,
                qtd_estoque		NUMERIC(5)		NOT NULL
            );`;
        execSQLQuery(tableProduto);
    },
    
    createTableSolicita() {
        const tableSolicita = `CREATE TABLE Solicita (
                fk_Cliente_CPF      NUMERIC(11)		NOT NULL,
                data_solicitacao	DATETIME	NOT NULL
            );`;
        execSQLQuery(tableSolicita);
    },
    
    createTableCompra() {
        const tableCompra = `CREATE TABLE Compra (
            cod_compra			NUMERIC(5)	NOT NULL	PRIMARY KEY,
            data_hora_compra		DATETIME	NOT NULL,
            fk_Produto_cod_produto	NUMERIC(5)	NOT NULL,
            fk_Cliente_CPF		NUMERIC(11)	NOT NULL
        );`;
        execSQLQuery(tableCompra);
    },
    
    createTableServico() {
        const tableServico = `CREATE TABLE Servico (
            cod_servico			NUMERIC(5)	NOT NULL	PRIMARY KEY,
            preco_banho			FLOAT(9,2),
            preco_tosa			FLOAT(9,2),
            servico_TIPO			NUMERIC(1)	NOT NULL,
            fk_Animal_cod_animal	NUMERIC(5)	NOT NULL,
            fk_Tosador_CPF		NUMERIC(11)	NOT NULL
        );`;
        execSQLQuery(tableServico);
    },
    
    createTableConsulta() {
        const tableConsulta = `CREATE TABLE Consulta (
            data_hora_consulta		DATETIME		NOT NULL,
            diagnostico			VARCHAR(80)	NOT NULL,
            valor				FLOAT(9,2)		NOT NULL,
            fk_Veterinario_CRMV	NUMERIC(5)		NOT NULL,
            fk_Animal_cod_animal	NUMERIC(5)		NOT NULL
        );`;
        execSQLQuery(tableConsulta);
    },

    alterTableAnimal(){
        const alterTableAnimal = `ALTER TABLE Animal ADD CONSTRAINT FK_Animal_1
            FOREIGN KEY (fk_Cliente_CPF)
            REFERENCES Cliente(CPF)
            ON DELETE RESTRICT;`;
        execSQLQuery(alterTableAnimal);
    },

    alterTableServico(){
        const alterTableServico = `ALTER TABLE Servico ADD CONSTRAINT FK_Servico_1
            FOREIGN KEY (fk_Animal_cod_animal)
            REFERENCES Animal(cod_animal)
            ON DELETE CASCADE;`;
        
        const alterTableServico2 = `ALTER TABLE Servico ADD CONSTRAINT FK_Servico_2
            FOREIGN KEY (fk_Tosador_CPF)
            REFERENCES Tosador(CPF)
            ON DELETE RESTRICT;`;
        execSQLQuery(alterTableServico);
        execSQLQuery(alterTableServico2);
    },

    alterTableSolicita(){
        const alterTableSolicita = `ALTER TABLE Solicita ADD CONSTRAINT FK_Solicita_1
            FOREIGN KEY (fk_Cliente_CPF)
            REFERENCES Cliente(CPF)
            ON DELETE SET NULL;`;
        execSQLQuery(alterTableSolicita);
    },

    alterTableCompra(){
        const alterTableCompra = `ALTER TABLE Compra ADD CONSTRAINT FK_Compra_1
            FOREIGN KEY (fk_Produto_cod_produto)
            REFERENCES Produto(cod_produto)
            ON DELETE SET NULL;`;
        const alterTableCompra2 = `ALTER TABLE Compra ADD CONSTRAINT FK_Compra_2
            FOREIGN KEY (fk_Cliente_CPF)
            REFERENCES Cliente(CPF)
            ON DELETE SET NULL;`;
        execSQLQuery(alterTableCompra);
        execSQLQuery(alterTableCompra2);
    },

    alterTableConsulta(){
        const alterTableConsulta = `ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_1
            FOREIGN KEY (fk_Veterinario_CRMV)
            REFERENCES Veterinario(CRMV)
            ON DELETE RESTRICT;`;
        const alterTableConsulta2 = `ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_2
            FOREIGN KEY (fk_Animal_cod_animal)
            REFERENCES Animal(cod_animal)
            ON DELETE RESTRICT;`;
        execSQLQuery(alterTableConsulta);
        execSQLQuery(alterTableConsulta2);
    },
    
    createAllTables(){
        this.createTableCliente();
        this.createTableAnimal();
        this.createTableVeterinario();
        this.createTableTosador();
        this.createTableProduto();
        this.createTableSolicita();
        this.createTableCompra();
        this.createTableServico();
        this.createTableConsulta();
        this.alterTableAnimal();
        this.alterTableServico();
        this.alterTableSolicita();
        this.alterTableCompra();
        this.alterTableConsulta();
    }
};