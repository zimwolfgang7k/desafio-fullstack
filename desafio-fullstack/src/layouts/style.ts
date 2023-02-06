import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = styled.nav`
  width: 100%;
  height: 60px;
  background-color: var(--color-primary);
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  margin: 0 auto;
  max-width: 1100px;
  height: 100%;
`;
