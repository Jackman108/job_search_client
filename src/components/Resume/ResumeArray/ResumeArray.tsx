import {FC, FormEvent, useEffect} from 'react';
import {ResumeArrayProps} from '../../../Interfaces/InterfaceResume.types';
import Button from '../../../UI/Button/Button';
import {useFetchById} from '../../../hooks/fetch/useFetchById';
import {useResumeHandlersById} from '../../../hooks/useResumeHandlersById';
import styles from './ResumeArray.module.css';

const ResumeArray: FC<ResumeArrayProps> = ({config}) => {
    const {
        formData,
        isEditing,
        handleEditClick,
        handleCancelClick,
        handleInputChange,
    } = useResumeHandlersById();

    const {
        fetchedData,
        error,
        loadData,
        deleteItem,
        saveItem
    } = useFetchById(config);

    useEffect(() => {
        loadData().catch((error) => {
            console.error("Ошибка загрузки данных:", error);
        });
    }, [loadData]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        try {
            await saveItem(id, formData, isEditing[id]); // Дожидаемся завершения запроса
            handleCancelClick(id);
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
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
            {isEditing[item.id] ? renderForm(item) : renderItemData(item)}
        </li>
    );

    const renderItemData = (item: any) => (
        <>
            {Object.entries(config.fields).map(([key, label]) => (
                <div key={key} className={styles.dataItem}>
                    <strong>{label}:</strong> {item[key] || 'Не указано'}
                </div>
            ))}
            <div className={styles.buttonGroup}>
                <Button onClick={() => handleEditClick(item)} variant="secondary">
                    <img src="/pen.png" alt="Edit" className={styles.editIcon}/>
                </Button>
                <Button onClick={() => deleteItem(item.id)} variant="secondary">Удалить</Button>
            </div>
        </>

    );

    return (
        <ul className={styles.dataContainer}>
            {fetchedData?.length ? fetchedData.map(renderDataItem) : <div>Нет данных для отображения</div>}
            {error && <div className="error">{error}</div>}
        </ul>
    );
};

export default ResumeArray;
