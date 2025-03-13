import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import subscriptionRu from '@shared/locales/ru/subscription.json';
import subscriptionEn from '@shared/locales/en/subscription.json';
import paymentRu from '@shared/locales/ru/payment.json';
import paymentEn from '@shared/locales/en/payment.json';
import headerRu from '@shared/locales/ru/header.json';
import headerEn from '@shared/locales/en/header.json';

export const defaultNS = 'subscriptions';

export const initializeI18n = async () => {
    await i18next.use(initReactI18next).init({
        lng: 'ru',
        fallbackLng: 'ru',
        debug: true,
        resources: {
            ru: {
                subscriptions: subscriptionRu,
                payments: paymentRu,
                header: headerRu,
            },
            en: {
                subscriptions: subscriptionEn,
                payments: paymentEn,
                header: headerEn,
            },
        },
        defaultNS,
    });
};

initializeI18n().catch((error) => {
    console.error('Ошибка при инициализации i18next:', error);
});

export default i18next;