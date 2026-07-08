import styles from "./navbar.module.scss";
import Button from "../Button/button";
import { useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.navBar}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}></div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button className={styles.button} type="button" onClick={() => navigate("/earlier")}>
                    Tidligere REKA
                </Button>
                <Button className={styles.button} type="button" onClick={() => navigate("/admin")}>
                    Admin
                </Button>
            </div>
            
        </nav>
    );
}