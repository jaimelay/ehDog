import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const TosadorContainer = styled.div`
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

export default function Tosador() {
    const [tosadores, setTosadores] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [tosadorID, setTosadorID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setTosadorID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setTosadorID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadTosadores() {
            const response = await api.get('/tosadores');
            setTosadores(response.data);
        }
        loadTosadores();
    }, []);

    async function deleteTosador(CPF){
        await api.delete(`/tosadores/${CPF}`);
        window.location.reload(false);
    }

    async function addTosador(values){
        const { CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos } = values;
        await api.post(`/tosadores`, {
            CPF,
            nome_tosador,
            end_tosador,
            email_tosador,
            tel_tosador,
            salario_tos
        })
        window.location.reload(false);
    }

    async function updateTosador(oldCPF, values){
        const { CPF, nome_tosador, end_tosador, email_tosador, tel_tosador, salario_tos } = values;
        await api.put(`/tosadores`, {
            oldCPF,
            CPF,
            nome_tosador,
            end_tosador,
            email_tosador,
            tel_tosador,
            salario_tos
        })
        setTosadorID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return(
        <>
        <TosadorContainer>
            <HeaderAdmin />
            <Container>
                <h1>Tosadores</h1>
                <Formik
                    initialValues={{ CPF: '', nome_tosador: '', end_tosador: '', email_tosador: '', tel_tosador: '', salario_tos: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                        else if(!/^[0-9]{11}$/i.test(values.CPF)) { errors.CPF = 'O CPF deve ter 11 dígitos numéricos.'; }
                        
                        if (!values.nome_tosador) { errors.nome_tosador = 'É necessário digitar um Nome.'; }

                        if (!values.end_tosador) { errors.end_tosador = 'É necessário digitar o endereço do tosador.'; }

                        if (!values.email_tosador) { errors.email_tosador = 'É necessário digitar um e-mail.'; }
                        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_tosador)) { errors.email_tosador = 'O email é inválido. Exemplo de email válido: email@exemplo.com'; }
                        
                        if (!values.tel_tosador) { errors.tel_tosador = 'É necessário digitar um telefone.'; }
                        else if(!/^[0-9]{8,9}$/i.test(values.tel_tosador)) { errors.tel_tosador = 'O telefone tem que ser numérico e no min 8 e max 9.'; }

                        if (!values.salario_tos) { errors.salario_tos = 'É necessário digitar um salário.'; }
                        else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.salario_tos)) { errors.salario_tos = 'O salário tem que ser númerico, e com valor decimal. Ex: 10.00'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getTosador(CPF){
                                const response = await api.get(`/tosadores/${CPF}`);
                                if (response.data.length === 0) {
                                    addTosador(values);
                                } else {
                                    setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                }
                            }
                            getTosador(values.CPF);
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
                                        <th>Salário</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tosadores.length > 0 ? (
                                        <>
                                            { tosadores.map(tosador => (
                                                <tr key={tosador.CPF}>                    
                                                    <td>{tosador.CPF}</td>
                                                    <td>{tosador.nome_tosador}</td>
                                                    <td>{tosador.end_tosador}</td>
                                                    <td>{tosador.email_tosador}</td>
                                                    <td>{tosador.tel_tosador}</td>
                                                    <td>{tosador.salario_tos}</td>
                                                    <td>
                                                        <ButtonContainer>
                                                            <Buttons>
                                                                <Button variant="warning" onClick={() => {setTosadorID(tosador); handleShowModalUpdate();}}>Editar</Button>
                                                                <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                    <>
                                                                    <Formik
                                                                        initialValues={{ CPF: `${tosadorID.CPF}`, nome_tosador: `${tosadorID.nome_tosador}`, end_tosador: `${tosadorID.end_tosador}`, email_tosador: `${tosadorID.email_tosador}`, tel_tosador: `${tosadorID.tel_tosador}`, salario_tos: `${tosadorID.salario_tos}` }}
                                                                        validate={values => {
                                                                            let errors = {};

                                                                            if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                                                                            else if(!/^[0-9]{11}$/i.test(values.CPF)) { errors.CPF = 'O CPF deve ter 11 dígitos numéricos.'; }
                                                                            
                                                                            if (!values.nome_tosador) { errors.nome_tosador = 'É necessário digitar um Nome.'; }
                                                    
                                                                            if (!values.end_tosador) { errors.end_tosador = 'É necessário digitar o endereço do tosador.'; }
                                                    
                                                                            if (!values.email_tosador) { errors.email_tosador = 'É necessário digitar um e-mail.'; }
                                                                            else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_tosador)) { errors.email_tosador = 'O email é inválido. Exemplo de email válido: email@exemplo.com'; }
                                                                            
                                                                            if (!values.tel_tosador) { errors.tel_tosador = 'É necessário digitar um telefone.'; }
                                                                            else if(!/^[0-9]{8,9}$/i.test(values.tel_tosador)) { errors.tel_tosador = 'O telefone tem que ser numérico e no min 8 e max 9.'; }
                
                                                                            if (!values.salario_tos) { errors.salario_tos = 'É necessário digitar um salário.'; }
                                                                            else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.salario_tos)) { errors.salario_tos = 'O salário tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                                                                            
                                                                            return errors;
                                                                        }}
                                                                        onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                            setTimeout(() => {
                                                                                async function getTosador(CPF){
                                                                                    const response = await api.get(`/tosadores/${CPF}`);
                                                                                    if (response.data.length === 0) {
                                                                                        updateTosador(tosadorID.CPF, values);
                                                                                    } else {
                                                                                        setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                                                                    }
                                                                                }
                                                                                if (tosadorID.CPF.toString() !== values.CPF) {
                                                                                    getTosador(values.CPF);
                                                                                } else { 
                                                                                    updateTosador(tosadorID.CPF, values);
                                                                                } 
                                                                            }, 400);
                                                                        }}
                                                                    >
                                                                        {(formEdit) => (
                                                                            <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                <Form.Group controlId="validationFormik01">
                                                                                    <Form.Label>CPF do Tosador*</Form.Label>
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
                                                                                    <Form.Label>Nome do Tosador*</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="nome_tosador"
                                                                                        value={formEdit.values.nome_tosador}
                                                                                        onChange={formEdit.handleChange}
                                                                                        isInvalid={!!formEdit.errors.nome_tosador}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                        {formEdit.errors.nome_tosador}
                                                                                    </Form.Control.Feedback>
                                                                                </Form.Group>
                                                                            

                                                                                <Form.Group controlId="validationFormik03">
                                                                                    <Form.Label>Endereço*</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="end_tosador"
                                                                                        value={formEdit.values.end_tosador}
                                                                                        onChange={formEdit.handleChange}
                                                                                        isInvalid={!!formEdit.errors.end_tosador}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                        {formEdit.errors.end_tosador}
                                                                                    </Form.Control.Feedback>
                                                                                </Form.Group>

                                                                                <Form.Group controlId="validationFormik04">
                                                                                    <Form.Label>E-mail*</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="email_tosador"
                                                                                        value={formEdit.values.email_tosador}
                                                                                        onChange={formEdit.handleChange}
                                                                                        isInvalid={!!formEdit.errors.email_tosador}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                        {formEdit.errors.email_tosador}
                                                                                    </Form.Control.Feedback>
                                                                                </Form.Group>

                                                                                <Form.Group controlId="validationFormik05">
                                                                                <Form.Label>Telefone*</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="tel_tosador"
                                                                                        value={formEdit.values.tel_tosador}
                                                                                        onChange={formEdit.handleChange}
                                                                                        isInvalid={!!formEdit.errors.tel_tosador}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                            {formEdit.errors.tel_tosador}
                                                                                    </Form.Control.Feedback>
                                                                                </Form.Group>

                                                                                <Form.Group controlId="validationFormik06">
                                                                                <Form.Label>Salário*</Form.Label>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="salario_tos"
                                                                                        value={formEdit.values.salario_tos}
                                                                                        onChange={formEdit.handleChange}
                                                                                        isInvalid={!!formEdit.errors.salario_tos}
                                                                                    />
                                                                                    <Form.Control.Feedback type="invalid">
                                                                                            {formEdit.errors.salario_tos}
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
                                                                <Button variant="danger" onClick={() => { setTosadorID(tosador); handleShowModalDelete(); }}>Deletar</Button>
                                                                <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {`Você deseja mesmo deletar o tosador ( ${tosadorID.nome_tosador} ) com CPF ( ${tosadorID.CPF} ) ?`}
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <ButtonContainer>
                                                                            <Buttons>
                                                                                <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                    Cancelar
                                                                                </Button>
                                                                            </Buttons>
                                                                            <Buttons>
                                                                                <Button variant="primary" onClick={() => {deleteTosador(tosadorID.CPF); setTosadorID({}); handleCloseModalDelete();}}>
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
                                                        <td></td>
                                                    </tr> 
                                                )}
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
                                                        name="nome_tosador"
                                                        placeholder="Ex: Maria José"
                                                        value={formAdd.values.nome_tosador}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.nome_tosador}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.nome_tosador}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="end_tosador"
                                                        placeholder="Ex: Rua tal da tal"
                                                        value={formAdd.values.end_tosador}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.end_tosador}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.end_tosador}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="email_tosador"
                                                        placeholder="email@exemplo.com"
                                                        value={formAdd.values.email_tosador}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.email_tosador}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.email_tosador}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                    <Form.Control
                                                        type="text"
                                                        name="tel_tosador"
                                                        placeholder="Ex: 25413344"
                                                        value={formAdd.values.tel_tosador}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.tel_tosador}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.tel_tosador}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik06">
                                                    <Form.Control
                                                        type="text"
                                                        name="salario_tos"
                                                        placeholder="Ex: 3500.00"
                                                        value={formAdd.values.salario_tos}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.salario_tos}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.salario_tos}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Tosador</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Form>
                    )}
                </Formik>
            </Container>
        </TosadorContainer>    
        </>
    );
}