export interface ResumeData {
  user_id: string;
  full_name: string;
  position: string;
  employment_type: string;
  work_schedule: string;
  travel_time: string;
  business_trip_readiness: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactData {
  id: number;
  resume_id: number;
  phone: string;
  email: string;
  personal_site: string;
}

export interface SkillData {
  id: number;
  resume_id: number;
  skill_name: string;
  proficiency_level: string;
}

export interface WorkExperienceData {
  id: number;
  resume_id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface ResumeProps {
  onClose: () => void;
  isOpen: boolean;
}