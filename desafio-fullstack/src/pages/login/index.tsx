import { Container } from '../../style/global';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ClientContext } from '../../context/clientContext/ClientContext';
import { HiUserAdd } from 'react-icons/hi';
import Login from '../../components/Login';

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <section>
          <button
            onClick={e => {
              e.preventDefault();
            }}
            className="buttonInitial"
          >
            <HiUserAdd />
            Login
          </button>
        </section>
        <Login />
      </Container>
    </motion.div>
  );
};

export default LoginPage;
