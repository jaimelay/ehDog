import React from 'react';

import HeaderAdmin from './HeaderAdmin';

import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Admin() {
    return (
      <>
      <HeaderAdmin/>
      <AdminContainer>

      </AdminContainer>
      </>
    );
}