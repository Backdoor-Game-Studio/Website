import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Menu from "./Menu";
import SplashScreen from "./SplashScreen";

import video from "../videos/bgs-intro.mp4"
import poster from '../images/poster.png';

import "../styles/Home.css"

const Home = () => {

    let [loadState, isLoadState] = useState(false);

    useEffect(() => {
      const onPageLoad = () => {
        isLoadState(true);
      };

      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad, false);
        return () => window.removeEventListener('load', onPageLoad);
      }
    }, []);

    const navigate = useNavigate();

    return(
        loadState === false ? <SplashScreen /> :
        <>
            <Menu page="Home"/>
            <article id="home">
                <div className="overlay"/>
                <video id="video" src={video} poster={poster} autoPlay loop muted/>
                <div className="content">
                    <p> Madness </p>
                    <button onClick={() => navigate("/madness")}> Learn more </button>
                </div>
            </article>
            <Footer/>
        </>
    );
}

export default Home;