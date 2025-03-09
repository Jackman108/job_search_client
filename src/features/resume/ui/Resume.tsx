import {Link} from 'react-router-dom';
import {Button, UnauthorizedMessage} from '@ui';
import {resumeConfig} from '../config/resumeConfig';
import {useResume} from '../hooks/useResume';
import styles from './Resume.module.css';
import ResumeChange from './ResumeItems/ResumeChange';
import ResumeView from './ResumeItems/ResumeView';
import {useAuth} from "@app/providers/auth/useAuthContext";

const Resume = () => {
    const config = resumeConfig

    const {
        fetchedData,
        loading,
        error,
        formData,
        isCreating,
        isEditing,
        handleCreateClick,
        handleEditClick,
        deleteItem,
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
                    {loading && <div>Загрузка...</div>}
                    {error && (
                        <div>
                            Нет данных
                            <Button onClick={() => handleCreateClick(type)} variant="primary">Создать запись</Button>
                        </div>
                    )}
                    {!isEditing[type] && !isCreating[type] && fetchedData[type] && (
                        <ResumeView
                            type={type}
                            fields={item.fields}
                            data={fetchedData[type]}
                            config={config}
                            onEditClick={handleEditClick}
                            onDeleteClick={() => deleteItem({type})}
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
                    {!loading && !error && !isEditing[type] && !fetchedData[type] && !isCreating[type] && (
                        <Button onClick={() => handleCreateClick(type)} variant="primary">
                            Создать запись
                        </Button>
                    )}
                </section>
            ))}
        </div>
    );
};

export default Resume;