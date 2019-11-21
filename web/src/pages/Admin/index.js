import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import HeaderAdmin from './HeaderAdmin';

import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tables = styled.div`
  width: 75%;
  margin-top: 30px;
`;

export default function Admin() {
    const [clients, setClients] = useState([]);
    const [tosadores, setTosadores] = useState([]);

    useEffect(() => {
      async function loadClients() {
          const response = await api.get('/clientes');
          setClients(response.data);
      }
      loadClients();
    }, []);

    useEffect(() => {
      async function loadTosadores() {
          const response = await api.get('/tosador');
          setTosadores(response.data);
      }
      loadTosadores();
    }, []);



    async function deleteClient(CPFCliente){
      await api.delete(`/clientes/${CPFCliente}`);
    }

    async function deleteTosador(CPFTosador){
      await api.delete(`/tosador/${CPFTosador}`);
    }

    return (
      <>
      <HeaderAdmin/>
      <AdminContainer>
        <Tables>

          <h1>Listagem de Clientes</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Email</th>
                <th>Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { clients.length > 0 ? (
                <>
                    { clients.map(client => (
                      <tr key={client.CPF}>                    
                        <td>{client.CPF}</td>
                        <td>{client.nome_cliente}</td>
                        <td>{client.end_cliente}</td>
                        <td>{client.email_cliente}</td>
                        <td>{client.tel_cliente}</td> 
                        <td><Button variant="danger" onClick={() => deleteClient(client.CPF)}>Deletar</Button></td>
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
                  </tr>
              ) }
            </tbody>
          </Table>
          <h1>Listagem de Tosadores</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Salário</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { tosadores.length > 0 ? (
                <>
                    { tosadores.map(tosador => (
                      <tr key={tosador.CPF}>                    
                        <td>{tosador.CPF}</td>
                        <td>{tosador.nome_tosador}</td>
                        <td>{tosador.end_tosador}</td>
                        <td>{tosador.email_tosador}</td>
                        <td>{tosador.tel_tosador}</td> 
                        <td>{tosador.salario_tos}</td> 
                        <td><Button variant="danger" onClick={() => deleteTosador(tosador.CPF)}>Deletar</Button></td>
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
            </tbody>
          </Table>
        </Tables>
      </AdminContainer>
      </>
    );
}