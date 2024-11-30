import {FC} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../UI/Button/Button';
import {dataDisplayConfig} from '../../config/resumeConfig';
import {useResume} from '../../hooks/useResume';
import styles from './Resume.module.css';
import ResumeChange from './ResumeItems/ResumeChange';
import ResumeView from './ResumeItems/ResumeView';
import UnauthorizedMessage from '../../UI/UnauthorizedMessage/UnauthorizedMessage';
import {useAuth} from "../../context/useAuthContext";

export const Resume: FC = () => {
    const config = dataDisplayConfig

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
    } = useResume(config);

    const {token} = useAuth();

    if (!token) {
        return (
            <section className={styles.sectionContainer}>
                <UnauthorizedMessage/>
            </section>
        );
    }

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
                            <Button onClick={() => handleCreateClick(type)} variant="primary">Создать запись</Button>
                        </div>
                    )}
                    {!isEditing[type] && !isCreating[type] && data[type] && (
                        <ResumeView
                            type={type}
                            fields={item.fields}
                            data={data[type]}
                            config={config}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                            onCreateClick={handleCreateClick}
                        />
                    )}

                    {(isEditing[type] || isCreating[type]) && (
                        <ResumeChange
                            type={type}
                            fields={item.fields}
                            formData={formData}
                            onCancel={() => handleCancelClick(type)}
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                        />
                    )}
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
