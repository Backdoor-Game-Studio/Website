import { useState } from "react";
import Home from "./Home";
import SplashScreen from "./SplashScreen";

const Auth = () => {

    let sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    let [loading, setLoading] = useState(true);

    sleep(3000).then(r => {
        setLoading(false);
    })

    return(     
        loading
        ?
        <SplashScreen />
        :
        <Home />
    );  
}

export default Auth;