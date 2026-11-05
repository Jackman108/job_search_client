import React, {ChangeEvent} from 'react';
import {SignInProps} from '../../types/Auth.props';
import {Button, RenderInput} from '@ui';
import {useTranslation} from "react-i18next";
import { useLocalStorage } from '@hooks';

const SignIn: React.FC<SignInProps> = ({onSignIn, error, loading}) => {
    const {t} = useTranslation('auth');

    // Сохраняем и подставляем последние введённые данные для входа
    const [email, setEmail] = useLocalStorage<string>('lastEmail', '');
    const [password, setPassword] = useLocalStorage<string>('lastPassword', '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignIn(email, password);
    };
    return (
        <form onSubmit={handleSubmit}>
            <RenderInput
                label={t('form.email')}
                name="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                isLoading={false}
                type="email"
                placeholder=""
                required
            />
            <RenderInput
                label={t('form.password')}
                name="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                isLoading={false}
                type="password"
                placeholder=""
                required
            />
            <Button type="submit" variant="secondary" disabled={loading}>
                {loading ? t('form.isLoading') : t('button.insert')}
            </Button>
            {error && <p>{typeof error === 'string' ? error : error.message}</p>}
        </form>
    );
};

export default SignIn;
