import {Dispatch, SetStateAction} from "react";
import {Errors} from "@type";
import {Feedback} from "@entities/feedback";

export interface FeedbackHeaderProps {
    handleSort: (key: keyof Feedback) => void;
    getSortArrow: (key: keyof Feedback) => string;
}

export interface FeedbackRowProps {
    feedback: Feedback;
    deleteFeedback: (id: number) => void;
}

export interface HandleFeedbackParams {
    token: string | null;
    email: string;
    password: string;
    setErrors: Dispatch<SetStateAction<Errors>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}


