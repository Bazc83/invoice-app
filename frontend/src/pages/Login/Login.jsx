import { useState } from 'react';

import { useLogin } from '@/hooks/useLogin';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e, emailVal, passwordVal) => {
    e.preventDefault();
    await login(emailVal, passwordVal);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <h3>Login</h3>

      <label> Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label> Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        Log in
      </button>

      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;
