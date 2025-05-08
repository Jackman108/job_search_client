import { BasePayment } from './base.types';

/**
 * Интерфейс для пропсов таблицы платежей
 */
export interface PaymentTableBodyProps {
    /** Данные платежей */
    paymentData: BasePayment[];
    /** Обработчик редактирования */
    handleEditClick: (type: string, item: BasePayment) => void;
    /** Обработчик удаления */
    handleDelete: (id: string) => void;
}

/**
 * Интерфейс для пропсов формы платежа
 */
export interface PaymentFormProps {
    /** Начальные данные формы */
    initialData?: Partial<BasePayment>;
    /** Обработчик отправки формы */
    onSubmit: (formData: Partial<BasePayment>) => void;
    /** Обработчик отмены */
    handleCancelClick: (id: string) => void;
    /** Флаг загрузки */
    isLoading: boolean;
} 