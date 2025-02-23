import {FC} from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
    text: string | null;
    position: { x: number; y: number } | null;
}

const Tooltip: FC<TooltipProps> = ({text, position}) => {
    if (!text || !position) return null;

    return (
        <div
            className={styles.tooltip}
            style={{
                position: 'fixed',
                left: position.x + 10,
                top: position.y + 10,
            }}
        >
            {text}
        </div>
    );
};

export default Tooltip;