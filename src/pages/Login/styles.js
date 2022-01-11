import styled from 'styled-components';

export const Login = {
  wrap: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    color: #ffffff;
  `,
  input: styled.input`
    width: 80%;
    max-width: 300px;
    height: 50px;
    margin-bottom: 10px;
    text-align: center;
  `,
  image: styled.img`
    max-width: 200px;
    margin-bottom: 20px;
  `,
  button: styled.button`
    width: 80%;
    max-width: 300px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  `,
  error: styled.div`
    color: red;
  `
};
