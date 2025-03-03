import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import subscriptionRu from '@shared/locales/ru/subscription.json';
import subscriptionEn from '@shared/locales/en/subscription.json';
import paymentRu from '@shared/locales/ru/payment.json';
import paymentEn from '@shared/locales/en/payment.json';

export const defaultNS = 'subscriptions';

const initializeI18n = async () => {
    await i18next.use(initReactI18next).init({
        lng: 'ru',
        fallbackLng: 'ru',
        debug: true,
        resources: {
            ru: {
                subscriptions: subscriptionRu,
                payments: paymentRu,
            },
            en: {
                subscriptions: subscriptionEn,
                payments: paymentEn,
            },
        },
        defaultNS,
    });
};

initializeI18n().catch((error) => {
    console.error('Ошибка при инициализации i18next:', error);
});

export default i18next;