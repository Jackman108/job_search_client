// src/components/SignIn/SignIn.tsx

import React, {ChangeEvent, useState} from 'react';
import {SignInProps} from '../../types/Auth.props';
import Button from '@ui/Button/Button';
import RenderInput from '@ui/RenderInput/RenderInput';
import {FORM_TEXTS} from "@features/vacancies/config/searchConfig";
import {BUTTON_TEXTS} from "@features/profile/config/profileConfigs";

const SignIn: React.FC<SignInProps> = ({onSignIn, error, loading}) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                isLoading={false}
                type={BUTTON_TEXTS.emailButton}
                placeholder={BUTTON_TEXTS.emailButton}
                required
            />
            <RenderInput
                label={FORM_TEXTS.passwordLabel}
                name={BUTTON_TEXTS.passwordButton}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                isLoading={false}
                type={BUTTON_TEXTS.passwordButton}
                placeholder={BUTTON_TEXTS.passwordButton}
                required
            />
            <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? BUTTON_TEXTS.loadingButton : BUTTON_TEXTS.insertButton}
            </Button>
            {error && <p>{typeof error === 'string' ? error : error.message}</p>}
        </form>
    );
};

export default SignIn;
