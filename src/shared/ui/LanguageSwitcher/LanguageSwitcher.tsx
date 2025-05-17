import React from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const changeLanguage = async (lng: string) => {
        try {
            await i18n.changeLanguage(lng);
        } catch (error) {
            // Логируем ошибку при смене языка
            console.error('Error changing language:', error);
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