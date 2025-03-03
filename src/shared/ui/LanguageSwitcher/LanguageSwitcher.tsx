import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = async (lng: string) => {
        try {
            await i18n.changeLanguage(lng);
        } catch (error) {
            console.error('Ошибка смены языка:', error);
        }
    };

    return (
        <div>
            <button onClick={() => changeLanguage('ru')}>Русский</button>
            <button onClick={() => changeLanguage('en')}>English</button>
        </div>
    );
};

export default LanguageSwitcher;