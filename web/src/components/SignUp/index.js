import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Formik, Field } from 'formik';
import MaskedInput from "react-text-mask";
import { Modal, Button, Form, Col } from 'react-bootstrap';

import "./styles.css";

function SignUp(){
    const [show, setShow] = useState(false);
    const [routeRedirect, setRouteRedirect] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    
    function handleShow(e){
        e.preventDefault();
        setShow(true);
    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    const cpfNumberMask = [
        /[1-9]/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
    ];

    const phoneNumberMask = [
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Cadastrar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', cpf: '', ender: '', phone: '' }}
                        validate={values => {
                            let errors = {};

                            if (!values.cpf) { errors.cpf = 'É necessário digitar um CPF.'; }

                            if (!values.ender) { errors.ender = 'É necessário digitar um endereço.'; }

                            if (!values.phone) { errors.phone = 'É necessário digitar um telefone.'; }

                            if (!values.firstName) { errors.firstName = 'É necessário digitar seu nome.'; }

                            if (!values.lastName) { errors.lastName = 'É necessário digitar seu sobrenome.'; }

                            if (!values.email) {
                                errors.email = 'É necessário digitar algum e-mail.';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Endereço de e-mail inválido.';
                            }

                            if (!values.terms) { errors.terms = 'É necessário aceitar os termos e regras.'; }

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
                            errors,
                            touched,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                                        <Form.Label>Nome*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.firstName}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                                        <Form.Label>Sobrenome*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.lastName}
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="validationFormik03">
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <label htmlFor="phone" style={{ display: "block" }}>
                                    Telefone*
                                </label>
                                <Field
                                    name="phone"
                                    render={({ field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={phoneNumberMask}
                                                id="phone"
                                                placeholder="ex: (21) 2555-3322"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.phone && touched.phone
                                                    ? "text-input error"
                                                    : "text-input"
                                                }
                                            />
                                    )}
                                />
                                {errors.phone && touched.phone && (
                                    <div className="input-feedback">{errors.phone}</div>
                                )}

                                <label htmlFor="cpf" style={{ display: "block" }}>
                                    CPF*
                                </label>
                                <Field
                                    name="cpf"
                                    render={({ field }) => (
                                            <MaskedInput
                                                {...field}
                                                mask={cpfNumberMask}
                                                id="cpf"
                                                placeholder="ex: 124.432.333-33"
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={
                                                    errors.cpf && touched.cpf
                                                    ? "text-input error"
                                                    : "text-input"
                                                }
                                            />
                                    )}
                                />
                                {errors.cpf && touched.cpf && (
                                    <div className="input-feedback">{errors.cpf}</div>
                                )}

                                <Form.Group controlId="validationFormik05">
                                    <Form.Label>Endereço*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu endereço"
                                        name="ender"
                                        value={values.ender}
                                        onChange={handleChange}
                                        isInvalid={!!errors.ender}
                                    />
                        
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ender}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* <Form.Group>
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Aceito os termos e condições."
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        id="validationFormik0"
                                    />
                                </Form.Group> */}

                                <Button type="submit">Cadastrar</Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default withRouter(SignUp);