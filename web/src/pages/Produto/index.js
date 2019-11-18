import React from 'react';

import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductContainer = styled.div`
    display: flex
    flex-direction: column;
`;

export default function Produto() {
    return (
        <>
        <ProductContainer>
            <Header />
            <Container>
                <h1>Produtos</h1>
            </Container>
            <Footer />
        </ProductContainer>
        </>
    );
}