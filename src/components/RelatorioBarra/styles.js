import styled from 'styled-components';

export const RelatorioBarra = {
  wrap: styled.div`
    display: flex;
    align-items: center;
    padding: 10px;

    input,
    button:not(:last-child) {
      margin-right: 5px;
    }
  `
};
