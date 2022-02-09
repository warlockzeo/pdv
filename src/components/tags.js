import styled from 'styled-components';

export const tags = {
  thDescription: styled.th`
    flex: 1 1 300px !important;
  `,

  thNumbers: styled.th`
    flex: 0 0 100px !important;
  `,

  tdDescription: styled.td`
    flex: 1 1 300px !important;
    display: flex;
    align-items: center;

    & > :not(:last-child) {
      border-top: 1px solid #dee2e6;
    }
  `,

  tdNumbers: styled.td`
    flex: 0 100px !important;
  `,

  tdButtons: styled.td`
    flex: 0 0 auto;
    text-align: right;
    & > :not(:last-child) {
      border-top: 1px solid #dee2e6;
    }
  `
};
