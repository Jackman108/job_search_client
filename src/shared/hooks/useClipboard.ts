import { useCallback, useState } from 'react';
import { UseClipboardReturn } from '@entities/payment';

/**
 * Хук для работы с буфером обмена
 * @returns Объект с функциями для копирования и состоянием копирования
 */
const useClipboard = (): UseClipboardReturn => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    }, []);

    const resetCopyState = useCallback(() => {
        setIsCopied(false);
    }, []);

    return {
        copyToClipboard,
        isCopied,
        resetCopyState
    };
};

export default useClipboard;
