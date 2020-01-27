
export const verifySpecialCharacteres = (value) => {
    var regex = /^[A-Za-z0-9 ]+$/

    //Validate TextBox value against the Regex.
    var isValid = regex.test(value);
   
    return isValid;
}