import {FC, FormEvent} from 'react';
import {ResumeArrayProps} from '../../types/InterfaceResume.types';
import Button from '@ui/Button/Button';
import {useFetchByType} from '@hooks/useFetchByType';
import {useResumeHandlersById} from '../../hooks/useResumeHandlersById';
import styles from './ResumeArray.module.css';
import {formatDate} from "@utils/formatUtils";

const ResumeArray: FC<ResumeArrayProps> = ({config, type}) => {
    const {
        formData,
        isEditing,
        handleEditClick,
        handleCancelClick,
        handleInputChange,
    } = useResumeHandlersById();

    const {
        fetchedData,
        loading,
        error,
        deleteItem,
        saveItem,
    } = useFetchByType(config);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        try {
            await saveItem({type, id, formData, isEditing: isEditing[id]});
            handleCancelClick(id);
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };

    const renderForm = (item: any) => (
        <form onSubmit={(e) => handleSubmit(e, item.id)}>
            {Object.entries(config[type].fields).map(([key, label]) => {
                const isDateField = key === 'start_date' || key === 'end_date';
                const value = isDateField && formData[key] ? formatDate(formData[key]).date : formData[key] || '';

                return (
                    <div key={key} className={styles.formField}>
                        <label>
                            {label as string}
                            <input
                                type={key === 'start_date' || key === 'end_date' ? 'date' : 'text'}
                                value={value}
                                onChange={(e) => handleInputChange(e, key)}
                            />
                        </label>
                    </div>
                );
            })}
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
            {Object.entries(config[type].fields).map(([key, label]) => {
                const isDateField = key === 'start_date' || key === 'end_date';
                const value = isDateField && item[key] ? formatDate(item[key]).date : item[key] || 'Не указано';

                return (
                    <div key={key} className={styles.dataItem}>
                        <strong>{label as string}:</strong> {value}
                    </div>
                );
            })}
            <div className={styles.buttonGroup}>
                <Button onClick={() => handleEditClick(item)} variant="secondary">
                    <img src="/pen.png" alt="Edit" className={styles.editIcon}/>
                </Button>
                <Button onClick={() => deleteItem({type, id: item.id})} variant="secondary">Удалить</Button>
            </div>
        </>
    );

    return (
        <ul className={styles.dataContainer}>
            {loading ? (
                <div>Загрузка...</div>
            ) : Array.isArray(fetchedData[type]) && fetchedData[type].length > 0 ? (
                fetchedData[type].map(renderDataItem)
            ) : (
                <div>Нет данных для отображения</div>
            )}
            {error && <div className="error">{error.message}</div>}
        </ul>
    );
};

export default ResumeArray;