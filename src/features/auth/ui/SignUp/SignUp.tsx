import React, {ChangeEvent, useState} from 'react';
import {SignUpProps} from '@features/auth/types/Auth.props';
import {Button, RenderInput} from '@ui';
import {useTranslation} from "react-i18next";

const SignUp: React.FC<SignUpProps> = ({onSignUp, error, loading}) => {
    const {t} = useTranslation('auth');

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
                label={t('form.email')}
                name="email"
                value={email}
                onChange={handleChange(setEmail)}
                isLoading={false}
                type="email"
                placeholder=""
                required
            />
            <RenderInput
                label={t('form.password')}
                name="password"
                value={password}
                onChange={handleChange(setPassword)}
                isLoading={false}
                type="password"
                placeholder=""
                required
            />
            <RenderInput
                label={t('form.replacePassword')}
                name="passwordRepeat"
                value={passwordRepeat}
                onChange={handleChange(setPasswordRepeat)}
                isLoading={false}
                type="password"
                placeholder=""
                required
            />
            <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? t('form.isLoading') : t('button.register')}
            </Button>
            {error && <p>{typeof error === 'string' ? error : error.message}</p>}
        </form>
    );
};

export default SignUp;