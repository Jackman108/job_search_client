import { FC, useEffect, useRef } from 'react';
import styles from './Accordion.module.css';
import type { AccordionProps } from './Accordion.props';

/** Compact native details accordion. Starts collapsed unless defaultOpen. */
const Accordion: FC<AccordionProps> = ({ title, children, defaultOpen = false, className = '' }) => {
    const ref = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        if (ref.current && defaultOpen) {
            ref.current.open = true;
        }
    }, [defaultOpen]);

    return (
        <details ref={ref} className={`${styles.accordion} ${className}`.trim()}>
            <summary className={styles.summary}>
                <span className={styles.chevron} aria-hidden="true" />
                {title}
            </summary>
            <div className={styles.body}>{children}</div>
        </details>
    );
};

export default Accordion;
