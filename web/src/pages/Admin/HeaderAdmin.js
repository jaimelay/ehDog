import React from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar, Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const DropdownContainer = styled.div`
    padding: 10px;
`;

export default function HeaderAdmin() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/admin">Administração</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <DropdownContainer>
                            <Dropdown as={ButtonGroup}>
                                <Link to="/admin/produto">
                                    <Button variant="danger">Produto</Button>
                                </Link>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Procurar produtos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>
                            <Dropdown as={ButtonGroup}>
                                <Link to= "/admin/cliente">
                                    <Button variant="danger">Cliente</Button>
                                </Link>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Procurar clientes</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Link to="/admin/animal">
                                    <Button variant="danger">Animal</Button>
                                </Link>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Pesquisas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Consultas</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Pesquisas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Link to="/admin/tosador">
                                    <Button variant="danger">Tosador</Button>
                                </Link>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Pesquisas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Veterinário</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Pesquisas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}