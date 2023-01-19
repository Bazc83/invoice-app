import { useLogin } from '@/hooks/useLogin';
import { useState } from 'react';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label> Email:</label>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label> Password:</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading}>Log in</button>

      {error && <div>{error}</div>}
    </form>
  );
};
