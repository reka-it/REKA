import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router";

type NavbarProps = {
    className?: string;
};

export default function Navbar({ className }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className={[styles.navBar, className].filter(Boolean).join(" ")}>
            <div className={styles.logoWrapper}>
                <div onClick={() => navigate("/")} className={styles.logo}></div>
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