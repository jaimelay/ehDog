import React, { useState, useEffect } from 'react';

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

export default function Produto() {
    const [products, setProducts] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [productID, setProductID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setProductID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setProductID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

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

    async function updateProduct(oldCodProduto, values){
        const { cod_produto, nome_produto, marca, valor_unitario, qtd_estoque } = values;
        await api.put(`/produtos`, {
            oldCodProduto,
            cod_produto,
            nome_produto,
            marca,
            valor_unitario,
            qtd_estoque
        })
        setProductID({});
        handleCloseModalUpdate();
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
                    {(formAdd) => (
                        <Form noValidate onSubmit={e => {e.stopPropagation(); formAdd.handleSubmit(e);}}>   
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
                                                                        <Button variant="warning" onClick={() => {setProductID(product); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ cod_produto: `${productID.cod_produto}`, nome_produto: `${productID.nome_produto}`, marca: `${productID.marca}`, valor_unitario: `${productID.valor_unitario}`, qtd_estoque: `${productID.qtd_estoque}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.cod_produto) { errors.cod_produto = 'É necessário digitar um código.'; }
                                                                                    if (!values.nome_produto) { errors.nome_produto = 'É necessário digitar um nome.'; }
                                                                                    if (!values.marca) { errors.marca = 'É necessário digitar uma marca.'; }
                                                                                    if (!values.valor_unitario) { errors.valor_unitario = 'É necessário digitar um valor unitário.'; }
                                                                                    if (!values.qtd_estoque) { errors.qtd_estoque = 'É necessário digitar uma quantidade.'; }
                        
                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        updateProduct(productID.cod_produto, values);
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>Código do Produto*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="cod_produto"
                                                                                                value={formEdit.values.cod_produto}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.cod_produto}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.cod_produto}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Nome do Produto*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="nome_produto"
                                                                                                value={formEdit.values.nome_produto}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.nome_produto}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.nome_produto}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                                                    

                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Marca*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="marca"
                                                                                                value={formEdit.values.marca}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.marca}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.marca}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>Valor Unitário*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="valor_unitario"
                                                                                                value={formEdit.values.valor_unitario}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.valor_unitario}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.valor_unitario}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik05">
                                                                                            <Form.Label>Quantidade em Estoque*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="qtd_estoque"
                                                                                                value={formEdit.values.qtd_estoque}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.qtd_estoque}
                                                                                            />
                                                                                
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.qtd_estoque}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                                                        <ButtonContainer>
                                                                                            <Buttons>
                                                                                                <Button type="submit" onClick={() => {formEdit.submitForm();}}>Salvar</Button>
                                                                                            </Buttons>
                                                                                            <Buttons>
                                                                                                <Button variant="secondary" onClick={handleCloseModalUpdate}>
                                                                                                    Cancelar
                                                                                                </Button>
                                                                                            </Buttons>
                                                                                        </ButtonContainer>
                                                                                    </Form>
                                                                                )}
                                                                            </Formik>
                                                                            </>
                                                                            </Modal.Body>
                                                                            <Modal.Footer></Modal.Footer>
                                                                        </Modal>
                                                                    </Buttons>
                                                                    <Buttons>
                                                                        <Button variant="danger" onClick={() => { setProductID(product); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar o produto ( ${productID.nome_produto} ) com código ( ${productID.cod_produto} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteProduct(productID.cod_produto); setProductID({}); handleCloseModalDelete();}}>
                                                                                            Deletar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                </ButtonContainer>
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
                                                        value={formAdd.values.cod_produto}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.cod_produto}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik02">
                                                    <Form.Control
                                                        type="text"
                                                        name="nome_produto"
                                                        placeholder="Digite o nome"
                                                        value={formAdd.values.nome_produto}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.nome_produto}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="marca"
                                                        placeholder="Digite a marca"
                                                        value={formAdd.values.marca}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.marca}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="valor_unitario"
                                                        placeholder="Ex: 10.00"
                                                        value={formAdd.values.valor_unitario}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.valor_unitario}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                    <Form.Control
                                                        type="text"
                                                        name="qtd_estoque"
                                                        placeholder="Ex: 5"
                                                        value={formAdd.values.qtd_estoque}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.qtd_estoque}
                                                    />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Produto</Button>
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