import { FC } from 'react';
import { useRenderArray } from '../../hooks/useRenderArray';
import Button from '../../UI/Button/Button';
import styles from './RenderArray.module.css';
import { RenderArrayProps } from '../../Interfaces/InterfaceDataDisplay.types';

const RenderArray: FC<RenderArrayProps> = ({ config, userId , data}) => {
    const {
        formData,
        isEditing,
        handleEditClick,
        handleDeleteClick,
        handleInputChange,
        handleSubmit,
        handleCancelEdit,
    } = useRenderArray(config, userId, data);

    const renderForm = (item: any) => (
      <form onSubmit={(e) => handleSubmit(e, item.id)}>
          {Object.entries(config.fields).map(([key, label]) => (
              <div key={key} className={styles.formField}>
                  <label>
                      {label}
                      {key === 'start_date' || key === 'end_date' ? (
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
          ))}
          <Button type="submit" variant="primary">Сохранить</Button>
          <Button type="button" variant="secondary" onClick={() => handleCancelEdit(item.id)}>Отменить</Button>
      </form>
  );

  const renderDataItem  = (item: any) => (    
    <li key={item.id} className={styles.dataField}>
        {isEditing[item.id] ? (
            renderForm(item)
        ) : (
            <>
                {Object.entries(config.fields).map(([key, label]) => (
                    <div key={key} className={styles.dataItem}>
                        <strong>{label}:</strong> {item[key] || 'Не указано'}
                    </div>
                ))}
                <Button onClick={() => handleEditClick(item)}>Редактировать</Button>
                <Button onClick={() => handleDeleteClick(item.id)}>Удалить</Button>
            </>
        )}
    </li>
    
);

return (
    <ul className={styles.dataContainer}>
        {data?.length ? (
            data.map(renderDataItem)
        ) : (
            <div>Нет данных для отображения</div>
        )}
    </ul>
);
};

export default RenderArray;