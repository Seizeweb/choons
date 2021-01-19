import { useState } from 'react';
import { login } from '../../apiService';
import { Link } from 'react-router-dom';

export interface LoginPageProps {
  onAuthenticate: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const { username, token } = await login(email, password);
    localStorage.setItem('token', token);
    onAuthenticate(username);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='user-form'>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' className='mb-1' onChange={(e) => setPassword(e.target.value)} />
        <button className='btn is-dark'>Login</button>
        <p>
          First time here ?{' '}
          <Link to='/register' className='is-underlined'>
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
