import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterData } from '../../context/clientContext/interfaces';
import { formSchemaRegistration } from '../../validations/Registrations';
import { Form } from 'react-router-dom';
import { useContext } from 'react';
import { ClientContext } from '../../context/clientContext/ClientContext';
import { InputForm, FormDiv, Button, Span } from '../../style/global';
import { NavLink } from '../Login/style';

const Registration = () => {
  const { registerClient } = useContext(ClientContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: yupResolver(formSchemaRegistration)
  });

  return (
    <FormDiv>
      <Form onSubmit={handleSubmit(registerClient)}>
        <label htmlFor="name">Name</label>
        <InputForm
          id="name"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <Span>{errors.name?.message}</Span>
        <br />
        <label htmlFor="email">Email</label>
        <InputForm
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <Span>{errors.email?.message}</Span>
        <br />
        <label htmlFor="phone_number">Phone Number</label>
        <InputForm
          id="phone_number"
          type="text"
          placeholder="Phone Number"
          {...register('phone_number')}
        />
        <Span>{errors.phone_number?.message}</Span>
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
          <NavLink to={'/login'} type="submit">
            Submit
          </NavLink>
        </Button>
      </Form>
    </FormDiv>
  );
};

export default Registration;
