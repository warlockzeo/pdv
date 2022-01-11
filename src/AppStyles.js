import styled from 'styled-components';

export const App = {
  wrap: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: ${({ isLogged }) => (isLogged === 'true' ? 56 : 0)}px;
  `
};
