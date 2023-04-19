import { Colors } from "../constants";

const Footer = () => {
    const date = new Date();

    return(
        <footer
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "3vh",
                width: "100vw",
                backgroundColor: Colors.light_black,
                color: Colors.red,
                fontSize: "2vh",
                position: "fixed",
                top: "97vh"
            }}>
                <p> Backdoor Game Studio &copy; {date.getFullYear()} </p>
        </footer>
    );
}

export default Footer;