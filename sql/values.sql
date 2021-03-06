-- Cliente
INSERT INTO Cliente (CPF, nome_cliente, end_cliente, email_cliente, tel_cliente) VALUES (12345678910, 'Jaime Lay', 'Rua Esquina 123', 'jaime@gmail.com', 123456789);

-- Veterinario
INSERT INTO Veterinario (CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet ) VALUES (12345, 12345678911, "Ricardo Rolo", "Rua Esquina 1234", "ricardo@gmail.com", "123456780", 3500.00 );

-- Tosador
INSERT INTO Tosador (CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos ) VALUES (12345678912, "Leonardo Andrade", "Rua Esquina 12345", "leonardo@gmail.com", 123456798, 1200.00 );

-- Animal
INSERT INTO Animal (cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF) VALUES (09876, "Leo", "Cachorro", "Nenhuma", "Pug", "Pequeno", 123456789);

-- Produto
INSERT INTO Produto (cod_produto, nome_produto, marca, valor_unitario, qtd_estoque) VALUES (12345, "Ossinho borracha", "Pedigree", 10.00, 5);

-- Solicita
INSERT INTO Solicita (fk_Cliente_CPF, data_solicitacao) VALUES (123456789, 20191115183000);

-- Compra
INSERT INTO Compra (cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF) VALUES (54321, 20191115183100, 12345, 123456789);

-- Serviço
INSERT INTO Servico (cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF)VALUES (21345, 15.00, 15.00, 3, 09876, 12345678912);

-- Consulta
INSERT INTO Consulta (cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal) VALUES (20191115190000, "Foi diagnosticada Infecção Urinária", 150.00, 12345, 09876 );