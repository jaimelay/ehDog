import React from 'react';

import styled from 'styled-components';

const FooterContainer = styled.footer`
    background: #eee;

    .footer-middle {
        background: var(--mainDark);
        padding-top: 25px;
        color: #FFF;
    }

    .footer-bottom {
        padding-top: 15px;
    }

    ul li {
        color: #000;
    }

    .text-xs-center {
        color: #FFF;
    }

    h4 {
        color: #000;
    }

    .text-xs-center {
        color: #000;
    }
`;

export default function Footer(){
    return (
        <FooterContainer>
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <h4>Institucional</h4>
                        <ul className="list-unstyled">
                            <li>Trabalhe conosco</li>
                            <li>Sobre a ehDog?</li>
                            <li>Pagamentos e reembolso</li>
                        </ul>
                    </div>
                    </div>
                    <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} ehDog? - Todos direitos reservados.
                    </p>
                    </div>
                </div>
            </div>
        </FooterContainer>
    );
}