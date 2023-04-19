import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { BiCheck, BiExit, BiPencil, BiUser, BiX } from 'react-icons/bi';

import { getData, postData } from "../Database";
import SplashScreen from "./SplashScreen";
import Footer from "./Footer";
import Menu from "./Menu";
import { Colors } from "../constants";

import "../styles/Dashboard.css"
import flaslight_png from "../images/flashlight.png";
import key_png from "../images/key.png";
import coin_png from "../images/coin.png";

const Dashboard = () => {

    const navigate = useNavigate();

    let [loadState, isLoadState] = useState(false);
    let [saveDataArray, setSaveDataArray] = useState("Loading");
    let [userInfoArray, setUserInfoArray] = useState("Loading");

    useEffect(() => {

        const refreshToken = localStorage.getItem("bgsRToken");

        const getSaves = async (token) => {
            const result = await getData("saves", token);
            const data = result;

            if (data !== "not_have_saves") {
                const saveData = Object.keys(data);
                let collect = [];
                for (let i = 0; i < saveData.length; i++) {
                    const key = saveData[i];
                    collect.push(JSON.parse(data[key].data));
                }
                setSaveDataArray(collect);       
            } else setSaveDataArray("not_have_saves");
        }

        const getUserInfo = async (token) => {
            const result = await getData("userinfo", token);
            const data = result;
            
            if (data !== "not_valid_user") setUserInfoArray(data[0]);
            else setUserInfoArray("not_valid_user");
        }

        const getToken =  async () => {
            if (refreshToken) {
                const result = await postData("token", {token: refreshToken});
                const token = result.accessToken;

                if (!token) {
                    localStorage.removeItem("bgsRToken");
                    return navigate("/login");
                } else {
                    getSaves(token);
                    getUserInfo(token);
                }
            } else return navigate("/login");
        }

        const onPageLoad = () => {

            getToken();
            isLoadState(true);
            
        };
        
        if (document.readyState === 'complete') {

            onPageLoad();
        
        } else {

            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);

        }

    }, []);


    const loadCard = (id) => {
        return(
            <div key={id} className="loadcard">
                <Oval height={"5em"} width={"5em"} color={Colors.red} secondaryColor={Colors.dark_black}/>
            </div>
        );
    }

    const viewSave = (number) => {
        const getSaveData = {
            "name": "Loading",
            "utc": "Loading",
            "date": "Loading",
            "time": "Loading",
            "map": "Loading",
            "flashlight": "Loading",
            "key": "Loading",
            "coin": "Loading"
        }

        if (saveDataArray !== "not_have_saves") {
            if (saveDataArray[number].Save !== undefined) {
                getSaveData.name = saveDataArray[number].Save.name;
                getSaveData.utc = saveDataArray[number].Save.utc;
                getSaveData.date = saveDataArray[number].Save.date;
                getSaveData.time = saveDataArray[number].Save.time;
                getSaveData.map = saveDataArray[number].Position.map;

                getSaveData.flashlight = saveDataArray[number].Items.flashlight;
                getSaveData.key = saveDataArray[number].Items.key;
                getSaveData.coin = saveDataArray[number].Items.coin;
            }       
        }

        return(
            getSaveData.name === "Loading" ? loadCard(number) :
            <div key={number} className="savecard">
                <div id="dwindow">
                        <div id="dwindow-buttons">
                            <div className="dwindow-buttons-style">
                                <p>Delete</p>
                            </div>
                        </div>
                </div>
                <div className="savedata">
                    <div className="savedata-head">
                        <p className="savedata-head-name"> { getSaveData.name } </p>
                        <p className="savedata-head-time"> { `(UTC${getSaveData.utc}) ${getSaveData.date} ${getSaveData.time}` } </p>
                        <div className="savedata-head-bar">
                            <div className="savedata-head-bar-progress" style={{width: ( `${getSaveData.map * 33.33}%` )}}>
                                <p className="savedata-head-map"> { `Map ${getSaveData.map}/3` } </p>
                            </div>
                        </div>
                    </div>
                    <div className="savedata-body">
                        <div className="savedata-body-item">

                            { !getSaveData.flashlight ?
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img not_have" src={flaslight_png} alt={"flashlight"}/>
                            </div> :
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img" src={flaslight_png} alt={"flashlight"}/>
                                <p>{ `power: ${getSaveData.flashlight.power}` }</p>
                                <p>{ `battery: ${getSaveData.flashlight.batterylevel}` }</p>
                            </div>}
                        </div>

                        <div className="savedata-body-item">
                            {!getSaveData.key ?
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img not_have" src={key_png} alt={"key"}/>
                            </div> :
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img" src={key_png} alt={"key"}/>
                                <p>{ `use: ${getSaveData.key.use}` }</p>
                            </div>}
                        </div>

                        <div className="savedata-body-item">
                            {!getSaveData.coin ?
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img not_have" src={coin_png} alt={"coin"}/>
                            </div> :
                            <div className="savedata-body-item-con">
                                <img className="savedata-body-img" src={coin_png} alt={"coin"}/>
                                <p>{ `use: ${getSaveData.coin.use}` }</p>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const emptyCard = (id) => {
        return(
            <div key={id} className="emptycard">
                <p>Empty</p>
            </div>
        );
    }

    const cardList = () => {
        let haveData = false; 
        let cards = []

        if (saveDataArray !== "not_have_saves") {
            haveData = true;
            for (let i = 0; i < saveDataArray.length && i < 5; i++) {
                cards.push(viewSave(i));
            }
        }

        if (haveData && saveDataArray.length < 5) {
            for (let i = 0; i < 5 - saveDataArray.length; i++) {
                cards.push(emptyCard("e" + i))
            }
        }

        if (!haveData) {
            for (let i = 0; i < 5; i++) {
                cards.push(emptyCard("e" + i))
            }
        }

        return cards;
    }

    const loadUser = () => {
        return(
            <div id="loaduser">
                <Oval height={"2em"} width={"2em"} color={Colors.red} secondaryColor={Colors.dark_black}/>
            </div> 
        );
    }

    let[username, setUsername] = useState("");

    const viewUser = () => {
        const getUserData = {
            "username": "Loading",
            "email": "Loading"
        }

        if (userInfoArray !== "not_valid_user") {
            getUserData.username = userInfoArray.username;
            getUserData.email = userInfoArray.email;
        }

        return (
            userInfoArray === "Loading" ? loadUser() :
            <div id="user">
                <div id="user-panel">
                    <div id="user-icon">
                        <div id="user-icon-plate">
                            <BiUser />
                        </div>
                    </div>
                    <div id="user-data">
                        <div id="user-username">
                        <input type="text" id="user-username-change"
                            value={username === "" ? getUserData.username : username}
                            style={{width: (username === "" ? getUserData.username.length + 1 : username.length + 1) + "ch" }}
                            onChange={(event) => {setUsername(event.target.value)}} />
                        {username !== getUserData.username && username !== "" ?
                            <>
                            <button className="user-username-check"> <BiCheck /> </button>
                            <button className="user-username-check"> <BiX /> </button>
                            </> : <></>}
                        </div>
                        <p id="user-email">{getUserData.email} <BiPencil /></p>
                    </div>
                </div>
                <div id="user-logout">
                    <button id="user-logout-button">
                        <p id="user-logout-button-text">Log out</p>
                        <BiExit/>
                    </button>
                </div>
            </div>
        );
    }

    return(
        !loadState ? <SplashScreen /> :
        <>
        <Menu page="Dashboard"/>
            <article id="dashboard">
                <div id="userinfo">
                    {viewUser()}
                </div>
                <div id="cards">
                    {cardList()}
                </div>
            </article>
        <Footer />
        </>
    );
}

export default Dashboard;