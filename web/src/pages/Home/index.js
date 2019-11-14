import React from 'react';

import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    height: 200px;
    width: auto;
    background: #000;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.h1`
    color: #FFF;
    margin: auto 50px;
`;

const NavbarContainer = styled.div`
    width: auto;
    height: 100px;
`;

export default function Home() {
    return (
        <>
        <HeaderContainer>
            <Logo>Alguma imagem bonita com cachorro aqui</Logo>
        </HeaderContainer>
        <NavbarContainer>
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">ehDog?</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Pagina Inicial</Nav.Link>
                <Nav.Link href="#features">Servicos</Nav.Link>
                <Nav.Link href="#pricing">Produtos</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="procurar..." className="mr-sm-2" />
                <Button variant="outline-light">Procurar</Button>
            </Form>
            </Navbar>
        </NavbarContainer>
        </>
    );
}