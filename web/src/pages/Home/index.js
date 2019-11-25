import React from 'react';

import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

import tosa from '../../assets/tosa.jpg';
import banho from '../../assets/banho.jpg';
import consultaMedica from '../../assets/consultaMedica.jpg';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const HomeContainer = styled.div`
    .carousel {
        border: 5px solid #eee;
        border-radius: 10px 10px 10px 10px;
    }
    display: flex
    flex-direction: column;
`;

const FeedContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
    
    .card {
        margin: 15px;
    }
`;

export default function Home() {
    return (
        <HomeContainer>
            <Header />
            <FeedContainer>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={banho} />
                    <Card.Body>
                        <Card.Title>Serviço de Banho</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">R$ 50,00</Card.Subtitle>
                        <Card.Text>
                            O melhor serviço de banho é aqui na ehDog? venha logo deixar seu cachorro cheiroso.
                        </Card.Text>
                        <Button variant="primary">Agendar Banho</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={tosa} />
                    <Card.Body>
                        <Card.Title>Serviço de Tosa</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">R$ 50,00</Card.Subtitle>
                        <Card.Text>
                            O melhor serviço de tosa é aqui na ehDog? venha logo deixar seu cachorro com aquele penteado daora.
                        </Card.Text>
                        <Button variant="primary">Agendar Tosa</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={consultaMedica} />
                    <Card.Body>
                        <Card.Title>Consulta Médica</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">R$ 50,00</Card.Subtitle>
                        <Card.Text>
                            Aqui na ehDog? contamos com os melhores veterinários, venha logo deixar seu pet aqui.
                        </Card.Text>
                        <Button variant="primary">Agendar Consulta</Button>
                    </Card.Body>
                </Card>
            </FeedContainer>
            <Footer/>
        </HomeContainer>
    );
}