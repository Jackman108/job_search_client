import type { AccessLevel } from '@utils';

export interface NavLinkConfig {
    path: string;
    labelKey: string;
    access: AccessLevel;
}

export const navConfig: NavLinkConfig[] = [
    { path: '/', labelKey: 'nav.vacancies', access: 'auth' },
    { path: '/feedback', labelKey: 'nav.feedback', access: 'auth' },
    { path: '/resume', labelKey: 'nav.resume', access: 'auth' },
    { path: '/payments', labelKey: 'nav.payments', access: 'admin' },
    { path: '/subscriptions', labelKey: 'nav.subscriptions', access: 'admin' },
    { path: '/crypto-payments', labelKey: 'nav.cryptoPayments', access: 'admin' },
];
