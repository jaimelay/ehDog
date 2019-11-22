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
                                <Link to="/admin/produto"><Button variant="danger">Produto</Button></Link>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Procurar produtos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Cliente</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Animal</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Consultas</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Tosador</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                        <DropdownContainer>                            
                            <Dropdown as={ButtonGroup}>
                                <Button variant="danger">Veterinário</Button>
                                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </DropdownContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}