import {ERROR_MESSAGES} from "@config/validateConfig";
import {Errors, ValidationEmail, ValidationPassword, ValidationSearchUrl} from "@shared/types/Base.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
const PASSWORD_HAS_NUMBER = /[0-9]/;

export const validateEmail = (email: string): ValidationEmail => {
    const errors: Errors = {};
    let isValidEmail = true;


    if (!EMAIL_REGEX.test(email)) {
        errors.email = ERROR_MESSAGES.email;
        isValidEmail = false;
    }

    return {isValidEmail, emailError: errors};
};

export const validateSearchUrl = (vacancyUrl: string): ValidationSearchUrl => {
    const errors: Errors = {};
    let isValidSearchUrl = true;
    if (vacancyUrl && !vacancyUrl.startsWith('https://hh.ru/')) {
        errors.searchUrl = ERROR_MESSAGES.vacancyUrl;
        isValidSearchUrl = false;
    }
    return {isValidSearchUrl, searchUrlError: errors};
};

export const validatePassword = (password: string): ValidationPassword => {
    const errors: Errors = {};
    let isValidPassword = true;

    if (password.length < PASSWORD_MIN_LENGTH) {
        errors.password = ERROR_MESSAGES.password;
        isValidPassword = false;
    }
    if (!PASSWORD_HAS_UPPERCASE.test(password)) {
        errors.password = ERROR_MESSAGES.passwordUppercase;
        isValidPassword = false;
    }
    if (!PASSWORD_HAS_NUMBER.test(password)) {
        errors.password = ERROR_MESSAGES.passwordNumber;
        isValidPassword = false;
    }
    return {isValidPassword, passwordError: errors};
};

