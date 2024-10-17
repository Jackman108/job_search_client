// src/components/ResumeView/ResumeView.tsx
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ResumeView.module.css';
import { ResumeData, ContactData, SkillData, WorkExperienceData } from '../../Interfaces/InterfaceResume.types';
import { API_URL } from '../../config/serverConfig';

const ResumeView: FC = () => {
  const { userId } = useParams();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const [resumeResponse, contactsResponse, skillsResponse, workExperienceResponse] = await Promise.all([
            axios.get<ResumeData>(`${API_URL}/resume`),
            axios.get<ContactData[]>(`${API_URL}/contacts/${userId}`),
            axios.get<SkillData[]>(`${API_URL}/skills/${userId}`),
            axios.get<WorkExperienceData[]>(`${API_URL}/work_experience/${userId}`),
          ]);

          setResume(resumeResponse.data);
          setContacts(contactsResponse.data);
          setSkills(skillsResponse.data);
          setWorkExperience(workExperienceResponse.data);
        }
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.resumeViewContainer}>
        привет
      {resume && (
        <>
          <h1>{resume.full_name}</h1>
          <p><strong>Должность:</strong> {resume.position}</p>
          <p><strong>Тип занятости:</strong> {resume.employment_type}</p>
          <p><strong>График работы:</strong> {resume.work_schedule}</p>
          <p><strong>Время в пути:</strong> {resume.travel_time}</p>
          <p><strong>Готовность к командировкам:</strong> {resume.business_trip_readiness ? 'Да' : 'Нет'}</p>

          <h2>Контакты</h2>
          {contacts.map(contact => (
            <div key={contact.id}>
              <p><strong>Телефон:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Личный сайт:</strong> {contact.personal_site}</p>
            </div>
          ))}

          <h2>Навыки</h2>
          {skills.map(skill => (
            <div key={skill.id}>
              <p><strong>Навык:</strong> {skill.skill_name}</p>
              <p><strong>Уровень:</strong> {skill.proficiency_level}</p>
            </div>
          ))}

          <h2>Опыт работы</h2>
          {workExperience.map(experience => (
            <div key={experience.id}>
              <p><strong>Компания:</strong> {experience.company_name}</p>
              <p><strong>Должность:</strong> {experience.position}</p>
              <p><strong>Период:</strong> {experience.start_date} - {experience.end_date}</p>
              <p><strong>Описание:</strong> {experience.description}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResumeView;
