import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const ConsultaContainer = styled.div`
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

export default function Compra() {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [compras, setCompras] = useState([]);
    const [compraID, setCompraID] = useState({});
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setCompraID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setCompraID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadClients() {
            const response = await api.get('/clientes');
            setClients(response.data);
        }
        loadClients();
    }, []);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/produtos');
            setProducts(response.data);
        }
        loadProducts();
    }, []);

    useEffect(() => {
        async function loadCompras() {
            const response = await api.get('/compras');
            setCompras(response.data);
        }
        loadCompras();
    }, []);

    async function deleteCompra(cod_compra){
        await api.delete(`/compras/${cod_compra}`);
        window.location.reload(false);
    }

    async function addCompra(values){
        const { cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF } = values;
        await api.post(`/compras`, {
            cod_compra,
            data_hora_compra,
            fk_Produto_cod_produto,
            fk_Cliente_CPF
        })
        window.location.reload(false);
    }

    async function updateCompra(oldCodCompra, values){
        const { cod_compra, data_hora_compra, fk_Produto_cod_produto, fk_Cliente_CPF } = values;
        await api.put(`/compras`, {
            oldCodCompra,
            cod_compra,
            data_hora_compra,
            fk_Produto_cod_produto,
            fk_Cliente_CPF
        })
        setCompraID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return (
        <>
        <ConsultaContainer>
            <HeaderAdmin />
            <Container>
                <h1>Compras</h1>
                <Formik
                    initialValues={{ cod_compra: '', data_hora_compra: '', fk_Produto_cod_produto: '', fk_Cliente_CPF: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.cod_compra) { errors.cod_compra = 'É necessário digitar um código.'; }
                        else if(!/^[0-9]{1,5}$/i.test(values.cod_compra)) { errors.cod_compra = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                        
                        if (!values.data_hora_compra) { errors.data_hora_compra = 'É necessário digitar uma data e hora.'; }

                        if (!values.fk_Produto_cod_produto) { errors.fk_Produto_cod_produto = 'É necessário selecionar um Código Produto.'; }

                        if (!values.fk_Cliente_CPF) { errors.fk_Cliente_CPF = 'É necessário selecionar um CPF do Cliente.'; }
                    
                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getCompra(cod_compra){
                                const response = await api.get(`/compras/${cod_compra}`);
                                if (response.data.length === 0) {
                                    addCompra(values);
                                } else {
                                    setErrors({ cod_compra: 'Este código ja está sendo utilizado.' });
                                }
                            }
                            getCompra(values.cod_compra);
                        }, 400);
                    }}
                >
                    {(formAdd) => (
                        <Form noValidate onSubmit={e => {e.stopPropagation(); formAdd.handleSubmit(e);}}>   
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Data e Hora</th>
                                        <th>Produto</th>
                                        <th>Cliente</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { compras.length > 0 ? (
                                            <>
                                                { compras.map(compra => (
                                                        <tr key={compra.cod_compra}>                    
                                                            <td>{compra.cod_compra}</td>
                                                            <td>{compra.data_hora_compra}</td>
                                                            <td>{compra.fk_Produto_cod_produto}</td>
                                                            <td>{compra.fk_Cliente_CPF}</td>
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning" onClick={() => {setCompraID(compra); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ cod_compra: `${compraID.cod_compra}`, data_hora_compra: `${compraID.data_hora_compra}`, fk_Produto_cod_produto: `${compraID.fk_Produto_cod_produto}`, fk_Cliente_CPF: `${compraID.fk_Cliente_CPF}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.cod_compra) { errors.cod_compra = 'É necessário digitar um código.'; }
                                                                                    else if(!/^[0-9]{1,5}$/i.test(values.cod_compra)) { errors.cod_compra = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                                                                                    
                                                                                    if (!values.data_hora_compra) { errors.data_hora_compra = 'É necessário digitar uma data e hora.'; }
                                                            
                                                                                    if (!values.fk_Produto_cod_produto) { errors.fk_Produto_cod_produto = 'É necessário selecionar um Código Produto.'; }
                                                            
                                                                                    if (!values.fk_Cliente_CPF) { errors.fk_Cliente_CPF = 'É necessário selecionar um CPF do Cliente.'; }
                                                                                
                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        async function getCompra(cod_compra){
                                                                                            const response = await api.get(`/compras/${cod_compra}`);
                                                                                            if (response.data.length === 0) {
                                                                                                updateCompra(compraID.cod_compra, values);
                                                                                            } else {
                                                                                                setErrors({ cod_compra: 'Este código ja está sendo utilizado.' });
                                                                                            }
                                                                                        }
                                                                                        if (compraID.cod_compra.toString() !== values.cod_compra) {
                                                                                            getCompra(values.cod_compra);
                                                                                        } else { 
                                                                                            updateCompra(compraID.cod_compra, values);
                                                                                        } 
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>Código da Compra*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="cod_compra"
                                                                                                value={formEdit.values.cod_compra}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.cod_compra}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.cod_compra}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Data e Hora*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="data_hora_compra"
                                                                                                value={formEdit.values.data_hora_compra}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.data_hora_compra}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.data_hora_compra}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                
                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Produto*</Form.Label>
                                                                                            { products.length > 0 ? (
                                                                                                <Form.Control
                                                                                                    as="select"
                                                                                                    name="fk_Produto_cod_produto"
                                                                                                    value={formEdit.values.fk_Produto_cod_produto}
                                                                                                    onChange={formEdit.handleChange}
                                                                                                    isInvalid={!!formEdit.errors.fk_Produto_cod_produto}
                                                                                                >
                                                                                                        <>
                                                                                                            <option value="" label="Selecione o Código do Produto" />
                                                                                                            { products.map(product => (
                                                                                                                <option
                                                                                                                    value={product.cod_produto}
                                                                                                                    label={`${product.cod_produto} - ${product.nome_produto}`}
                                                                                                                    key={product.cod_produto}
                                                                                                                />
                                                                                                            ))}
                                                                                                        </>
                                                                                                </Form.Control>
                                                                                            ) : (
                                                                                                <div style={{ color: "red" }}>Cadastre algum produto antes</div>
                                                                                            )}
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.fk_Produto_cod_produto}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>Cliente*</Form.Label>
                                                                                            { clients.length > 0 ? (
                                                                                                <Form.Control
                                                                                                    as="select"
                                                                                                    name="fk_Cliente_CPF"
                                                                                                    value={formEdit.values.fk_Cliente_CPF}
                                                                                                    onChange={formEdit.handleChange}
                                                                                                    isInvalid={!!formEdit.errors.fk_Cliente_CPF}
                                                                                                >
                                                                                                        <>
                                                                                                            <option value="" label="Selecione o CPF do Cliente" />
                                                                                                            { clients.map(client => (
                                                                                                                <option
                                                                                                                    value={client.CPF}
                                                                                                                    label ={`${client.CPF} - ${client.nome_cliente}`}
                                                                                                                    key={client.CPF}
                                                                                                                />
                                                                                                            ))}
                                                                                                        </>
                                                                                                </Form.Control>
                                                                                            ) : (
                                                                                                <div style={{ color: "red" }}>Cadastre algum cliente antes</div>
                                                                                            )}
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.fk_Cliente_CPF}
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
                                                                        <Button variant="danger" onClick={() => { setCompraID(compra); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar a compra de ( ${compraID.data_hora_compra} ) com código ( ${compraID.cod_compra} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteCompra(compraID.cod_compra); setCompraID({}); handleCloseModalDelete();}}>
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
                                            </tr>
                                        ) }
                                        <tr>
                                            <td>
                                                <Form.Group controlId="validationFormik01">
                                                    <Form.Control
                                                        type="text"
                                                        name="cod_compra"
                                                        value={formAdd.values.cod_compra}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.cod_compra}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.cod_compra}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik02">
                                                    <Form.Control
                                                        type="text"
                                                        name="data_hora_compra"
                                                        value={formAdd.values.data_hora_compra}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.data_hora_compra}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.data_hora_compra}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    { products.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Produto_cod_produto"
                                                            value={formAdd.values.fk_Produto_cod_produto}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Produto_cod_produto}
                                                        >
                                                                <>
                                                                    <option value="" label="Selecione o Código do Produto" />
                                                                    { products.map(product => (
                                                                        <option
                                                                            value={product.cod_produto}
                                                                            label={`${product.cod_produto} - ${product.nome_produto}`}
                                                                            key={product.cod_produto}
                                                                        />
                                                                    ))}
                                                                </>
                                                        </Form.Control>
                                                    ) : (
                                                        <div style={{ color: "red" }}>Cadastre algum produto antes</div>
                                                    )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Produto_cod_produto}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>

                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    { clients.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Cliente_CPF"
                                                            value={formAdd.values.fk_Cliente_CPF}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Cliente_CPF}
                                                        >
                                                                <>
                                                                    <option value="" label="Selecione o CPF do Cliente" />
                                                                    { clients.map(client => (
                                                                        <option
                                                                            value={client.CPF}
                                                                            label ={`${client.CPF} - ${client.nome_cliente}`}
                                                                            key={client.CPF}
                                                                        />
                                                                    ))}
                                                                </>
                                                        </Form.Control>
                                                    ) : (
                                                        <div style={{ color: "red" }}>Cadastre algum cliente antes</div>
                                                    )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Cliente_CPF}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>

                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Compra</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Form>
                        )}
                </Formik>
            </Container>
        </ConsultaContainer>
        </>
    );
}