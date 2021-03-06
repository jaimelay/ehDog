import React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

import Login from '../Login';
import SignUp from '../SignUp';

import capa from '../../assets/capa.jpg';

const HeaderContainer = styled.div`
`;

const LogoContainer = styled.div`
    height: 200px;
`;

const BackgroundContainer = styled.div`
    background-image: url(${capa});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(4px);
    -webkit-filter: blur(4px);
    height: 100%;
`;

const Logo = styled.div`
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
    color: #eee;
    font-weight: bold;
    border: 1px solid #f1f1f1;
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
`;

const NavbarContainer = styled.div`
    width: auto;
    height: 100px;
`;

export default function Header() {
    return (
        <HeaderContainer>
            <LogoContainer>
                <BackgroundContainer />
                <Logo><h1>ehDog? Petshop e Veterinária</h1></Logo>
            </LogoContainer>

            <NavbarContainer>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="#home">ehDog?</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Página Inicial</Nav.Link>
                            <Nav.Link href="#features">Serviços</Nav.Link>
                            <Nav.Link href="#pricing">Produtos</Nav.Link>
                        </Nav>
                        <Nav className="text-primary">
                            <Login />
                            <SignUp />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </NavbarContainer>
        </HeaderContainer>
    );
}