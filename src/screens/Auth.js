import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Database";
import Home from "./Home";
import SplashScreen from "./SplashScreen";


const Auth = async () => {

    const navigate =  useNavigate();

    const [haveToken, setHaveToken] = useState(false);
    const refreshToken = localStorage.getItem('bgsRToken');

    if (refreshToken) {
        const result = await postData('token', {token: refreshToken});
        if (!result === "not_have_access") localStorage.setItem('bgsRToken', result);
    }

    return(
        navigate("/dashboard")
    );
}

export default Auth;
