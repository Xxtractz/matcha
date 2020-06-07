export const isEmail = (email) => {
    if (email.match("@")) {
        return true;
    }
    return false;
};

export const isEmpty = (str) => {
    if (!str && str.length === 0) return true;
    return false;
};

export const isChar = (str) => {
    if (/^[a-zA-Z]+$/.test(str)) return true;
    return false;
};

export const isPassword = (str) => {
    var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(str)) return true;
    return false;
};

export const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const validateAge = (age) => {
    if (age >= 18 && age <= 70) {
        return true;
    } else return false;
};

export const isYearValid = (year) => {
    if (year !== "") {
        return year >= new Date().getFullYear() - 70 &&
            year <= new Date().getFullYear() - 18 ?
            true :
            false;
    } else {
        return false;
    }
};

export const isMonthValid = (month) => {
    if (month !== "") {
        return month >= 1 && month <= 12 ? true : false;
    } else {
        return false;
    }
};

export const isDayValid = (day) => {
    if (day !== "") {
        return day >= 1 && day <= 31 ? true : false;
    } else {
        return false;
    }
};

export const isEqual = (Str1, Str2) => {
    return Str1 === Str2 ? true : false;
};