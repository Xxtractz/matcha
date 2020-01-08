export const isEmail = (email) =>{
    if (email.match("@")) {
        return true;
    }
    return false;
}

export const isEmpty = (str) =>{
    if(!str && str.length === 0 )
        return true;
    return false;
}

export const validateAge = (year,month,day) =>{
    // if(dateString !=""){
    //     var today = new Date();
    //     var birthDate = new Date(dateString);
    //     var age = today.getFullYear() - birthDate.getFullYear();
    //     var m = today.getMonth() - birthDate.getMonth();
    //     var da = today.getDate() - birthDate.getDate();
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //       age--;
    //     }
    //     if(m<0){
    //       m +=12;
    //     }
    //     if(da<0){
    //       da +=30;
    //     }
    //     if (age >= 1 && age <= 99) {
    //       return true;
    //     }else {
    //       return false;
    //     }
      
    //   }else {
    //     return false;
    //   }
}

export const isYearValid = (year) =>{
    if(year !== "" ){
       return (year >= 1940 && (year <= (new Date().getFullYear()) - 18)) ? true : false;
    }else{
        return false;
    }
}

export const isMonthValid = (month) =>{
    if(month !== "" ){
       return (month>= 1 && month <= 12) ? true : false;
    }else{
        return false;
    }
}

export const isDayValid = (day) =>{
    if(day !== "" ){
       return (day >= 1 && day <= 31) ? true : false;
    }else{
        return false;
    }
}

// export const isEmail = (email) =>{
//     return true;
// }

// export const isEmail = (email) =>{
//     return true;
// }

// export const isEmail = (email) =>{
//     return true;
// }

// export const isEmail = (email) =>{
//     return true;
// }

// export const isEmail = (email) =>{
//     return true;
// }
