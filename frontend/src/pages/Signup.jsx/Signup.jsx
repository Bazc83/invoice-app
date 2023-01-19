import { useSignup } from '@/hooks/useSignup';
import { useState } from 'react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign up</h3>

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

      <button disabled={isLoading}>Sign Up</button>

      {error && <div>{error}</div>}
    </form>
  );
};
