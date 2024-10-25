import { FC, useEffect } from 'react';
import { RenderFormArrayProps } from '../../Interfaces/InterfaceDataDisplay.types';
import Button from '../../UI/Button/Button';
import { useDataOperationsById } from '../../hooks/useDataOperationsById';
import { useFormById } from '../../hooks/useFormById';
import styles from './RenderFormArray.module.css';

const RenderFormArray: FC<RenderFormArrayProps> = ({ config }) => {
    const {
        formData,
        isEditing,
        handleEditClick,
        handleCancelClick,
        handleInputChange,
    } = useFormById();
    
    const { fetchedData, 
        error, 
        loadData,
        deleteItem, 
        saveItem 
    } = useDataOperationsById(config);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        saveItem(id, formData, isEditing[id]);
        handleCancelClick(id);
    };

    const renderForm = (item: any) => (
        <form onSubmit={(e) => handleSubmit(e, item.id)}>
            {Object.entries(config.fields).map(([key, label]) => (
                <div key={key} className={styles.formField}>
                    <label>
                        {label}
                        <input
                            type={key === 'start_date' || key === 'end_date' ? 'date' : 'text'}
                            value={formData[key] || ''}
                            onChange={(e) => handleInputChange(e, key)}
                        />
                    </label>
                </div>
            ))}
            <Button type="submit" variant="primary">Сохранить</Button>
            <Button type="button" variant="secondary" onClick={() => handleCancelClick(item.id)}>Отменить</Button>
        </form>
    );

    const renderDataItem = (item: any) => (
        <li key={item.id} className={styles.dataField}>
            {isEditing[item.id] ? renderForm(item) : (
                <>
                    {Object.entries(config.fields).map(([key, label]) => (
                        <div key={key} className={styles.dataItem}>
                            <strong>{label}:</strong> {item[key] || 'Не указано'}
                        </div>
                    ))}
                    <div className={styles.buttonGroup}>
                    <Button onClick={() => handleEditClick(item)} variant="secondary">
                        <img src="/pen.png" alt="Edit" className={styles.editIcon} />
                    </Button>
                    <Button onClick={() => deleteItem(item.id)} variant="secondary">Удалить</Button>
                    </div>
                </>
            )}
        </li>
    );

    return (
        <ul className={styles.dataContainer}>
            {fetchedData?.length ? fetchedData.map(renderDataItem) : <div>Нет данных для отображения</div>}
            {error && <div className="error">{error}</div>}
        </ul>
    );
};

export default RenderFormArray;
