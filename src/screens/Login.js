import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Menu from "./Menu";
import SplashScreen from "./SplashScreen";
import { isEmailValid, isEmptyInput, isLengthValid, isPasswordMatch, isUsernameValid } from "../Test";
import { postData } from "../Database";

import "../styles/Login.css"

const Login = () => {

    const navigate = useNavigate();

    let [loadState, isLoadState] = useState(false);
    let [haveToken, setHaveToken] = useState(false);

    useEffect(() => {

        const onPageLoad = () => {
            isLoadState(true);
            if (localStorage.getItem("bgsRToken")) setHaveToken(true);
        };
        
        if (document.readyState === 'complete') {

            onPageLoad();
        
        } else {

            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);

        }

    }, []);

    const [chosedSite, setChoosedSite] = useState("login");
    const [alert, setAlert] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");

    const setSite = (type) => {

        setAlert("");
        setUsername("");
        setPassword("");
        setRePassword("");
        setEmail("");

        setChoosedSite(type);

    }

    const LoginBlock = () => {

        const sendLogin = () => {

            if (isEmptyInput("login", username, password)) {

                setAlert("Username or Password input is empty!");
                return;

            }

            if (!isLengthValid(username, password)) {

                setAlert("The username must be between 6 and 12 characters, password must be at least 6 characters long!");
                return;
            }

            if (!isUsernameValid(username)) {
                
                setAlert("The username can only contain upper and lower case letters of the English alphabet, numbers, low line and dot characters!");
                return;

            }

            // fetch data
            const login = async (username, password) => {
                try {

                    const result = await postData('auth/login', {username, password});
                    if (result === "wrong_auth_data") return setAlert("The username or password is incorrect!");

                    const refreshToken = result.refreshToken;

                    if (refreshToken) {

                        localStorage.setItem('bgsRToken', refreshToken);
                        return setHaveToken(true);

                    } else return setAlert("The username or password is incorrect!");

                } catch (error) {
                    console.error(error);
                }
            }

            login(username, password);

        }

        return(
            haveToken ? navigate("/dashboard") :
            <>
                <div id="login-box">
                    <div id="window">
                        <p id="window-title">LogIn-H4CK.exe</p>
                        <div id="window-buttons">
                            <div className="window-buttons-style">
                                <span id="window-tab"/>
                            </div>
                            <div className="window-buttons-style">
                                <span id="window-zoom-1"/>
                                <span id="window-zoom-2"/>
                            </div>
                            <div className="window-buttons-style">
                                <span id="window-close-1"/>
                                <span id="window-close-2"/>
                            </div>
                        </div>
                    </div>
                    <p id="login-label"> Login </p>
                    <div id="alert-text">
                        <p>{alert}</p>
                    </div>
                    <form>
                        <label> Username </label>
                        <input type={"text"} onChange={(event) => setUsername(event.target.value)}/>
                        <label> Password </label>
                        <input type={"password"} onChange={(event) => setPassword(event.target.value)}/>
                    </form>
                    <div id="login-test">
                        <button onClick={() => sendLogin()}> Continue </button>
                    </div>
                    <div id="site-text">
                        <p> If you dont have account, </p>
                        <p id="red-p" onClick={() => setSite("register")}>create it!</p>
                    </div>
                </div>
            </> 
        );
    }

    const RegisterBlock = () => {

        const sendRegister = () => {

            if (isEmptyInput("register", username, password, rePassword, email)) {

                setAlert("One of these input is empty!");
                return;

            }

            if (!isLengthValid(username, password)) {

                setAlert("The username must be between 6 and 12 characters, password must be at least 6 characters long!");
                return;
            }

            if (!isUsernameValid(username)) {
                
                setAlert("The username can only contain upper and lower case letters of the English alphabet, numbers, low line and dot characters!");
                return;

            }
            
            if (!isEmailValid(email)) {

                setAlert("Email format is not valid!");
                return;

            }

            if (!isPasswordMatch(password, rePassword)) {

                setAlert("Passwords is not match!");
                return;
                
            }

            // fetch data
            const register = async (username, email, password) => {
                try {

                    const result = await postData('auth/register', {username, email, password});
                    if (result === "wrong_request") return setAlert("Wrong request!");
                    if (result === "short_or_long") return setAlert("The username must be between 6 and 12 characters, password must be at least 6 characters long!");
                    if (result === "invalid_username") return setAlert("Invalid username!");
                    if (result === "invalid_email") return setAlert("Invalid Email!");
                    if (result === "username_taken") return setAlert("Username Taken!");
                    if (result === "email_taken") return setAlert("Email Taken!");
                    if (result === "invalid_request") return setAlert("Invalid request!");

                    const refreshToken = result.refreshToken;

                    if (refreshToken) {

                        localStorage.setItem('bgsRToken', refreshToken);
                        return setHaveToken(true);

                    } else return setAlert("Username or passwod or email have error!");

                } catch (error) {
                    console.error(error);
                }
            }

            register(username, email, password);

        }

        return(
            haveToken ? navigate("/dashboard") :
            <>
                <div id="register-box">
                    <div id="window">
                        <p id="window-title">1nject_Us4r.cpp</p>
                        <div id="window-buttons">
                            <div className="window-buttons-style">
                                <span id="window-tab"/>
                            </div>
                            <div className="window-buttons-style">
                                <span id="window-zoom-1"/>
                                <span id="window-zoom-2"/>
                            </div>
                            <div className="window-buttons-style">
                                <span id="window-close-1"/>
                                <span id="window-close-2"/>
                            </div>
                        </div>
                    </div>
                    <p id="register-label"> Register </p>
                    <div id="alert-text">
                        <p>{alert}</p>
                    </div>
                    <div id="register-forms">
                        <div id="register-form-1">
                                <form>
                                    <label> Username </label>
                                    <input type={"text"} onChange={(event) => setUsername(event.target.value)}/>
                                    <label> Email </label>
                                    <input type={"text"} onChange={(event) => setEmail(event.target.value)}/>
                                </form>
                            </div>
                            <div id="register-form-2">
                                <form>
                                    <label> Password </label>
                                    <input type={"password"} onChange={(event) => setPassword(event.target.value)}/>
                                    <label> Confirm Password </label>
                                    <input type={"password"} onChange={(event) => setRePassword(event.target.value)}/>
                                </form>
                            </div>
                        </div>
                    <div id="register-test">
                        <div id="terms">
                            <p onClick={() => setSite("login")}> By clicking Sign Up, you agree to our Terms. </p>
                        </div>
                        <button onClick={() => sendRegister()}> Sign Up </button>
                    </div>
                    <div id="site-text">
                        <p> If you have account, </p>
                        <p id="red-p" onClick={() => setSite("login")}> Login here! </p>
                    </div>
                </div>
            </> 
        );
    }

    return(
        loadState === false ? <SplashScreen /> :
        <>
            <Menu page="Login"/>
            <article id="login">
                {chosedSite === "login" ? LoginBlock() : RegisterBlock()}
            </article>
            <Footer />
        </>
    );
}

export default Login;