import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "~/firebase/useAuth";
import AuthModal from "../AuthModal/AuthModal";
import { useState } from "react";

type NavbarProps = {
	className?: string;
};

export default function Navbar({ className }: NavbarProps) {
	const navigate = useNavigate();
	const { user, hasAccess } = useAuth();
	const [modalOpen, setModalOpen] = useState(false);

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
				<Button className={styles.button} type="button" onClick={() => navigate("/info")}>
					Om oss
				</Button>
				<Button className={styles.button} type="button" onClick={() => navigate("/earlier")}>
					Tidligere
				</Button>
				<Button className={styles.button} type="button" onClick={() => setModalOpen(v => !v)}>
					{user ?
						"Bruker"
						:
						"Sign up / log in"
					}
				</Button>
				{hasAccess("admin") &&
					<Button className={styles.button} type="button" onClick={() => navigate("/admin")}>
						Admin
					</Button>
				}
			</div>
			<AuthModal open={modalOpen} setOpen={setModalOpen} />
		</nav>
	);
}
