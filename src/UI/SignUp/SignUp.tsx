// src/components/SignUp/SignUp.tsx
import React, { useState } from 'react';
import { SignUpProps } from '../../Interfaces/InterfaceAuth.types';
import Button from '../Button/Button';
import RenderInput from '../RenderInput/RenderInput';
import { BUTTON_TEXTS, FORM_TEXTS } from '../../config/formConfigs';

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
        placeholder={BUTTON_TEXTS.insertPasswordButton}
        required
      />
      <RenderInput
        label={BUTTON_TEXTS.replacePasswordButton}
        name={BUTTON_TEXTS.passwordRepeat}
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
        isLoading={false}
        type={BUTTON_TEXTS.passwordButton}
        placeholder={BUTTON_TEXTS.replacePasswordButton}
        required
      />
      <Button type="submit" variant="secondary" disabled={loading}>
        {loading ? BUTTON_TEXTS.loadingButton : BUTTON_TEXTS.registerButton}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;