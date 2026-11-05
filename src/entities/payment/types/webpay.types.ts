/**
 * Интерфейс для ответа WebPay
 */
export interface WebPayResponse {
    /** Страница ответа */
    page: string;
    /** Номер счета */
    invoice_no: string;
    /** Номер транзакции */
    invoice_transaction: number;
    /** Авторизация счета */
    invoice_auth: string;
    /** Дата счета */
    invoice_date: string;
    /** Номер карты */
    form_card_pan: string;
    /** RRN транзакции */
    invoice_rrn: string;
    /** Номер заказа */
    order_num: string;
    /** Примечание к заказу */
    order_note: string;
    /** Имя клиента */
    customerName: string;
    /** Адрес клиента */
    customerAddress: string;
    /** Дата услуги */
    serviceDate: string;
    /** Для мерчанта */
    for_merchant: string;
    /** Сайт магазина */
    storeSite: string;
    /** Текущая тема */
    currentTheme: string;
    /** URL PDF */
    pdf_url: string;
    /** Товары */
    items: Array<{
        name: string;
        quantity: string;
        price: string;
        totalAmount: string;
        commission: string;
    }>;
    /** Сумма */
    amount: string;
    /** Валюта */
    currency: string;
    /** Комиссия */
    commission: string;
    /** Номер заказа */
    orderNumber: string;
    /** Предупреждение */
    warning: boolean;
    /** Токен */
    token: string;
    /** Имя токена */
    tokenName: string;
    /** Показывать секцию телефона */
    showPhoneSection: boolean;
    /** Основной телефон мерчанта */
    merchantMainPhone: string;
    /** Основной телефон мерчанта (tel) */
    merchantMainPhoneTel: string;
    /** Городской телефон мерчанта */
    merchantCityPhone: string;
    /** Городской телефон мерчанта (tel) */
    merchantCityPhoneTel: string;
    /** Телефон МТС мерчанта */
    merchantMtsPhone: string;
    /** Телефон МТС мерчанта (tel) */
    merchantMtsPhoneTel: string;
    /** Телефон Velcom мерчанта */
    merchantVelcomPhone: string;
    /** Телефон Velcom мерчанта (tel) */
    merchantVelcomPhoneTel: string;
    /** Телефон Life мерчанта */
    merchantLifePhone: string;
    /** Телефон Life мерчанта (tel) */
    merchantLifePhoneTel: string;
    /** Цвет бренда мерчанта */
    merchantBrandColor: string;
    /** Логотип бренда мерчанта */
    merchantBrandLogo: string;
    /** Изображение карты мерчанта */
    merchantCardImg: string;
    /** Фоновое изображение мерчанта */
    merchantBackgroundImg: string;
    /** Шрифт мерчанта */
    merchantFont: string;
    /** Показывать публичную оферту */
    show_public_offer: boolean;
    /** Требуется CVV */
    merchantCvvRequired: number;
    /** Показывать форму смены языка */
    showChangeLanguageForm: boolean;
    /** Языки */
    languages: Record<string, string>;
    /** Текущий язык */
    currentLanguage: string;
    /** Показывать кнопку печати */
    showPagePrint: boolean;
    /** Показывать иконку страницы */
    showPageIcon: boolean;
    /** Показывать кнопку возврата */
    showReturnButton: boolean;
    /** HTML баннера */
    bannerHtml: string;
    /** Иконка страницы */
    pageIcon: string;
    /** Заголовок страницы */
    pageTitle: string;
    /** Показывать упрощенный результат подписи */
    showSimplifiedSignResult: boolean;
    /** Успешен ли упрощенный результат подписи */
    isSimplifiedSignResultSuccess: boolean;
    /** URL возврата */
    returnUrl: string;
    /** Сделать редирект возврата */
    makeReturnRedirect: boolean;
    /** Блок переводов */
    translate_block: Record<string, string>;
} 