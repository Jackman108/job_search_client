import {useState} from 'react';

interface TooltipState {
    text: string | null;
    position: { x: number; y: number } | null;
}

const useTooltip = () => {
    const [tooltipState, setTooltipState] = useState<TooltipState>({text: null, position: null});

    const showTooltip = (text: string, position: { x: number; y: number }) => {
        setTooltipState({text, position});
    };

    const hideTooltip = () => {
        setTooltipState({text: null, position: null});
    };

    return {
        tooltipState,
        showTooltip,
        hideTooltip,
    };
};

export default useTooltip;