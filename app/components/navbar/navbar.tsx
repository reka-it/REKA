import styles from "./navbar.module.scss";
import Button from "./button/button";

export default function Navbar() {
    return (
        <nav className={styles.navBar}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}></div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button className={styles.button} type="button" onClick={() => console.log("Button clicked!")}>
                Tidligere REKA
                </Button>
                <Button className={styles.button} type="button" onClick={() => console.log("Button clicked!")}>
                    Admin
                </Button>
            </div>
            
        </nav>
    );
}