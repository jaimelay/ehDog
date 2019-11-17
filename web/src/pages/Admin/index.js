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
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [tosadores, setTosadores] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/produtos');
            setProducts(response.data);
        }
        loadProducts();
    }, []);

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

    async function deleteProduct(cod_produto){
      await api.delete(`/produtos/${cod_produto}`);
    }

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
          <h1>Listagem de Produtos</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Valor</th>
                <th>Estoque</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { products.length > 0 ? (
                <>
                    { products.map(product => (
                      <tr key={product.cod_produto}>                    
                        <td>{product.cod_produto}</td>
                        <td>{product.nome_produto}</td>
                        <td>{product.marca}</td>
                        <td>R$ {product.valor_unitario}</td>
                        <td>{product.qtd_estoque}</td>
                        <td><Button variant="danger" onClick={() => deleteProduct(product.cod_produto)}>Deletar</Button></td>
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