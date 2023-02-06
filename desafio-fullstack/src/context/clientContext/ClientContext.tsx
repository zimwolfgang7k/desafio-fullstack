import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { ClientData, LoginData, RegisterData } from './interfaces';

interface IClientProvider {
  registerClient: (data: RegisterData) => void;
  loginClient: (data: LoginData) => void;
  logout: () => void;
}

interface ClientProps {
  children: ReactNode;
}

export const ClientContext = createContext<IClientProvider>(
  {} as IClientProvider
);

const ClientProvider = ({ children }: ClientProps) => {
  const [client, setClient] = useState<ClientData | null>(null);
  const [data, setData] = useState<ClientData | null>(null);

  const registerClient = async (data: RegisterData) => {
    await api
      .post('/clients', data)
      .then(res => {
        setData(res.data);
        toast.success('Client created succesfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loginClient = async (data: LoginData) => {
    await api
      .post('/login', data)
      .then(res => {
        console.log(res);
        localStorage.setItem('@token', res.data.token);

        toast.success('Client logged succesfully');
      })
      .catch(err => {
        toast.error('Wrong email or password');
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('@token');
    const id = client?.id;

    const autoLogin = () => {
      api
        .get(`/clients/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    };

    if (token) {
      autoLogin();
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    toast.info('Client logged out!');
    setClient({} as ClientData);
  };

  return (
    <ClientContext.Provider value={{ registerClient, loginClient, logout }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
