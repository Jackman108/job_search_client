import { FC } from 'react';
import { DataDisplayProps } from '../../Interfaces/InterfaceDataDisplay.types';
import Button from '../../UI/Button/Button';
import { useDataDisplay } from '../../hooks/useDataDisplay';
import styles from './DataDisplay.module.css';
import { Link } from 'react-router-dom';

export const DataDisplay: FC<DataDisplayProps> = ({ config }) => {
  const {
    data,
    loading,
    error,
    notFound,
    formData,
    isCreating,
    isEditing,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleSubmit,
    handleInputChange,
    handleCancelClick,
    userId,
  } = useDataDisplay(config);

  if (!userId) return <div>Ошибка: Не задан userId</div>;

  const renderField = (key: string, label: string) => (
    <div key={key} className={styles.formField}>
      <label>
        {label}
        {key === 'business_trip_readiness' ? (
          <input
            type="checkbox"
            checked={formData[key] === true}
            onChange={(e) => handleInputChange(e, key)}
          />
        ) : (
          <input
            type="text"
            value={formData[key] || ''}
            onChange={(e) => handleInputChange(e, key)}
          />
        )}
      </label>
    </div>
  );

  const renderForm = (
    type: string, 
    fields: Record<string, string>, 
    onCancel: () => void
  ) => (
    <form className={styles.createForm} onSubmit={(e) => handleSubmit(e, type)}>
      {Object.entries(fields).map(([key, label]) => renderField(key, label))}
      <div className={styles.buttonGroup}> 
        <Button type="submit" variant="primary">
          Сохранить
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отменить
        </Button>
      </div>
    </form>
  );
  
  const renderData = (type: string, fields: Record<string, string>) => (
    <div className={styles.dataContainer}>
      {Object.entries(fields).map(([key, label]) => (
        <div key={key} className={styles.dataField}>
          <strong>{label}:</strong>
          {key === 'business_trip_readiness'
            ? data[type][key] ? 'Да' : 'Нет'
            : data[type][key] || 'Не указано'}
        </div>
      ))}
      <Button onClick={() => handleEditClick(type)} className={styles.editButton} variant="secondary">
        <img src="/pen.png" alt="Edit" className={styles.editIcon} />
      </Button>
      <Button onClick={() => handleDeleteClick(type)} className={styles.editButton} variant="secondary">
        Удалить
      </Button>
    </div>
  );

  return (
    <div>
      <Link to="/" className="home-button">
        🏠
      </Link>
      {Object.entries(config).map(([type, item]) => (
        <section key={type} className={styles.dataDisplaySection}>
          <h1>{item.title}</h1>
          {loading[type] && <div>Загрузка...</div>}
          {notFound[type] && (
            <div>
              Нет данных
              <Button onClick={handleCreateClick} variant="primary">
                Создать запись
              </Button>
            </div>
          )}
            {!isEditing[type] && !isCreating && data[type] && renderData(type, item.fields)}
        {(isEditing[type] || isCreating) && renderForm(type, item.fields, () => handleCancelClick(type))}
        {!loading[type] && !notFound[type] && !isEditing[type] && !data[type] && !isCreating && (
      <Button onClick={handleCreateClick} variant="primary">
              Создать запись
            </Button>
          )}
        </section>
      ))}
    </div>
  );
};
