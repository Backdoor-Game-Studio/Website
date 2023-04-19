import React from "react";
import { useNavigate } from "react-router-dom"
import { Colors } from "../constants";
import logo from "../images/bgs-logo_1000x1000.png";

import "../styles/Menu.css";

const Menu = (props) => {

    const navigate =  useNavigate();

    const titleAndLogo = () => {
        return (
            <div className="titleAndLogo">
                <img src={logo} alt="logo"/>
                <p> Backdoor Game Studio </p>
            </div> 
        );    
    }

    const home = () => {
        return (
            <li className="menu-li">
                <div className="menuContent" onClick={() => navigate("/")}
                style={{color: props.page === "Home" ? Colors.red : Colors.white}}> Home </div>
            </li>
        );
    }

    const madness = () => {
        return (
            <li className="menu-li">
                <div className="menuContent" onClick={() => navigate("/madness")}
                style={{color: props.page === "Madness" ? Colors.red : Colors.white, fontFamily: "Unutterable"}}> Madness </div>
            </li>
        );
    }

    const login = () => {
        return (
            <li className="menu-li">
                <div className="menuContent" onClick={() => props.page === "Login" ? navigate("/login") : navigate("/dashboard")}
                style={{color: props.page === "Login" ? Colors.red : props.page === "Dashboard" ? Colors.red : Colors.white}}> Account </div>
            </li>
        );
    }

    const mobileButton = () => {

        let active = false;

        const click = () => {

            const menuOverlay = document.getElementsByClassName("menuOverlay")[0];
            const ul = document.getElementsByClassName("overlayUl")[0];
            const menu = document.getElementsByClassName("menuContent");

            const bar1 = document.getElementsByTagName("span")[0];
            const bar2 = document.getElementsByTagName("span")[1];
            const bar3 = document.getElementsByTagName("span")[2];

            if (!active) {

                bar1.setAttribute("id", "bar1-active");
                bar2.setAttribute("id", "bar2-active");
                bar3.setAttribute("id", "bar3-active");

                menuOverlay.setAttribute("id", "menu-active");

                menuOverlay.addEventListener("transitionend", () => {

                    ul.style.display = active ? "flex" : "none";

                    for (let i = menu.length / 2; i < menu.length; i++) {
                        menu[i].style.display = active ? "flex" : "none";
                    }
                });

                active = true;

            } else {

                bar1.setAttribute("id", "bar1-deactive");
                bar2.setAttribute("id", "bar2-deactive");
                bar3.setAttribute("id", "bar3-deactive");

                menuOverlay.setAttribute("id", "menu-deactive");

                menuOverlay.addEventListener("transitionstart", () => {

                    ul.style.display = "flex";

                    for (let i = menu.length / 2; i < menu.length; i++) {
                        menu[i].style.display = "flex";
                    }
                });

                active = false;

            }
        }
        
        return (
                <div onClick={() => click()} className="mobileButton">
                    <span className="menuIcon" />
                    <span className="menuIcon" />
                    <span className="menuIcon" />
                </div>
        );
    }

    const menuOverlay = () => {
        return(
            <div className="menuOverlay">
                <ul className="overlayUl">
                    {home()}
                    {madness()}
                    {login()}
                </ul>
            </div>
        );
    }

    return(
        <header>
            {titleAndLogo()}
            <ul>
                {home()}
                {madness()}
                {login()}
            </ul>
            {mobileButton()}
            {menuOverlay()}
        </header>
    );
}

export default Menu;