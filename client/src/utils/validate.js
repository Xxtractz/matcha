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

export const validateAge = (year, month, day) => {
    const max_year = new Date().getFullYear() - 70;
    const min_year = new Date().getFullYear() - 18;
    const _month = new Date().getMonth() + 1;
    const _day = new Date().getDay();

    const dateofbirthDate = new Date(year + "-" + month + "-" + day);
    const mindate = new Date(min_year + "-" + _month + "-" + _day);
    const maxdate = new Date(max_year + "-" + _month + "-" + _day);

    if (dateofbirthDate <= mindate && dateofbirthDate >= maxdate) {
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