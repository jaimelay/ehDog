import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';


const ProductContainer = styled.div`
    display: flex
    flex-direction: column;

    .container {
        margin: 15px auto;
    }

    .container h1 {
        font-size: 40px;
        font-color: #000;
        font-weight: bold;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

const Buttons = styled.div`
    margin: 0 5px;
`;

export default function Produto({ history }) {
    const [products, setProducts] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/produtos');
            setProducts(response.data);
        }
        loadProducts();
    }, []);

    async function deleteProduct(cod_produto){
        await api.delete(`/produtos/${cod_produto}`);
        window.location.reload(false);
    }

    async function addProduct(values){
        const { cod_produto, nome_produto, marca, valor_unitario, qtd_estoque } = values;
        await api.post(`/produtos`, {
            cod_produto,
            nome_produto,
            marca,
            valor_unitario,
            qtd_estoque
        })
        window.location.reload(false);
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

                        if (!values.valor_unitario) { errors.valor_unitario = 'É necessário digitar um valor.'; }

                        if (!values.qtd_estoque) { errors.qtd_estoque = 'É necessário digitar a quantidade.'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            addProduct(values);
                        }, 400);
                    }}
                >
                    {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
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
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning">Editar</Button>
                                                                    </Buttons>
                                                                    <Buttons>
                                                                        <Button variant="danger" onClick={handleShowModalDelete}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={false}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar o produto ( ${product.nome_produto} ) com o código ( ${product.cod_produto} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                            <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                Cancelar
                                                                            </Button>
                                                                            <Button variant="primary" onClick={() => {deleteProduct(product.cod_produto); handleCloseModalDelete();}}>
                                                                                Deletar
                                                                            </Button>
                                                                            </Modal.Footer>
                                                                        </Modal>
                                                                    </Buttons>
                                                                </ButtonContainer>
                                                            </td>
                                                        </tr>
                                                ))}
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
                                                <Buttons>
                                                    <Button type="submit">Adicionar Produto</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
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