// src/components/SignIn/SignIn.tsx

import React, { useState } from 'react';
import { SignInProps } from '../../Interfaces/InterfaceAuth.types';

const SignIn: React.FC<SignInProps> = ({ onSignIn, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
