import {FC} from 'react';
import Button from '../../UI/Button/Button';
import styles from './SearchForm.module.css';
import {ManagementSectionProps} from "../../Interfaces/InterfaceForm.types";

const ManagementSection: FC<ManagementSectionProps> = ({
                                                           title,
                                                           selectedId,
                                                           setSelectedId,
                                                           items,
                                                           onCreate,
                                                           onUpdate,
                                                           onDelete,
                                                           disabled = false,
                                                       }) => {
    return (
        <div className={styles.managementContainer}>
            <h3>{title}</h3>
            <select
                value={selectedId || ''}
                onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
            >
                <option value="">Выберите...</option>
                {items?.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.label}
                    </option>
                ))}
            </select>
            <Button onClick={onUpdate} disabled={!selectedId || disabled} variant="primary">
                <img src="/pen.png" alt="Edit" className={styles.editIcon}/>
            </Button>
            <Button onClick={onCreate} disabled={!!selectedId || disabled} variant="primary">
                Создать
            </Button>
            <Button onClick={onDelete} disabled={!selectedId || disabled} variant="danger">
                Удалить
            </Button>
        </div>
    );
};

export default ManagementSection;