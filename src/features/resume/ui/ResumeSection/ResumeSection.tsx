import {Link} from 'react-router-dom';
import {Button, UnauthorizedMessage} from '@ui';
import {useResumeData} from '../../hooks/useResumeData';
import styles from './ResumeSection.module.css';
import ResumeChange from '@features/resume/ui/ResumeChange/ResumeChange';
import ResumeView from '../ResumeView/ResumeView';
import {LOCALES} from "@config";
import {resumeConfig} from "@entities/resume";

const ResumeSection = () => {
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
    } = useResumeData(config);

    if (loading) return <div>{LOCALES.LOADING}</div>;
    if (error) return <UnauthorizedMessage/>;
    const hasResume = fetchedData.resume && !isEditing.resume && !isCreating.resume;

    return (
        <div>
            <Link to="/" className="home-button"> 🏠 </Link>
            {Object.entries(config).map(([type, item]) => {
                if (!hasResume && type !== 'resume') {
                    return null;
                }
                return (
                    <section key={type} className={styles.dataDisplaySection}>
                        <h1>{item.title}</h1>

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
                );
            })}
        </div>
    );
};

export default ResumeSection;