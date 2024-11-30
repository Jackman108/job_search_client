// src/utils/validateUtils.ts
import {
    Errors,
    ValidationEmail,
    ValidationPassword,
    ValidationSearchUrl
} from "../Interfaces/InterfaceForm.types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
const PASSWORD_HAS_NUMBER = /[0-9]/;

export const validateEmail = (email: string): ValidationEmail => {
    const errors: Errors = {};
    let isValidEmail = true;


     if (!EMAIL_REGEX.test(email)) {
         errors.email = 'Введите корректный email';
         isValidEmail = false;
     }
 
    return {isValidEmail, emailError: errors};
};

export const validateSearchUrl = (vacancyUrl: string): ValidationSearchUrl => {
    const errors: Errors = {};
    let isValidSearchUrl = true;
    if (vacancyUrl && !vacancyUrl.startsWith('https://hh.ru/')) {
        errors.searchUrl = 'URL должен начинаться с https://hh.ru/';
        isValidSearchUrl = false;
    }
    return {isValidSearchUrl, searchUrlError: errors};
};

export const validatePassword = (password: string): ValidationPassword => {
    const errors: Errors = {};
    let isValidPassword = true;

    if (password.length < PASSWORD_MIN_LENGTH) {
        errors.password = 'Пароль должен быть не менее 8 символов';
        isValidPassword = false;
    }
    if (!PASSWORD_HAS_UPPERCASE.test(password)) {
      errors.password = 'Пароль должен содержать хотя бы одну заглавную букву';
      isValidPassword = false;
    }
    if (!PASSWORD_HAS_NUMBER.test(password)) {
        errors.password = 'Пароль должен содержать хотя бы одну цифру';
        isValidPassword = false;
    }
    return {isValidPassword, passwordError: errors};
};