import {Dispatch, SetStateAction} from "react";
import {Errors} from "@shared/types/Base.types";

export interface Feedback {
    id: number;
    vacancy_id: number;
    feedback_text: string;
    response_status: string;
    feedback_date: string;
    feedback_date_time?: string;
    feedback_date_date?: string;
}

export interface HandleFeedbackParams {
    token: string | null;
    email: string;
    password: string;
    setErrors: Dispatch<SetStateAction<Errors>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}


