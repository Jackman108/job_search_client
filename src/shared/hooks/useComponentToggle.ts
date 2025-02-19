// hooks/useComponentToggle.ts

import { useState, KeyboardEvent} from 'react';

export const useComponentToggle = (initialState: boolean = false) => {
    const [isComponentOpen, setIsComponentOpen] = useState(initialState);

    const toggleComponent = () => {
        setIsComponentOpen(prevState => !prevState);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleComponent();
        }
    };

    return { isComponentOpen, toggleComponent, handleKeyPress };
};
