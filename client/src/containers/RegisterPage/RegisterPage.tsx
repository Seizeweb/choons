import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../apiService';

export interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, password, password2, email } = formState;
    if (password === password2) {
      const user = await register(username, email, password);
      if (user) return history.push('/');
      setError('There seem to have been a problzeqrlmjglqubn');
    } else {
      setError("The passwordzz don't match m8");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input type='text' name='email' onChange={(e) => setFormState({ ...formState, email: e.target.value })} />

      <label htmlFor='username'>Username</label>
      <input type='text' name='username' onChange={(e) => setFormState({ ...formState, username: e.target.value })} />

      <label htmlFor='password'>Password</label>
      <input type='password' name='password' onChange={(e) => setFormState({ ...formState, password: e.target.value })} />

      <label htmlFor='password2'>Re-type password</label>
      <input type='password' name='password2' onChange={(e) => setFormState({ ...formState, password2: e.target.value })} />

      <button className='btn'>Login</button>
      {error && <p className='field-error'>{error}</p>}
    </form>
  );
};

export default RegisterPage;
