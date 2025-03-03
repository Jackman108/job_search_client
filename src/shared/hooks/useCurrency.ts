import {useCallback, useState} from 'react';

const exchangeRates = {
    RUB: 1,
    BYN: 0.3,
    KZT: 5.5,
};

export const useCurrency = () => {
    const [currency, setCurrency] = useState<'RUB' | 'BYN' | 'KZT'>('RUB');

    const convertCurrency = useCallback((amount: number, from: 'RUB' | 'BYN' | 'KZT', to: 'RUB' | 'BYN' | 'KZT') => {
        return (amount / exchangeRates[from]) * exchangeRates[to];
    }, []);

    return {
        currency,
        setCurrency,
        convertCurrency,
    };
};