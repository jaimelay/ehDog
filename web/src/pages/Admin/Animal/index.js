import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Form, Container, Table, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import api from '../../../services/api'
import HeaderAdmin from '../HeaderAdmin';

const AnimalContainer = styled.div`
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

export default function Animal() {
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [animalID, setAnimalID] = useState({});

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setAnimalID({});
    }
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setAnimalID({});
    }
    const handleShowModalUpdate = () => setShowModalUpdate(true);

    useEffect(() => {
        async function loadCustomers() {
            const response = await api.get('/clientes');
            setCustomers(response.data);
        }
        loadCustomers();
    }, []);

    useEffect(() => {
        async function loadAnimals() {
            const response = await api.get('/animais');
            setAnimals(response.data);
        }
        loadAnimals();
    }, []);

    async function deleteAnimal(cod_animal){
        await api.delete(`/animais/${cod_animal}`);
        window.location.reload(false);
    }

    async function addAnimal(values){
        const { cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF } = values;
        await api.post(`/animais`, {
            cod_animal,
            nome_animal,
            tipo, alergia,
            raca,
            porte,
            fk_Cliente_CPF
        })
        window.location.reload(false);
    }

    async function updateAnimal(oldCodAnimal, values){
        const { cod_animal, nome_animal, tipo, alergia, raca, porte, fk_Cliente_CPF } = values;
        await api.put(`/animais`, {
            oldCodAnimal,
            cod_animal,
            nome_animal,
            tipo, alergia,
            raca,
            porte,
            fk_Cliente_CPF
        })
        setAnimalID({});
        handleCloseModalUpdate();
        window.location.reload(false);
    }

    return (
        <>
        <AnimalContainer>
            <HeaderAdmin />
            <Container>
                <h1>Listagem de Animais</h1>
                <Formik
                    initialValues={{ cod_animal: '', nome_animal: '', tipo: '', alergia: '', raca: '', porte: '', fk_Cliente_CPF: '' }}
                    validate={values => {
                        let errors = {};

                        if (!values.cod_animal) { errors.cod_animal = 'É necessário digitar um código.'; }
                        else if(!/^[0-9]{1,5}$/i.test(values.cod_animal)) { errors.cod_animal = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                        
                        if (!values.nome_animal) { errors.nome_animal = 'É necessário digitar um nome.'; }

                        if (!values.tipo) { errors.tipo = 'É necessário digitar um tipo.'; }
                        
                        if (!values.raca) { errors.raca = 'É necessário digitar uma raça.'; }
                       
                        if (!values.porte) { errors.porte = 'É necessário digitar um porte.'; }
                        
                        if (!values.fk_Cliente_CPF) { errors.fk_Cliente_CPF = 'É necessário escolher o CPF do dono.'; }

                        return errors;
                    }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        setTimeout(() => {
                            console.log(values);
                            async function getAnimal(cod_animal){
                                const response = await api.get(`/animais/${cod_animal}`);
                                if (response.data.length === 0) {
                                    addAnimal(values);
                                } else {
                                    setErrors({ cod_animal: 'Este código ja está sendo utilizado.' });
                                }
                            }
                            getAnimal(values.cod_animal);
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
                                        <th>Tipo</th>
                                        <th>Alergia</th>
                                        <th>Raça</th>
                                        <th>Porte</th>
                                        <th>CPF do Dono</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        { animals.length > 0 ? (
                                            <>
                                                { animals.map(animal => (
                                                        <tr key={animal.cod_animal}>                    
                                                            <td>{animal.cod_animal}</td>
                                                            <td>{animal.nome_animal}</td>
                                                            <td>{animal.tipo}</td>
                                                            <td>{animal.alergia}</td>
                                                            <td>{animal.raca}</td>
                                                            <td>{animal.porte}</td>
                                                            <td>{animal.fk_Cliente_CPF}</td>
                                                            <td>
                                                                <ButtonContainer>
                                                                    <Buttons>
                                                                        <Button variant="warning" onClick={() => {setAnimalID(animal); handleShowModalUpdate();}}>Editar</Button>
                                                                        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Altere com o que você deseja</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                            <>
                                                                            <Formik
                                                                                initialValues={{ cod_animal: `${animalID.cod_animal}`, nome_animal: `${animalID.nome_animal}`, tipo: `${animalID.tipo}`, alergia: `${animalID.alergia}`, raca: `${animalID.raca}`, porte: `${animalID.porte}`, fk_Cliente_CPF: `${animalID.fk_Cliente_CPF}` }}
                                                                                validate={values => {
                                                                                    let errors = {};

                                                                                    if (!values.cod_animal) { errors.cod_animal = 'É necessário digitar um código.'; }
                                                                                    else if(!/^[0-9]{1,5}$/i.test(values.cod_animal)) { errors.cod_animal = 'O código tem que ser númerico e no máximo 5 digitos.'; }
                                                                                    
                                                                                    if (!values.nome_animal) { errors.nome_animal = 'É necessário digitar um nome.'; }
                                                            
                                                                                    if (!values.tipo) { errors.tipo = 'É necessário digitar um tipo.'; }
                                                                                    
                                                                                    if (!values.raca) { errors.raca = 'É necessário digitar uma raça.'; }
                                                                                   
                                                                                    if (!values.porte) { errors.porte = 'É necessário digitar um porte.'; }
                                                                                    
                                                                                    if (!values.fk_Cliente_CPF) { errors.fk_Cliente_CPF = 'É necessário escolher o CPF do dono.'; }

                                                                                    return errors;
                                                                                }}
                                                                                onSubmit={(values, { setErrors, setSubmitting }) => {
                                                                                    setTimeout(() => {
                                                                                        async function getAnimal(cod_animal){
                                                                                            const response = await api.get(`/animais/${cod_animal}`);
                                                                                            if (response.data.length === 0) {
                                                                                                updateAnimal(animalID.cod_animal, values);
                                                                                            } else {
                                                                                                setErrors({ cod_animal: 'Este código ja está sendo utilizado.' });
                                                                                            }
                                                                                        }
                                                                                        if (animalID.cod_animal.toString() !== values.cod_animal) {
                                                                                            getAnimal(values.cod_animal);
                                                                                        } else { 
                                                                                            updateAnimal(animalID.cod_animal, values);
                                                                                        } 
                                                                                    }, 400);
                                                                                }}
                                                                            >
                                                                                {(formEdit) => (
                                                                                    <Form noValidate onSubmit={e => {e.stopPropagation(); formEdit.handleSubmit(e);}}>
                                                                                        <Form.Group controlId="validationFormik01">
                                                                                            <Form.Label>Código do Animal*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="cod_animal"
                                                                                                value={formEdit.values.cod_animal}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.cod_animal}
                                                                                            />
                                                                                                <Form.Control.Feedback type="invalid">
                                                                                                    {formEdit.errors.cod_animal}
                                                                                                </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik02">
                                                                                            <Form.Label>Nome do Animal*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="nome_animal"
                                                                                                value={formEdit.values.nome_animal}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.nome_animal}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.nome_animal}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik03">
                                                                                            <Form.Label>Tipo*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="tipo"
                                                                                                value={formEdit.values.tipo}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.tipo}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.tipo}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik04">
                                                                                            <Form.Label>Alergia*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="alergia"
                                                                                                value={formEdit.values.alergia}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.alergia}
                                                                                            />
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.alergia}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik05">
                                                                                            <Form.Label>Raça*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="raca"
                                                                                                value={formEdit.values.raca}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.raca}
                                                                                            />
                                                                                
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.raca}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId="validationFormik06">
                                                                                            <Form.Label>Porte*</Form.Label>
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name="porte"
                                                                                                value={formEdit.values.porte}
                                                                                                onChange={formEdit.handleChange}
                                                                                                isInvalid={!!formEdit.errors.porte}
                                                                                            />
                                                                                
                                                                                            <Form.Control.Feedback type="invalid">
                                                                                                {formEdit.errors.porte}
                                                                                            </Form.Control.Feedback>
                                                                                        </Form.Group>
                                                
                                                                                        <Form.Group controlId="validationFormik07">
                                                                                            <Form.Label>CPF do Dono*</Form.Label>
                                                                                            { customers.length > 0 ? (
                                                                                                <Form.Control
                                                                                                    as="select"
                                                                                                    name="fk_Cliente_CPF"
                                                                                                    value={formEdit.values.fk_Cliente_CPF}
                                                                                                    onChange={formEdit.handleChange}
                                                                                                    isInvalid={!!formEdit.errors.fk_Cliente_CPF}
                                                                                                >
                                                                                                    { customers.map(customer => (
                                                                                                        <option key={customer.CPF}>{customer.CPF}</option>
                                                                                                    ))}
                                                                                                </Form.Control>
                                                                                            ) : (
                                                                                                <div>Cadastre algum cliente antes</div>
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
                                                                        <Button variant="danger" onClick={() => { setAnimalID(animal); handleShowModalDelete(); }}>Deletar</Button>
                                                                        <Modal show={showModalDelete} onHide={handleCloseModalDelete} animation={true}>
                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title>Você quer mesmo fazer isso?</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {`Você deseja mesmo deletar o animal ( ${animalID.nome_animal} ) com código ( ${animalID.cod_animal} ) ?`}
                                                                            </Modal.Body>
                                                                            <Modal.Footer>
                                                                                <ButtonContainer>
                                                                                    <Buttons>
                                                                                        <Button variant="secondary" onClick={handleCloseModalDelete}>
                                                                                            Cancelar
                                                                                        </Button>
                                                                                    </Buttons>
                                                                                    <Buttons>
                                                                                        <Button variant="primary" onClick={() => {deleteAnimal(animalID.cod_animal); setAnimalID({}); handleCloseModalDelete();}}>
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
                                                <td></td>
                                            </tr>
                                        ) }
                                        <tr>
                                            <td>
                                                <Form.Group controlId="validationFormik01">
                                                    <Form.Control
                                                        type="text"
                                                        name="cod_animal"
                                                        value={formAdd.values.cod_animal}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.cod_animal}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.cod_animal}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                            <Form.Group controlId="validationFormik02">
                                                <Form.Control
                                                    type="text"
                                                    name="nome_animal"
                                                    value={formAdd.values.nome_animal}
                                                    onChange={formAdd.handleChange}
                                                    isInvalid={!!formAdd.errors.nome_animal}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formAdd.errors.nome_animal}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik03">
                                                    <Form.Control
                                                        type="text"
                                                        name="tipo"
                                                        value={formAdd.values.tipo}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.tipo}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.tipo}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik04">
                                                    <Form.Control
                                                        type="text"
                                                        name="alergia"
                                                        value={formAdd.values.alergia}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.alergia}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.alergia}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik05">
                                                    <Form.Control
                                                        type="text"
                                                        name="raca"
                                                        value={formAdd.values.raca}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.raca}
                                                    />
                                        
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.raca}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik06">
                                                    <Form.Control
                                                        type="text"
                                                        name="porte"
                                                        value={formAdd.values.porte}
                                                        onChange={formAdd.handleChange}
                                                        isInvalid={!!formAdd.errors.porte}
                                                    />
                                        
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.porte}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group controlId="validationFormik07">
                                                    { customers.length > 0 ? (
                                                        <Form.Control
                                                            as="select"
                                                            name="fk_Cliente_CPF"
                                                            value={formAdd.values.fk_Cliente_CPF}
                                                            onChange={formAdd.handleChange}
                                                            isInvalid={!!formAdd.errors.fk_Cliente_CPF}
                                                        >
                                                            { customers.map(customer => (
                                                                <option key={customer.CPF}>{customer.CPF}</option>
                                                            ))}
                                                        </Form.Control>
                                                    ) : (
                                                        <div>Cadastre algum cliente antes</div>
                                                    )}
                                                    <Form.Control.Feedback type="invalid">
                                                        {formAdd.errors.fk_Cliente_CPF}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Buttons>
                                                    <Button type="submit" onClick={() => formAdd.submitForm()}>Adicionar Animal</Button>
                                                </Buttons>
                                            </td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Form>
                        )}
                </Formik>
            </Container>
        </AnimalContainer>
        </>
    );
}