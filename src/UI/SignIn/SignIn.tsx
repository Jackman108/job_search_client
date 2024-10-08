// src/components/SignIn/SignIn.tsx

import React, { useState } from 'react';
import { SignInProps } from '../../Interfaces/InterfaceAuth.types';
import { BUTTON_TEXTS, FORM_TEXTS } from '../../config/formConfigs';
import Button from '../Button/Button';
import RenderInput from '../RenderInput/RenderInput';

const SignIn: React.FC<SignInProps> = ({ onSignIn, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <RenderInput
        label={FORM_TEXTS.emailLabel}
        name={BUTTON_TEXTS.emailButton}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        isLoading={false}
        type={BUTTON_TEXTS.emailButton}
        placeholder={BUTTON_TEXTS.emailButton}
        required
      />
      <RenderInput
        label={FORM_TEXTS.passwordLabel}
        name={BUTTON_TEXTS.passwordButton}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isLoading={false}
        type={BUTTON_TEXTS.passwordButton}
        placeholder={BUTTON_TEXTS.passwordButton}
        required
      />
      <Button type="submit" variant="secondary" disabled={loading}>
        {loading ? BUTTON_TEXTS.loadingButton : BUTTON_TEXTS.insertButton}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
