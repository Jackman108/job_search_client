import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DataDisplayProps } from '../../Interfaces/InterfaceDataDisplay.types';
import Button from '../../UI/Button/Button';
import RenderFormArray from '../RenderFormArray/RenderFormArray';
import { useDataDisplay } from '../../hooks/useDataDisplay';
import styles from './DataDisplay.module.css';

/**psql -U postgres -d db_vacancy */
export const DataDisplay: FC<DataDisplayProps> = ({ config }) => {
  const {
    data,
    loading,
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
  } = useDataDisplay(config);
  

  if (!data) return <div>Ошибка: Нет data</div>;
  
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
          ) : key === 'start_date' || key === 'end_date' ? (
            <input
              type="date"
              value={formData[key] || ''}
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

  const renderForm = ( type: string, fields: Record<string, string>, onCancel: () => void  ) => (
    <form className={styles.createForm} onSubmit={(e) => handleSubmit(e, type)}>
      {Object.entries(fields).map(([key, label]) => renderField(key, label))}
      <div className={styles.buttonGroup}> 
        <Button type="submit" variant="primary"> Сохранить </Button>
        <Button type="button" variant="secondary" onClick={onCancel}> Отменить </Button>
      </div>
    </form>
  );

  const renderData = (type: string, fields: Record<string, string>) => (
    <div className={styles.dataContainer}>
      {type === 'skills' || type === 'workExperience' ? (
        <>
          <RenderFormArray config={config[type]}  />
          <Button onClick={() => handleCreateClick(type)} variant="primary">Добавить +</Button>
        </>
      ) : (
        <>
          {Object.entries(fields).map(([key, label]) => (
            <div key={key} className={styles.dataField}>
              <strong>{label}:</strong>
              {key === 'business_trip_readiness' ? (data[type][key] ? 'Да' : 'Нет') : (data[type][key] || 'Не указано')}
            </div>
          ))}
          <div className={styles.dataField}>
            <Button onClick={() => handleEditClick(type, data[type])} className={styles.editButton} variant="secondary">
              <img src="/pen.png" alt="Edit" className={styles.editIcon} />
            </Button>
            <Button onClick={() => handleDeleteClick(type)} className={styles.editButton} variant="secondary">Удалить</Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <Link to="/" className="home-button"> 🏠 </Link>
      {Object.entries(config).map(([type, item]) => (
        <section key={type} className={styles.dataDisplaySection}>
          <h1>{item.title}</h1>
          {loading[type] && <div>Загрузка...</div>}
          {notFound[type] && (
            <div>
              Нет данных
              <Button onClick={() => handleCreateClick(type)} variant="primary"> Создать запись </Button>
            </div>
          )}
          {!isEditing[type] && !isCreating[type] && data[type] && renderData(type, item.fields)}

          {(isEditing[type] || isCreating[type]) && renderForm(type, item.fields, () => handleCancelClick(type))}

          {!loading[type] && !notFound[type] && !isEditing[type] && !data[type] && !isCreating[type] && (

          <Button onClick={() => handleCreateClick(type)} variant="primary">
              Создать запись
            </Button>
          )}
        </section>
      ))}
    </div>
  );
};
