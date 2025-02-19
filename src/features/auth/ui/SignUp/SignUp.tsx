// src/components/SignUp/SignUp.tsx
import React, {ChangeEvent, useState} from 'react';
import {SignUpProps} from '../../types/Auth.props';
import Button from '@ui/Button/Button';
import RenderInput from '@ui/RenderInput/RenderInput';
import {FORM_TEXTS} from "@features/vacancies/config/searchConfig";
import {BUTTON_TEXTS} from "@features/profile/config/profileConfigs";

const SignUp: React.FC<SignUpProps> = ({onSignUp, error, loading}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        onSignUp(email, password, passwordRepeat);
    };

    return (
        <form onSubmit={handleSubmit}>
            <RenderInput
                label={FORM_TEXTS.emailLabel}
                name={BUTTON_TEXTS.emailButton}
                value={email}
                onChange={handleChange(setEmail)}
                isLoading={false}
                type={BUTTON_TEXTS.emailButton}
                placeholder={BUTTON_TEXTS.emailButton}
                required
            />
            <RenderInput
                label={FORM_TEXTS.passwordLabel}
                name={BUTTON_TEXTS.passwordButton}
                value={password}
                onChange={handleChange(setPassword)}
                isLoading={false}
                type={BUTTON_TEXTS.passwordButton}
                placeholder={BUTTON_TEXTS.insertPasswordButton}
                required
            />
            <RenderInput
                label={BUTTON_TEXTS.replacePasswordButton}
                name={BUTTON_TEXTS.passwordRepeat}
                value={passwordRepeat}
                onChange={handleChange(setPasswordRepeat)}
                isLoading={false}
                type={BUTTON_TEXTS.passwordButton}
                placeholder={BUTTON_TEXTS.replacePasswordButton}
                required
            />
            <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? BUTTON_TEXTS.loadingButton : BUTTON_TEXTS.registerButton}
            </Button>
            {error && <p>{typeof error === 'string' ? error : error.message}</p>}
        </form>
    );
};

export default SignUp;