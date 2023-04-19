const isEmptyInput = (type, username, password, rePassword = "", email = "") => {
    if (type === "login") {

        if (username === "" || password === "") return true;
        else return false;

    } else if (type === "register") {

        if (username === "" || password === "" || rePassword === "" || email === "") return true;
        else return false;

    } else return null;
}

const isUsernameValid = (username) => {
    
    const res = /^[A-Za-z0-9_\.]+$/.exec(username); // eslint-disable-line
    const valid = !!res;
    return valid;

}

const isLengthValid = (username, password) => {

    if (username.length >= 6 && username.length <= 16 && password.length >= 6) return true;
    else return false;

}

const isEmailValid = (email) => {

	const res = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.exec(email); // eslint-disable-line
    const valid = !!res;
    return valid;

}

const isPasswordMatch = (password, rePassword) => {

    if (password === rePassword) return true;
    else return false;

}


export {isEmptyInput, isUsernameValid, isLengthValid, isEmailValid, isPasswordMatch};