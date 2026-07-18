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
				<img
					src="/reka-logo-3d.svg"
					alt="REKA"
					onClick={() => navigate("/")}
					className={styles.logo}
				/>
			</div>
			<div className={styles.buttons}>
				<Button className={styles.button} type="button" onClick={() => navigate("/earlier")}>
					Tidligere REKA
				</Button>
				<Button className={styles.button} type="button" onClick={() => navigate("/admin")}>
					Admin
				</Button>
				<Button className={styles.button} type="button" onClick={() => navigate("/auth")}>
					Auth
				</Button>
			</div>
		</nav>
	);
}
