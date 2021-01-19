import { useState } from 'react';
import { login } from '../../apiService';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
      <button className='btn'>Login</button>
    </form>
  );
};

export default LoginPage;
