// src/components/SignUp/SignUp.tsx

import React, { useState } from 'react';
import { SignUpProps } from '../../Interfaces/InterfaceProfile.types';

const SignUp: React.FC<SignUpProps> = ({ onSignUp, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email, password, passwordRepeat);
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
      <input
        type="password"
        placeholder="Повторите пароль"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;