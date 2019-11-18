import React from 'react';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function HeaderAdmin() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Administração</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Produto" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="first">Inserir</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Alterar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pesquisa Avançada</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cliente" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="first">Inserir</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Alterar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pesquisa Avançada</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Tosador" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="first">Inserir</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Alterar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pesquisa Avançada</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Veterinário" id="collasible-nav-dropdown">
                            <NavDropdown.Item eventKey="first">Inserir</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Alterar</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Pesquisa Avançada</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}