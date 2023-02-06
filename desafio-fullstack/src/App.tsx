import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { GlobalStyle } from './style/global';
import Register from './pages/cadastration';
import RootLayout from './layouts/RootLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from './context/clientContext/ClientContext';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ClientProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ToastContainer
          autoClose={1500}
          position={'top-right'}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
      </ClientProvider>
    </>
  );
}

export default App;
