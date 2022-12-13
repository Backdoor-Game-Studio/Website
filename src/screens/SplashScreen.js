import { Oval } from "react-loader-spinner";
import { Colors, Size } from "../constants";
const SplashScreen = () => {

    const date = new Date();
    return(
        <>
            <div style={{flex: 1, display:"flex", justifyContent: "center", alignItems: "center", height: "90vh", width: "100vw", backgroundColor: Colors.dark_grey}}>
                <div>
                    <Oval
                        height={Size.h1 + 100}
                        width={Size.h1 + 100}
                        color={Colors.red}
                        secondaryColor={Colors.dark_black}
                    />
                    <h1 style={{flex: 1, display:"flex", justifyContent: "center", alignItems: "center", color: Colors.red, marginTop: "4vh"}}> Loading </h1>
                </div>
            </div>

            <div style={{flex: 1, display:"flex", justifyContent: "center", alignItems: "center", height: "10vh", width: "100vw", backgroundColor: Colors.dark_grey}}>
                <p style={{flex: 1, display:"flex", justifyContent: "center", alignItems: "center", color: Colors.red, marginTop: "4vh"}}>
                    Backdoor Game Studio &copy; {date.getFullYear()}
                </p>
            </div>

        </>
    );
}

export default SplashScreen;