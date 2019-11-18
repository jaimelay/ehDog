import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';

function Login({ history }){
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    function handleShow(e){
        e.preventDefault();
        setShow(true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Entrar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Entrar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ cpf: '' }}
                        validate={values => {
                            let errors = {};

                            if (!values.cpf) {
                                errors.cpf = 'É necessário digitar algum CPF.';
                            } else if (!/^[0-9]{11}$/i.test(values.cpf)) {
                                errors.cpf = 'CPF Inválido.';
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setErrors, setSubmitting }) => {
                            setTimeout(() => {
                                async function handleSubmit() {

                                }
                                handleSubmit();
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
                                <Form.Group controlId="validationFormik03">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu CPF"
                                        name="cpf"
                                        value={values.cpf}
                                        onChange={handleChange}
                                        isInvalid={!!errors.cpf}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cpf}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* <Form.Group controlId="validationFormik04">
                                    <Form.Label>Senha*</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="senha"
                                        name="passwordOne"
                                        value={values.passwordOne}
                                        onChange={handleChange}
                                        isInvalid={!!errors.passwordOne}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordOne}
                                    </Form.Control.Feedback>
                                </Form.Group> */}

                                <Button type="submit">Entrar</Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default withRouter(Login);