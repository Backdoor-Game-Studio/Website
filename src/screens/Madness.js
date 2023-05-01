import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Menu from "./Menu";
import SplashScreen from "./SplashScreen";

import "../styles/Madness.css"
import downloadFile from "../download.txt";

const Madness = () => {

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

    const welcomeText = () => {
      return(
        <div id="welcome-div">
          <div id="welcome-text">
          <h1> Welcome to the Madness download page! </h1>

            <p> Get into your deepest nightmares with Madness horror game! Immerse yourself in a dark and creepy world where nothing is what it seems. 
              Explore locations filled with mystery as fear and despair gradually envelop your mind.

              Madness is a stunning and terrifying survival horror game in which you must make your way through labyrinthine locations that mix reality and horror. 
              Brave the darkness to find the answers hidden in the web of madness.

              Pay attention to every little detail and solve the thrilling puzzles to unravel the mysteries lurking beneath the story.

              Madness delivers a visual and audio experience that will become an everlasting memory. With stunning visuals, realistic sounds and an 
              intangible atmosphere, it's guaranteed to keep you glued to the screen. The night has come... Now there is no escape but the darkness and 
              the madness within.

              Download Madness now and prepare for the most terrifying adventure you've ever undertaken! Be strong, invincible and face your own demons. But beware!
              Madness is on the loose and will not stop until it swallows your very being.

              Dare to take the plunge, if you can bear the burden of anxiety, the choice is yours... or maybe it's Madness.</p>
          </div>
        </div>
      );
    }

    const downloadView = () => {
      return(
        <div id="download-div">
          <h1 id="download-text"> for Windows 10 and 11 </h1>
          <a  id="download-button" download="Game.txt" href={downloadFile}> Download now! </a> 
        </div>
      );
    }

    return(
        loadState === false ? <SplashScreen /> :
        <>
            <Menu page="Madness" />
            <article id="madness">
            {welcomeText()}
            {downloadView()}
            </article>
            <Footer/>
        </>
    );
}

export default Madness;