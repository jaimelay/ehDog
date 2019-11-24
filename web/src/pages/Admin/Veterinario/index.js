import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal, Col } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const VeterinarioContainer = styled.div`
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

export default function Veterinario() {
    const [veterinarios, setVeterinarios] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [veterinarioID, setVeterinarioID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setVeterinarioID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setVeterinarioID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadVeterinarios() {
            const response = await api.get('/veterinarios');
            setVeterinarios(response.data);
        }
        loadVeterinarios();
    }, []);

    async function deleteVeterinario(CRMV){
        await api.delete(`/veterinarios/${CRMV}`);
        window.location.reload(false);
    }

    async function addVeterinario(values){
        const { CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet } = values;
        await api.post(`/veterinarios`, {
            CRMV,
            CPF,
            nome_veterinario,
            end_veterinario,
            email_veterinario,
            tel_veterinario,
            salario_vet
        })
        window.location.reload(false);
    }

    async function updateVeterinario(oldCRMV, values){
        const { CRMV, CPF, nome_veterinario, end_veterinario, email_veterinario, tel_veterinario, salario_vet } = values;
        await api.put(`/veterinarios`, {
            oldCRMV,
            CRMV,
            CPF,
            nome_veterinario,
            end_veterinario,
            email_veterinario,
            tel_veterinario,
            salario_vet
        })
        setVeterinarioID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return(
        <>
        <VeterinarioContainer>
            <HeaderAdmin />
            <Container>
                <h1>Veterinários</h1>
                <Formik
                    initialValues={{ CRMV: '', CPF: '', nome_veterinario: '', end_veterinario: '', email_veterinario: '', tel_veterinario: '', salario_vet: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.CRMV) { errors.CRMV = 'É necessário digitar um CRMV válido.'; }
                        else if(!/^[0-9]{5}$/i.test(values.CRMV)) { errors.CRMV = 'O CRMV deve ter 5 dígitos numéricos.'; }

                        if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                        else if(!/^[0-9]{11}$/i.test(values.CPF)) { errors.CPF = 'O CPF deve ter 11 dígitos numéricos.'; }
                        
                        if (!values.nome_veterinario) { errors.nome_veterinario = 'É necessário digitar um Nome.'; }

                        if (!values.end_veterinario) { errors.end_veterinario = 'É necessário digitar o endereço do veterinario.'; }

                        if (!values.email_veterinario) { errors.email_veterinario = 'É necessário digitar um e-mail.'; }
                        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_veterinario)) { errors.email_veterinario = 'O email é inválido. Exemplo de email válido: email@exemplo.com'; }
                        
                        if (!values.tel_veterinario) { errors.tel_veterinario = 'É necessário digitar um telefone.'; }
                        else if(!/^[0-9]{8,9}$/i.test(values.tel_veterinario)) { errors.tel_veterinario = 'O telefone tem que ser numérico e no min 8 e max 9.'; }

                        if (!values.salario_vet) { errors.salario_vet = 'É necessário digitar um salário.'; }
                        else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.salario_vet)) { errors.salario_vet = 'O salário tem que ser númerico, e com valor decimal. Ex: 10.00'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getVeterinario(CRMV, CPF){
                                const response = await api.get(`/veterinarios/${CRMV}`);
                                const response2 = await api.get(`/veterinario/${CPF}`);
                                if (response.data.length === 0 && response2.data.length === 0) {
                                    addVeterinario(values);
                                } else {
                                    if (response.data.length !== 0) {
                                        setErrors({ CRMV: 'Este CRMV ja está sendo utilizado.' });
                                    }
                                    if (response2.data.length !== 0) {
                                        setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                    }
                                }
                            }
                            getVeterinario(values.CRMV, values.CPF);
                        }, 400);
                    }}
                >
                    {(formAdd) => (
                        <Form noValidate onSubmit={e => {e.stopPropagation(); formAdd.handleSubmit(e);}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>CRMV</th>
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
                                    { veterinarios.length > 0 ? (
                                        <>
                                            { veterinarios.map(veterinario => (
                                                <tr key={veterinario.CRMV}>                    
                                                    <td>{veterinario.CRMV}</td>
                                                    <td>{veterinario.CPF}</td>
                                                    <td>{veterinario.nome_veterinario}</td>
                                                    <td>{veterinario.end_veterinario}</td>
                                                    <td>{veterinario.email_veterinario}</td>
                                                    <td>{veterinario.tel_veterinario}</td>
                                                    <td>{veterinario.salario_vet}</td>
                                                    <td>
                                                        <ButtonContainer>
                                                            <Buttons>
                                                                <Button variant="warning" onClick={() => {setVeterinarioID(veterinario); handleShowModalUpdate();}}>Editar</Button>
                                                                <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <>
                                                                        <Formik
                                                                            initialValues={{ CRMV: `${veterinarioID.CRMV}`, CPF: `${veterinarioID.CPF}`, nome_veterinario: `${veterinarioID.nome_veterinario}`, end_veterinario: `${veterinarioID.end_veterinario}`, email_veterinario: `${veterinarioID.email_veterinario}`, tel_veterinario: `${veterinarioID.tel_veterinario}`, salario_vet: `${veterinarioID.salario_vet}` }}
                                                                            validate={values => {
                                                                                let errors = {};

                                                                                if (!values.CRMV) { errors.CRMV = 'É necessário digitar um CRMV válido.'; }
                                                                                else if(!/^[0-9]{5}$/i.test(values.CRMV)) { errors.CRMV = 'O CRMV deve ter 5 dígitos numéricos.'; }
                                                        
                                                                                if (!values.CPF) { errors.CPF = 'É necessário digitar um CPF válido.'; }
                                                                                else if(!/^[0-9]{11}$/i.test(values.CPF)) { errors.CPF = 'O CPF deve ter 11 dígitos numéricos.'; }
                                                                                
                                                                                if (!values.nome_veterinario) { errors.nome_veterinario = 'É necessário digitar um Nome.'; }
                                                        
                                                                                if (!values.end_veterinario) { errors.end_veterinario = 'É necessário digitar o endereço do veterinario.'; }
                                                        
                                                                                if (!values.email_veterinario) { errors.email_veterinario = 'É necessário digitar um e-mail.'; }
                                                                                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_veterinario)) { errors.email_veterinario = 'O email é inválido. Exemplo de email válido: email@exemplo.com'; }
                                                                                
                                                                                if (!values.tel_veterinario) { errors.tel_veterinario = 'É necessário digitar um telefone.'; }
                                                                                else if(!/^[0-9]{8,9}$/i.test(values.tel_veterinario)) { errors.tel_veterinario = 'O telefone tem que ser numérico e no min 8 e max 9.'; }
                    
                                                                                if (!values.salario_vet) { errors.salario_vet = 'É necessário digitar um salário.'; }
                                                                                else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.salario_vet)) { errors.salario_vet = 'O salário tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                                                                                
                                                                                return errors;
                                                                            }}
                                                                            onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                setTimeout(() => {
                                                                                    async function getVeterinario(CRMV, CPF){
                                                                                        const response = await api.get(`/veterinarios/${CRMV}`);
                                                                                        const response2 = await api.get(`/veterinario/${CPF}`);
                                                                                        if (response.data.length === 0 && response2.data.length === 0) {
                                                                                            updateVeterinario(veterinarioID.CRMV, values);
                                                                                        } else {
                                                                                            if (response.data.length !== 0) {
                                                                                                setErrors({ CRMV: 'Este CRMV ja está sendo utilizado.' });
                                                                                            }
                                                                                            if (response2.data.length !== 0) {
                                                                                                setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                    async function getVeterinario2(CRMV){
                                                                                        const response = await api.get(`/veterinarios/${CRMV}`);
                                                                                        if (response.data.length === 0) {
                                                                                            updateVeterinario(veterinarioID.CRMV, values);
                                                                                        } else {
                                                                                            setErrors({ CRMV: 'Este CRMV ja está sendo utilizado.' });
                                                                                        }
                                                                                    }

                                                                                    async function getVeterinario3(CPF){
                                                                                        const response = await api.get(`/veterinario/${CPF}`);
                                                                                        if (response.data.length === 0) {
                                                                                            updateVeterinario(veterinarioID.CRMV, values);
                                                                                        } else {
                                                                                            setErrors({ CPF: 'Este CPF ja está sendo utilizado.' });
                                                                                        }
                                                                                    }
                                                                                    
                                                                                    if (veterinarioID.CRMV.toString() !== values.CRMV && veterinarioID.CPF.toString() !== values.CPF) {
                                                                                        getVeterinario(values.CRMF, values.CPF);
                                                                                    }else if (veterinarioID.CRMV.toString() !== values.CRMV) {
                                                                                        getVeterinario2(values.CRMV);
                                                                                    } else if (veterinarioID.CPF.toString() !== values.CPF) {
                                                                                        getVeterinario3(values.CPF);
                                                                                    } else { 
                                                                                        updateVeterinario(veterinarioID.CRMV, values);
                                                                                    } 

                                                                                }, 400);
                                                                            }}
                                                                        >
                                                                            {(formEdit) => (
                                                                                <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                    <Form.Row>
                                                                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                                                                            <Form.Label>CRMV*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="CRMV"
                                                                                                value={formEdit.values.CRMV}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.CRMV}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.CRMV}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                                                                                            <Form.Label>CPF*</Form.Label>
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
                                                                                    </Form.Row>

                                                                                    <Form.Group controlId="validationFormik03">
                                                                                        <Form.Label>Nome*</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="nome_veterinario"
                                                                                            value={formEdit.values.nome_veterinario}
                                                                                            onChange={formEdit.handleChange}
                                                                                            isInvalid={!!formEdit.errors.nome_veterinario}
                                                                                        />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                            {formEdit.errors.nome_veterinario}
                                                                                        </Form.Control.Feedback>
                                                                                    </Form.Group>

                                                                                    <Form.Group controlId="validationFormik04">
                                                                                        <Form.Label>Endereço*</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="end_veterinario"
                                                                                            value={formEdit.values.end_veterinario}
                                                                                            onChange={formEdit.handleChange}
                                                                                            isInvalid={!!formEdit.errors.end_veterinario}
                                                                                        />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                            {formEdit.errors.end_veterinario}
                                                                                        </Form.Control.Feedback>
                                                                                    </Form.Group>

                                                                                    <Form.Group controlId="validationFormik05">
                                                                                        <Form.Label>E-mail*</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="email_veterinario"
                                                                                            value={formEdit.values.email_veterinario}
                                                                                            onChange={formEdit.handleChange}
                                                                                            isInvalid={!!formEdit.errors.email_veterinario}
                                                                                        />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                            {formEdit.errors.email_veterinario}
                                                                                        </Form.Control.Feedback>
                                                                                    </Form.Group>

                                                                                    <Form.Group controlId="validationFormik06">
                                                                                    <Form.Label>Telefone*</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="tel_veterinario"
                                                                                            value={formEdit.values.tel_veterinario}
                                                                                            onChange={formEdit.handleChange}
                                                                                            isInvalid={!!formEdit.errors.tel_veterinario}
                                                                                        />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.tel_veterinario}
                                                                                        </Form.Control.Feedback>
                                                                                    </Form.Group>

                                                                                    <Form.Group controlId="validationFormik07">
                                                                                        <Form.Label>Salário*</Form.Label>
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="salario_vet"
                                                                                            value={formEdit.values.salario_vet}
                                                                                            onChange={formEdit.handleChange}
                                                                                            isInvalid={!!formEdit.errors.salario_vet}
                                                                                        />
                                                                                        <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.salario_vet}
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
                                                                    {/* <Modal.Footer>
                                                                    </Modal.Footer> */}
                                                                </Modal>
                                                            </Buttons>
                                                            <Buttons>
                                                                <Button variant="danger" onClick={() => { setVeterinarioID(veterinario); handleShowModalDelete(); }}>Deletar</Button>
                                                                <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {`Você deseja mesmo deletar o veterinario ( ${veterinarioID.nome_veterinario} ) com CRMV ( ${veterinarioID.CRMV} ) ?`}
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <ButtonContainer>
                                                                            <Buttons>
                                                                                <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                    Cancelar
                                                                                </Button>
                                                                            </Buttons>
                                                                            <Buttons>
                                                                                <Button variant="primary" onClick={() => {deleteVeterinario(veterinarioID.CRMV); setVeterinarioID({}); handleCloseModalDelete();}}>
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
                                                        <td></td>
                                                    </tr> 
                                                )}
                                                <tr>
                                            <td>
                                                <Form.Group controlId="validationFormik01">
                                                    <Form.Control
                                                        type="text"
                                                        name="CRMV"
                                                        placeholder="Ex: 55523"
                                                        value={formAdd.values.CRMV}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.CRMV}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.CRMV}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik02">
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
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="nome_veterinario"
                                                        placeholder="Ex: Maria José"
                                                        value={formAdd.values.nome_veterinario}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.nome_veterinario}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.nome_veterinario}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="end_veterinario"
                                                        placeholder="Ex: Rua tal da tal"
                                                        value={formAdd.values.end_veterinario}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.end_veterinario}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.end_veterinario}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                    <Form.Control
                                                        type="text"
                                                        name="email_veterinario"
                                                        placeholder="email@exemplo.com"
                                                        value={formAdd.values.email_veterinario}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.email_veterinario}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.email_veterinario}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik06">
                                                    <Form.Control
                                                        type="text"
                                                        name="tel_veterinario"
                                                        placeholder="Ex: 25413344"
                                                        value={formAdd.values.tel_veterinario}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.tel_veterinario}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.tel_veterinario}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik07">
                                                    <Form.Control
                                                        type="text"
                                                        name="salario_vet"
                                                        placeholder="Ex: 3500.00"
                                                        value={formAdd.values.salario_vet}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.salario_vet}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                            {formAdd.errors.salario_vet}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Veterinário</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Form>
                    )}
                </Formik>
            </Container>
        </VeterinarioContainer>    
        </>
    );
}