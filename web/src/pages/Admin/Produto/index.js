import React, { useState, useEffect } from 'react';

import { Formik, Field } from 'formik';
import { Form, Container, Table, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const ProductContainer = styled.div`
    display: flex
    flex-direction: column;
`;

const FormContainer = styled.div`
    width: 100%;
`;

export default function Produto() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/produtos');
            setProducts(response.data);
        }
        loadProducts();
    }, []);

    async function deleteProduct(cod_produto){
        await api.delete(`/produtos/${cod_produto}`);
    }

    async function addProduct(cod_produto, nome_produto, marca, valor_unitario, qtd_estoque){
        await api.post(`/produtos`, {
            body: {
                cod_produto,
                nome_produto,
                marca,
                valor_unitario,
                qtd_estoque
            }
        })
    }

    return (
        <>
        <ProductContainer>
            <HeaderAdmin />
            <Container>
                <h1>Listagem de Produtos</h1>
                <Formik
                    initialValues={{ cod_produto: '', nome_produto: '', marca: '', valor_unitario: '', qtd_estoque: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.cod_produto) { errors.cod_produto = 'É necessário digitar um Código.'; }

                        if (!values.nome_produto) { errors.nome_produto = 'É necessário digitar um Nome.'; }

                        if (!values.marca) { errors.marca = 'É necessário digitar uma marca.'; }

                        if (!values.firstName) { errors.firstName = 'É necessário digitar seu nome.'; }

                        if (!values.lastName) { errors.lastName = 'É necessário digitar seu sobrenome.'; }

                        if (!values.email) {
                            errors.email = 'É necessário digitar algum e-mail.';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Endereço de e-mail inválido.';
                        }

                        if (!values.terms) { errors.terms = 'É necessário aceitar os termos e regras.'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            addProduct(values.cod_produto, values.nome_produto, values.marca, values.valor_unitario, values.qtd_estoque);
                        }, 400);
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>   
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>Marca</th>
                                        <th>Valor</th>
                                        <th>Estoque</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { products.length > 0 ? (
                                            <>
                                                { products.map(product => (
                                                        <tr key={product.cod_produto}>                    
                                                            <td>{product.cod_produto}</td>
                                                            <td>{product.nome_produto}</td>
                                                            <td>{product.marca}</td>
                                                            <td>R$ {product.valor_unitario}</td>
                                                            <td>{product.qtd_estoque}</td>
                                                            <td><Button variant="warning">Editar</Button>
                                                                <Button variant="danger" onClick={() => deleteProduct(product.cod_produto)}>Deletar</Button></td>
                                                        </tr>
                                                ))}
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="validationFormik01">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="cod_produto"
                                                                        placeholder="Ex: 12345"
                                                                        value={values.cod_produto}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.cod_produto}
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group controlId="validationFormik02">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="nome_produto"
                                                                        placeholder="Digite o nome"
                                                                        value={values.nome_produto}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.nome_produto}
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group controlId="validationFormik03">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="marca"
                                                                        placeholder="Digite a marca"
                                                                        value={values.marca}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.marca}
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group controlId="validationFormik04">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="valor_unitario"
                                                                        placeholder="Ex: 10.00"
                                                                        value={values.valor_unitario}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.valor_unitario}
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group controlId="validationFormik05">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="qtd_estoque"
                                                                        placeholder="Ex: 5"
                                                                        value={values.qtd_estoque}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.qtd_estoque}
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Button type="submit">Adicionar Produto</Button>
                                                            </td>
                                                        </tr>
                                            </>
                                        ) : (
                                            <tr>                    
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ) }
                                </tbody>
                            </Table>
                        </Form>
                        )}
                </Formik>
            </Container>
        </ProductContainer>
        </>
    );
}