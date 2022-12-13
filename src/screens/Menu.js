import React from "react";
import { useNavigate } from "react-router-dom"
import { Colors, Size } from "../constants";
import logo from "../images/bgs-logo.png";
import "../App.css"

const Menu = (props) => {

    const navigate =  useNavigate();

    const titleAndLogo = () => {
        return (
            <div style={{
                float: "left",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "6vh",
                marginRight: "1vw"
                }}>
                <img src={logo} alt="logo" style={{ height: "6vh" }}/>
                <p
                style={{
                    color: Colors.red,
                    fontSize: Size.h3 + 10,
                }}> Backdoor Game Studio </p>
            </div> 
        );    
    }

    const home = () => {
        return (
            <li style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "6vh",
                marginLeft: "1vw",
                marginRight: "1vw"
                }}>
                <button onClick={() => navigate("/")}
                style={{
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    color: props.page === "Home" ? Colors.red : Colors.white,
                    fontSize: Size.h3,
                    cursor: "pointer"
                }}> Home </button>
            </li>
        );
    }

    const madness = () => {
        return (
            <li style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "6vh",
                marginLeft: "1vw",
                marginRight: "1vw"
                }}>
                <button onClick={() => navigate("/madness")}
                style={{
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    color: props.page === "Madness" ? Colors.red : Colors.white,
                    fontSize: Size.h3,
                    cursor: "pointer"
                }}> Madness </button>
            </li>
        );
    }

    const login = () => {
        return (
            <li style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "6vh",
                marginLeft: "1vw",
                marginRight: "1vw"
                }}>
                <button onClick={() => navigate("/login", { replace: true })}
                style={{
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    color: props.page === "Login" ? Colors.red : Colors.white,
                    fontSize: Size.h3,
                    cursor: "pointer"
                }}> Login </button>
            </li>
        );
    }

    return(
        <header 
        style={{
            //position: "fixed",
            width: "100vw",
            height: "6vh",
            backgroundColor: Colors.light_black
        }}>
            {titleAndLogo()}
            <ul style={{ listStyleType: "none", display: "flex", flexDirection: "row", float: "right" }}>
                {home()}
                {madness()}
                {login()}
            </ul>
        </header>
    );
}

export default Menu;