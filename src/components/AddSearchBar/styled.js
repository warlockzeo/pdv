import styled from 'styled-components';

export const AddSearchBar = {
  wrap: styled.div`
    position: fixed;
    width: 100%;
    top: 56px;
    padding: 10px;
    display: flex;
    background-color: #ffffff;
    z-index: 1;

    button {
      flex: 0;
      margin-right: 5px;
    }
  `
};
