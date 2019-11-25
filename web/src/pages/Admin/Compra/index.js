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
    const [animals, setAnimals] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [consultaID, setConsultaID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setConsultaID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setConsultaID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadAnimals() {
            const response = await api.get('/animais');
            setAnimals(response.data);
        }
        loadAnimals();
    }, []);

    useEffect(() => {
        async function loadVeterinarios() {
            const response = await api.get('/veterinarios');
            setVeterinarios(response.data);
        }
        loadVeterinarios();
    }, []);

    useEffect(() => {
        async function loadConsultas() {
            const response = await api.get('/consultas');
            setConsultas(response.data);
        }
        loadConsultas();
    }, []);

    async function deleteConsulta(cod_consulta){
        await api.delete(`/consultas/${cod_consulta}`);
        window.location.reload(false);
    }

    async function addConsulta(values){
        const { cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal } = values;
        await api.post(`/consultas`, {
            cod_consulta,
            data_hora_consulta,
            diagnostico,
            valor,
            fk_Veterinario_CRMV,
            fk_Animal_cod_animal
        })
        window.location.reload(false);
    }

    async function updateConsulta(oldCodConsulta, values){
        const { cod_consulta, data_hora_consulta, diagnostico, valor, fk_Veterinario_CRMV, fk_Animal_cod_animal } = values;
        await api.put(`/animais`, {
            oldCodConsulta,
            cod_consulta,
            data_hora_consulta,
            diagnostico,
            valor,
            fk_Veterinario_CRMV,
            fk_Animal_cod_animal
        })
        setConsultaID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return (
        <>
        <ConsultaContainer>
            <HeaderAdmin />
            <Container>
                <h1>Compra</h1>
                <Formik
                    initialValues={{ cod_consulta: '', data_hora_consulta: '', diagnostico: '', valor: '', fk_Veterinario_CRMV: '', fk_Animal_cod_animal: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.cod_consulta) { errors.cod_consulta = 'É necessário digitar um código.'; }
                        else if(!/^[0-9]{1,5}$/i.test(values.cod_consulta)) { errors.cod_consulta = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                        
                        if (!values.data_hora_consulta) { errors.data_hora_consulta = 'É necessário digitar uma data e hora.'; }

                        // if (!values.diagnostico) { errors.diagnostico = 'É necessário digitar um diagnostico.'; }
                        
                        if (!values.valor) { errors.valor = 'É necessário digitar um valor.'; }
                        else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.valor)) { errors.valor = 'O valor tem que ser númerico, e com valor decimal. Ex: 10.00'; }

                        if (!values.fk_Veterinario_CRMV) { errors.fk_Veterinario_CRMV = 'É necessário selecionar um CRMV.'; }

                        if (!values.fk_Animal_cod_animal) { errors.fk_Animal_cod_animal = 'É necessário selecionar um Código de Animal.'; }
                    
                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getConsulta(cod_consulta){
                                const response = await api.get(`/consultas/${cod_consulta}`);
                                if (response.data.length === 0) {
                                    addConsulta(values);
                                } else {
                                    setErrors({ cod_consulta: 'Este código ja está sendo utilizado.' });
                                }
                            }
                            getConsulta(values.cod_consulta);
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
                                        <th>Diagnóstico</th>
                                        <th>Valor</th>
                                        <th>Veterinário</th>
                                        <th>Animal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { consultas.length > 0 ? (
                                            <>
                                                { consultas.map(consulta => (
                                                        <tr key={consulta.cod_consulta}>                    
                                                            <td>{consulta.cod_consulta}</td>
                                                            <td>{consulta.data_hora_consulta}</td>
                                                            <td>{consulta.diagnostico}</td>
                                                            <td>R$ {consulta.valor}</td>
                                                            <td>{consulta.fk_Veterinario_CRMV}</td>
                                                            <td>{consulta.fk_Animal_cod_animal}</td>
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning" onClick={() => {setConsultaID(consulta); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ cod_consulta: `${consultaID.cod_consulta}`, data_hora_consulta: `${consultaID.data_hora_consulta}`, diagnostico: `${consultaID.diagnostico}`, valor: `${consultaID.valor}`, fk_Veterinario_CRMV: `${consultaID.fk_Veterinario_CRMV}`, fk_Animal_cod_animal: `${consultaID.fk_Animal_cod_animal}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.cod_consulta) { errors.cod_consulta = 'É necessário digitar um código.'; }
                                                                                    else if(!/^[0-9]{1,5}$/i.test(values.cod_consulta)) { errors.cod_consulta = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                                                                                    
                                                                                    if (!values.data_hora_consulta) { errors.data_hora_consulta = 'É necessário digitar uma data e hora.'; }
                                                            
                                                                                    // if (!values.diagnostico) { errors.diagnostico = 'É necessário digitar um diagnóstico.'; }
                                                                                    
                                                                                    if (!values.valor) { errors.valor = 'É necessário digitar um valor.'; }
                                                                                    else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.valor)) { errors.valor = 'O valor tem que ser númerico, e com valor decimal. Ex: 10.00'; }

                                                                                    if (!values.fk_Veterinario_CRMV) { errors.fk_Veterinario_CRMV = 'É necessário selecionar um CRMV.'; }
                                                            
                                                                                    if (!values.fk_Animal_cod_animal) { errors.fk_Animal_cod_animal = 'É necessário selecionar um Código de Animal.'; }
                                                                                
                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        async function getConsulta(cod_consulta){
                                                                                            const response = await api.get(`/consultas/${cod_consulta}`);
                                                                                            if (response.data.length === 0) {
                                                                                                updateConsulta(consultaID.cod_consulta, values);
                                                                                            } else {
                                                                                                setErrors({ cod_consulta: 'Este código ja está sendo utilizado.' });
                                                                                            }
                                                                                        }
                                                                                        if (consultaID.cod_consulta.toString() !== values.cod_consulta) {
                                                                                            getConsulta(values.cod_consulta);
                                                                                        } else { 
                                                                                            updateConsulta(consultaID.cod_consulta, values);
                                                                                        } 
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>Código da Consulta*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="cod_consulta"
                                                                                                value={formEdit.values.cod_consulta}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.cod_consulta}
                                                                                            />
                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                    {formEdit.errors.cod_consulta}
                                                                                                </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Data e Hora*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="data_hora_consulta"
                                                                                                value={formEdit.values.data_hora_consulta}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.data_hora_consulta}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.data_hora_consulta}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Diagnóstico*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="diagnostico"
                                                                                                value={formEdit.values.diagnostico}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.diagnostico}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.diagnostico}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>Valor*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="valor"
                                                                                                value={formEdit.values.valor}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.valor}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.valor}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                
                                                                                        <Form.Group controlId="validationFormik06">
                                                                                            <Form.Label>CRMV do Veterinário*</Form.Label>
                                                                                            { veterinarios.length > 0 ? (
                                                                                            <Form.Control
                                                                                                as="select"
                                                                                                name="fk_Veterinario_CRMV"
                                                                                                value={formEdit.values.fk_Veterinario_CRMV}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.fk_Veterinario_CRMV}
                                                                                            >
                                                                                                <>
                                                                                                <option value="" label="Selecione o CRMV do Veterinário" />
                                                                                                { veterinarios.map(veterinario => (
                                                                                                    <option
                                                                                                        value={veterinario.CRMV}
                                                                                                        label={`${veterinario.CRMV} - ${veterinario.nome_veterinario}`}
                                                                                                        key={veterinario.CRMV}
                                                                                                    />
                                                                                                ))}
                                                                                                </>
                                                                                            </Form.Control>
                                                                                            ) : (
                                                                                                <div style={{ color: "red" }}>Cadastre algum veterinário antes</div>
                                                                                            )}
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.fk_Veterinario_CRMV}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik07">
                                                                                            <Form.Label>Código do Animal*</Form.Label>
                                                                                            <Form.Control
                                                                                                as="select"
                                                                                                name="fk_Animal_cod_animal"
                                                                                                value={formEdit.values.fk_Animal_cod_animal}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.fk_Animal_cod_animal}
                                                                                            >
                                                                                                { animals.length > 0 ? (
                                                                                                    <>
                                                                                                    <option value="" label="Selecione o Código do Animal" />
                                                                                                    { animals.map(animal => (
                                                                                                        <option
                                                                                                            value={animal.cod_animal}
                                                                                                            label ={`${animal.cod_animal} - ${animal.nome_animal}`}
                                                                                                            key={animal.cod_animal}
                                                                                                        />
                                                                                                    ))}
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <div style={{ color: "red" }}>Cadastre algum animal antes</div>
                                                                                                )}
                                                                                            </Form.Control>
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.fk_Animal_cod_animal}
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
                                                                        <Button variant="danger" onClick={() => { setConsultaID(consulta); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar a consulta de ( ${consultaID.data_hora_consulta} ) com código ( ${consultaID.cod_consulta} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteConsulta(consultaID.cod_consulta); setConsultaID({}); handleCloseModalDelete();}}>
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
                                                <td></td>
                                            </tr>
                                        ) }
                                        <tr>
                                            <td>
                                                <Form.Group controlId="validationFormik01">
                                                    <Form.Control
                                                        type="text"
                                                        name="cod_consulta"
                                                        value={formAdd.values.cod_consulta}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.cod_consulta}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.cod_consulta}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                            <Form.Group controlId="validationFormik02">
                                                <Form.Control
                                                    type="text"
                                                    name="data_hora_consulta"
                                                    value={formAdd.values.data_hora_consulta}
                                                    onChange={formAdd.handleChange}
                                                    isInvalid={!!formAdd.errors.data_hora_consulta}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formAdd.errors.data_hora_consulta}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="diagnostico"
                                                        value={formAdd.values.diagnostico}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.diagnostico}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.diagnostico}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="valor"
                                                        value={formAdd.values.valor}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.valor}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.valor}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                        { veterinarios.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Veterinario_CRMV"
                                                            value={formAdd.values.fk_Veterinario_CRMV}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Veterinario_CRMV}
                                                        >
                                                            <>
                                                            <option value="" label="Selecione o CRMV do Veterinário" />
                                                            { veterinarios.map(veterinario => (
                                                                <option
                                                                    value={veterinario.CRMV}
                                                                    label={`${veterinario.CRMV} - ${veterinario.nome_veterinario}`}
                                                                    key={veterinario.CRMV}
                                                                />
                                                            ))}
                                                            </>
                                                        </Form.Control>
                                                        ) : (
                                                            <div style={{ color: "red" }}>Cadastre algum veterinário antes</div>
                                                        )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Veterinario_CRMV}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik07">
                                                        { animals.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Animal_cod_animal"
                                                            value={formAdd.values.fk_Animal_cod_animal}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Animal_cod_animal}
                                                        >
                                                            <>
                                                            <option value="" label="Selecione o Código do Animal" />
                                                            { animals.map(animal => (
                                                                <option
                                                                    value={animal.cod_animal}
                                                                    label ={`${animal.cod_animal} - ${animal.nome_animal}`}
                                                                    key={animal.cod_animal}
                                                                />
                                                            ))}
                                                            </>
                                                        </Form.Control>
                                                        ) : (
                                                            <div style={{ color: "red" }}>Cadastre algum animal antes</div>
                                                        )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Animal_cod_animal}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Consulta</Button>
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