import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Menu from "./Menu";
import SplashScreen from "./SplashScreen";

import "../styles/Madness.css"

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

    return(
        loadState === false ? <SplashScreen /> :
        <>
            <Menu page="Madness" />
            <article id="madness">
            </article>
            <Footer/>
        </>
    );
}

export default Madness;