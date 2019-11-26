import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const ServicoContainer = styled.div`
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

export default function Servico() {
    const [servicos, setServicos] = useState([]);
    const [servicosID, setServicosID] = useState({});
    const [animals, setAnimals] = useState([]);
    const [tosadores, setTosadores] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setServicosID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setServicosID({});
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
        async function loadTosadores() {
            const response = await api.get('/tosadores');
            setTosadores(response.data);
        }
        loadTosadores();
    }, []);

    useEffect(() => {
        async function loadServicos() {
            const response = await api.get('/servicos');
            setServicos(response.data);
        }
        loadServicos();
    }, []);

    async function deleteServico(cod_servico){
        await api.delete(`/servicos/${cod_servico}`);
        window.location.reload(false);
    }

    async function addServico(values){
        const { cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF } = values;
        await api.post(`/servicos`, {
            cod_servico,
            preco_banho,
            preco_tosa,
            servico_TIPO,
            fk_Animal_cod_animal,
            fk_Tosador_CPF
        })
        window.location.reload(false);
    }

    async function updateServico(oldCodServico, values){
        const { cod_servico, preco_banho, preco_tosa, servico_TIPO, fk_Animal_cod_animal, fk_Tosador_CPF } = values;
        await api.put(`/servicos`, {
            oldCodServico,
            cod_servico,
            preco_banho,
            preco_tosa,
            servico_TIPO,
            fk_Animal_cod_animal,
            fk_Tosador_CPF
        })
        setServicosID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return (
        <>
        <ServicoContainer>
            <HeaderAdmin />
            <Container>
                <h1>Serviços</h1>
                <Formik
                    initialValues={{ cod_servico: '', preco_banho: '', preco_tosa: '', servico_TIPO: '', fk_Animal_cod_animal: '', fk_Tosador_CPF: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.cod_servico) { errors.cod_servico = 'É necessário digitar um código.'; }
                        else if(!/^[0-9]{1,5}$/i.test(values.cod_servico)) { errors.cod_servico = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                    
                        if (!values.preco_banho) { errors.preco_banho = 'É necessário digitar um preço para o banho.'; }
                        else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.preco_banho)) { errors.preco_banho = 'O preço tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                        
                        if (!values.preco_tosa) { errors.preco_tosa = 'É necessário digitar um preço para a tosa.'; }
                        else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.preco_tosa)) { errors.preco_tosa = 'O preço tem que ser númerico, e com valor decimal. Ex: 10.00'; }

                        if (!values.servico_TIPO) { errors.servico_TIPO = 'É necessário escolher um tipo.'; }

                        if (!values.fk_Animal_cod_animal) { errors.fk_Animal_cod_animal = 'É necessário selecionar um Código de Animal.'; }

                        if (!values.fk_Tosador_CPF) { errors.fk_Tosador_CPF = 'É necessário selecionar um CPF para o Tosador.'; }
                    
                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            async function getServico(cod_servico){
                                const response = await api.get(`/servicos/${cod_servico}`);
                                if (response.data.length === 0) {
                                    addServico(values);
                                } else {
                                    setErrors({ cod_servico: 'Este código ja está sendo utilizado.' });
                                }
                            }
                            getServico(values.cod_servico);
                        }, 400);
                    }}
                >
                    {(formAdd) => (
                        <Form noValidate onSubmit={e => {e.stopPropagation(); formAdd.handleSubmit(e);}}>   
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Preço Banho (R$)</th>
                                        <th>Preço Tosa (R$)</th>
                                        <th>Tipo de Serviço</th>
                                        <th>Animal (Código)</th>
                                        <th>Tosador (CPF)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { servicos.length > 0 ? (
                                            <>
                                                { servicos.map(servico => (
                                                        <tr key={servico.cod_servico}>                    
                                                            <td>{servico.cod_servico}</td>
                                                            <td>R${servico.preco_banho}</td>
                                                            <td>R$ {servico.preco_tosa}</td>
                                                            <td>{servico.servico_TIPO}</td>
                                                            <td>{servico.fk_Animal_cod_animal}</td>
                                                            <td>{servico.fk_Tosador_CPF}</td>
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning" onClick={() => {setServicosID(servico); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ cod_servico: `${servicosID.cod_servico}`, preco_banho: `${servicosID.preco_banho}`, preco_tosa: `${servicosID.preco_tosa}`, servico_TIPO: `${servicosID.servico_TIPO}`, fk_Animal_cod_animal: `${servicosID.fk_Animal_cod_animal}`, fk_Tosador_CPF: `${servicosID.fk_Tosador_CPF}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.cod_servico) { errors.cod_servico = 'É necessário digitar um código.'; }
                                                                                    else if(!/^[0-9]{1,5}$/i.test(values.cod_servico)) { errors.cod_servico = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                                                                                
                                                                                    if (!values.preco_banho) { errors.preco_banho = 'É necessário digitar um preço para o banho.'; }
                                                                                    else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.preco_banho)) { errors.preco_banho = 'O preço tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                                                                                    
                                                                                    if (!values.preco_tosa) { errors.preco_tosa = 'É necessário digitar um preço para a tosa.'; }
                                                                                    else if(!/^[0-9]+\.[0-9]{2,2}$/i.test(values.preco_tosa)) { errors.preco_tosa = 'O preço tem que ser númerico, e com valor decimal. Ex: 10.00'; }
                                                            
                                                                                    if (!values.servico_TIPO) { errors.servico_TIPO = 'É necessário escolher um tipo.'; }
                                                            
                                                                                    if (!values.fk_Animal_cod_animal) { errors.fk_Animal_cod_animal = 'É necessário selecionar um Código de Animal.'; }
                                                            
                                                                                    if (!values.fk_Tosador_CPF) { errors.fk_Tosador_CPF = 'É necessário selecionar um CPF para o Tosador.'; }
                                                                                
                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        async function getServico(cod_servico){
                                                                                            const response = await api.get(`/servicos/${cod_servico}`);
                                                                                            if (response.data.length === 0) {
                                                                                                updateServico(servicosID.cod_servico, values);
                                                                                            } else {
                                                                                                setErrors({ cod_servico: 'Este código ja está sendo utilizado.' });
                                                                                            }
                                                                                        }
                                                                                        if (servicosID.cod_servico.toString() !== values.cod_servico) {
                                                                                            getServico(values.cod_servico);
                                                                                        } else { 
                                                                                            updateServico(servicosID.cod_servico, values);
                                                                                        } 
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>Código do Serviço*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="cod_servico"
                                                                                                value={formEdit.values.cod_servico}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.cod_servico}
                                                                                                placeholder="Ex: 54321"
                                                                                            />
                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                    {formEdit.errors.cod_servico}
                                                                                                </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Preço Banho (R$)*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="preco_banho"
                                                                                                value={formEdit.values.preco_banho}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.preco_banho}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.preco_banho}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Preço Tosa (R$)*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="preco_tosa"
                                                                                                value={formEdit.values.preco_tosa}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.preco_tosa}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.preco_tosa}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>Tipo de Serviço*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="servico_TIPO"
                                                                                                value={formEdit.values.servico_TIPO}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.servico_TIPO}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.servico_TIPO}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                
                                                                                        <Form.Group controlId="validationFormik05">
                                                                                            <Form.Label>Código do Animal*</Form.Label>
                                                                                            { animals.length > 0 ? (
                                                                                                <Form.Control
                                                                                                    as="select"
                                                                                                    name="fk_Animal_cod_animal"
                                                                                                    value={formEdit.values.fk_Animal_cod_animal}
                                                                                                    onChange={formEdit.handleChange}
                                                                                                    isInvalid={!!formEdit.errors.fk_Animal_cod_animal}
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
                                                                                                {formEdit.errors.fk_Animal_cod_animal}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik06">
                                                                                            <Form.Label>CPF do Tosador*</Form.Label>
                                                                                            { tosadores.length > 0 ? (
                                                                                                <Form.Control
                                                                                                    as="select"
                                                                                                    name="fk_Tosador_CPF"
                                                                                                    value={formEdit.values.fk_Tosador_CPF}
                                                                                                    onChange={formEdit.handleChange}
                                                                                                    isInvalid={!!formEdit.errors.fk_Tosador_CPF}
                                                                                                >
                                                                                                    <>
                                                                                                        <option value="" label="Selecione o CPF do Tosador" />
                                                                                                        { tosadores.map(tosador => (
                                                                                                            <option
                                                                                                                value={tosador.CRMV}
                                                                                                                label={`${tosador.CRMV} - ${tosador.nome_tosador}`}
                                                                                                                key={tosador.CRMV}
                                                                                                            />
                                                                                                        ))}
                                                                                                    </>
                                                                                                </Form.Control>
                                                                                            ) : (
                                                                                                <div style={{ color: "red" }}>Cadastre algum tosador antes</div>
                                                                                            )}
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.fk_Tosador_CPF}
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
                                                                        <Button variant="danger" onClick={() => { setServicosID(servico); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar o serviço de tipo ( ${servicosID.servico_TIPO} ) com código ( ${servicosID.cod_servico} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteServico(servicosID.cod_servico); setServicosID({}); handleCloseModalDelete();}}>
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
                                                        name="cod_servico"
                                                        value={formAdd.values.cod_servico}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.cod_servico}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.cod_servico}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>

                                            <td>
                                            <Form.Group controlId="validationFormik02">
                                                <Form.Control
                                                    type="text"
                                                    name="preco_banho"
                                                    value={formAdd.values.preco_banho}
                                                    onChange={formAdd.handleChange}
                                                    isInvalid={!!formAdd.errors.preco_banho}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formAdd.errors.preco_banho}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            </td>

                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="preco_tosa"
                                                        value={formAdd.values.preco_tosa}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.preco_tosa}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.preco_tosa}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>

                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="servico_TIPO"
                                                        value={formAdd.values.servico_TIPO}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.servico_TIPO}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.servico_TIPO}
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
                                                <Form.Group controlId="validationFormik05">
                                                    { tosadores.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Tosador_CPF"
                                                            value={formAdd.values.fk_Tosador_CPF}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Tosador_CPF}
                                                        >
                                                            <>
                                                                <option value="" label="Selecione o CPF do tosador" />
                                                                { tosadores.map(tosador => (
                                                                    <option
                                                                        value={tosador.CPF}
                                                                        label={`${tosador.CPF} - ${tosador.nome_tosador}`}
                                                                        key={tosador.CPF}
                                                                    />
                                                                ))}
                                                            </>
                                                        </Form.Control>
                                                    ) : (
                                                        <div style={{ color: "red" }}>Cadastre algum tosador antes</div>
                                                    )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Tosador_CPF}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>

                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Serviço</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Form>
                        )}
                </Formik>
            </Container>
        </ServicoContainer>
        </>
    );
}