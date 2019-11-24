import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const ClienteContainer = styled.div`
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

export default function Cliente() {
    const [customers, setcustomers] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [customerID, setCustomerID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setCustomerID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setCustomerID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadcustomers() {
            const response = await api.get('/clientes');
            setcustomers(response.data);
        }
        loadcustomers();
    }, []);
    async function deleteCliente(CPF){
        await api.delete(`/clientes/${CPF}`);
        window.location.reload(false);
    }

    async function addCliente(values){
        const { CPF, nome_cliente, end_cliente, email_cliente, tel_cliente } = values;
        await api.post(`/clientes`, {
            CPF,
            nome_cliente,
            end_cliente,
            email_cliente,
            tel_cliente
        })
        window.location.reload(false);
    }

    async function updateCliente( values){
        const { CPF, nome_cliente, end_cliente, email_cliente, tel_cliente } = values;
        await api.put(`/clientes`, {
            CPF,
            nome_cliente,
            end_cliente,
            email_cliente,
            tel_cliente
        })
        setCustomerID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }
    return(<>
            <ClienteContainer><HeaderAdmin />
            <Container>
            <h1>Clientes</h1>
            <Formik
                    initialValues={{ CPF: '', nome_cliente: '', end_cliente: '', email_cliente: '', tel_cliente: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                        else if(!/^[0-9]{11}$/i.test(values.CPF)) { errors.CPF = 'O CPF deve ter 11 dígitos numéricos.'; }
                        
                        if (!values.nome_cliente) { errors.nome_cliente = 'É necessário digitar um Nome.'; }

                        if (!values.end_cliente) { errors.end_cliente = 'É necessário digitar o endereço do cliente.'; }

                        if (!values.email_cliente) { errors.email_cliente = 'É necessário digitar um e-mail.'; }
                        //else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.email_cliente)) { errors.email_cliente = 'O valor tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                        
                        if (!values.tel_cliente) { errors.tel_cliente = 'É necessário digitar um telefone.'; }
                        //else if(!/^[0-9]{1,7}$/i.test(values.tel_cliente)) { errors.tel_cliente = 'A quantidade tem que ser númerica.'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getCliente(CPF){
                                const response = await api.get(`/clientes/${CPF}`);
                                if (response.data.length === 0) {
                                    addCliente(values);
                                } else {
                                    setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                }
                            }
                            getCliente(values.CPF);
                        }, 400);
                    }}
                >
                    {(formAdd) => (
                        <Form noValidate onSubmit={e => {e.stopPropagation(); formAdd.handleSubmit(e);}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>CPF</th>
                                        <th>Nome</th>
                                        <th>Endereço</th>
                                        <th>E-mail</th>
                                        <th>Telefone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { customers.length > 0 ? (
                                            <>
                                                { customers.map(customer => (
                                                        <tr key={customer.CPF}>                    
                                                            <td>{customer.CPF}</td>
                                                            <td>{customer.nome_cliente}</td>
                                                            <td>{customer.end_cliente}</td>
                                                            <td>{customer.email_cliente}</td>
                                                            <td>{customer.tel_cliente}</td>
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning" onClick={() => {setCustomerID(customer); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ CPF: `${customerID.CPF}`, nome_cliente: `${customerID.nome_cliente}`, end_cliente: `${customerID.end_cliente}`, email_cliente: `${customerID.email_cliente}`, tel_cliente: `${customerID.tel_cliente}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                                                                                    if (!values.nome_cliente) { errors.nome_cliente = 'É necessário digitar um nome.'; }
                                                                                    if (!values.end_cliente) { errors.end_cliente = 'É necessário digitar um endereço.'; }
                                                                                    if (!values.email_cliente) { errors.email_cliente = 'É necessário digitar um e-mail válido.'; }
                                                                                    if (!values.tel_cliente) { errors.tel_cliente = 'É necessário digitar um telefone.'; }
                        
                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        updateCliente( values);
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>CPF do Cliente*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="CPF"
                                                                                                value={formEdit.values.CPF}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.CPF}
                                                                                            />
                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                    {formEdit.errors.CPF}
                                                                                                </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Nome do Cliente*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="nome_cliente"
                                                                                                value={formEdit.values.nome_cliente}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.nome_cliente}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.nome_cliente}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                                                    

                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Endereço*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="end_cliente"
                                                                                                value={formEdit.values.end_cliente}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.end_cliente}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.end_cliente}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>e-mail*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="email_cliente"
                                                                                                value={formEdit.values.email_cliente}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.email_cliente}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.email_cliente}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik05">
                                                                                            <Form.Label>Telefone*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="tel_cliente"
                                                                                                value={formEdit.values.tel_cliente}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.tel_cliente}
                                                                                            />
                                                                                
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.tel_cliente}
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
                                                                        <Button variant="danger" onClick={() => { setCustomerID(customer); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar o cliente ( ${customerID.nome_cliente} ) com CPF ( ${customerID.CPF} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteCliente(customerID.CPF); setCustomerID({}); handleCloseModalDelete();}}>
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
                                                ):(
                                                    <tr>                    
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                </tr> )}
                                                <tr>
                                            <td>
                                                <Form.Group controlId="validationFormik01">
                                                    <Form.Control
                                                        type="text"
                                                        name="CPF"
                                                        placeholder="Ex: 12345678910"
                                                        value={formAdd.values.CPF}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.CPF}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.CPF}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik02">
                                                    <Form.Control
                                                        type="text"
                                                        name="nome_cliente"
                                                        placeholder="Ex: Maria José"
                                                        value={formAdd.values.nome_cliente}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.nome_cliente}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.nome_cliente}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="end_cliente"
                                                        placeholder="Digite a end_cliente"
                                                        value={formAdd.values.end_cliente}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.end_cliente}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.end_cliente}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="email_cliente"
                                                        placeholder="Ex: mariajose@gmail.com"
                                                        value={formAdd.values.email_cliente}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.email_cliente}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.email_cliente}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                    <Form.Control
                                                        type="text"
                                                        name="tel_cliente"
                                                        placeholder="Ex: 26522626"
                                                        value={formAdd.values.tel_cliente}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.tel_cliente}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.tel_cliente}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Cliente</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                                
                                </tbody>
                                </Table>
                                </Form>
            )}
            </Formik>
            </Container>
            
            </ClienteContainer>    
    
        </>
    );

    }