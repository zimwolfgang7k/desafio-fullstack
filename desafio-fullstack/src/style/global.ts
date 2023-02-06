import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`  
   :root{
    --color-primary: #4EAB3F;
    --grey-0: #f9f9f9;
    --grey-1: #f0f0f0;
    --grey-2: #cecece;
    --grey-3: #A39F9F;
    --grey-4: #212121;
    --shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  body {
    background-color: var(--grey-0);
  }
  ol,
  ul {
    list-style: none;
  }
  body,
  html {
    width: 100%;
    height: 100vh;
  }
  body,
  input,
  button,
  textarea,
  select,
  ::placeholder {
    font-family: 'Inter', sans-serif;
  }
  body {
    font-weight: 400;
    font-size: 1rem;
    color: var(--grey-4);
  }
  
`;

export const Container = styled.div`
  width: 25.125rem;
  border-radius: 10px;
  min-height: 450px;
  max-height: 985px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 56px auto 0;
  transition: 0.3s;
  .buttonInitial {
    width: 100%;
    height: 51px;
    margin: 0 0 5px 0;
    border-radius: 0px 10px 0px 0px;
    border-bottom: 3px solid var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }
  button:focus {
    background-color: var(--color-primary);
    color: var(--grey-1);
  }
  section {
    width: 402px;
    height: 51px;
    display: flex;
    align-items: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const InputForm = styled.input`
  background-color: var(--grey-1);
  border-radius: 20px;
  border: 1.5px solid var(--grey-1);
  padding: 1rem;
  min-height: 3rem;
  width: 100%;
  transition: 0.3s;
  margin: 5px 0 8px;

  &&:hover {
    color: var(--grey-4);
  }
  &&:focus {
    border: 1.5px solid var(--grey-3);
    box-shadow: var(--shadow);
  }
  &&::placeholder {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--grey-3);
    transition: 0.3s;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 30px;
  padding: 1rem 2rem;
  transition: 0.3s;
  width: 100%;
  color: white;
  margin-top: 16px;
  text-decoration: none;

  && {
    background-color: var(--color-primary);
  }
  &&:hover {
    border: 1.5px solid var(--grey-3);
    box-shadow: var(--shadow);
  }

  &&::placeholder {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--grey-3);
    transition: 0.3s;
  }
`;

export const Span = styled.span`
  font-size: 12px;
  color: red;
  padding: 2px;
`;

export const FormDiv = styled.div`
  min-width: 300px;
  max-width: 528px;
  padding: 26px;
  border-radius: 20px;
`;
