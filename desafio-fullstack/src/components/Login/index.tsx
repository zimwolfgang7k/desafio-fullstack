import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from '../../context/clientContext/interfaces';
import { formSchemaLogin } from '../../validations/Registrations';
import { Form } from 'react-router-dom';
import { useContext } from 'react';
import { ClientContext } from '../../context/clientContext/ClientContext';
import { InputForm, FormDiv, Button, Span } from '../../style/global';
import { NavLink } from './style';

const Login = () => {
  const { loginClient } = useContext(ClientContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: yupResolver(formSchemaLogin)
  });

  return (
    <FormDiv onSubmit={handleSubmit(loginClient)}>
      <Form>
        <label htmlFor="email">Email</label>
        <InputForm
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <Span>{errors.email?.message}</Span>
        <br />
        <label htmlFor="password">Password</label>
        <InputForm
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
        />
        <Span>{errors.password?.message}</Span>
        <br />
        <Button>
          <NavLink to={'/dashboard'} type="submit">
            Submit
          </NavLink>
        </Button>
      </Form>
    </FormDiv>
  );
};

export default Login;
