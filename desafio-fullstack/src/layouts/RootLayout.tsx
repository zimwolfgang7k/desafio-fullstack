import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ClientContext } from '../context/clientContext/ClientContext';
import Register from '../pages/cadastration';
import { Container } from '../style/global';
import { Div, NavBar, NavLink } from './style';

const RootLayout = () => {
  const { logout } = useContext(ClientContext);

  return (
    <main>
      <NavBar>
        <Div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/register" onClick={logout}>
            Logout
          </NavLink>
        </Div>
      </NavBar>
      <Outlet />
    </main>
  );
};

export default RootLayout;
