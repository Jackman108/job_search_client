export interface Errors {
    [key: string]: string | undefined;
}

export interface ValidationSearchUrl {
    isValidSearchUrl: boolean;
    searchUrlError: Errors;
}

export interface ValidationEmail {
    isValidEmail: boolean;
    emailError: Errors;
}

export interface ValidationPassword {
    isValidPassword: boolean;
    passwordError: Errors;
}

export interface FormattedDate {
    time: string;
    date: string;
}