import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "~/firebase/useAuth";
import AuthModal from "../AuthModal/AuthModal";
import { useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";

type NavbarProps = {
	className?: string;
};

export default function Navbar({ className }: NavbarProps) {
	const navigate = useNavigate();
	const { user, hasAccess } = useAuth();
	const [modalOpen, setModalOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
	const mobileAnchor = useRef(null);

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
					Hva er REKA
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
			<div className={`${styles.menu} ${mobileDropdownOpen && styles.active}`}
				onClick={() => setMobileDropdownOpen(v => !v)}
				ref={mobileAnchor}
			>
				<span className={`${mobileDropdownOpen && styles.active1}`} />
				<span className={`${mobileDropdownOpen && styles.active3}`} />
				<span className={`${mobileDropdownOpen && styles.active2}`} />
			</div>
			<DropDown
				items={[
					{ id: "/info", display: "Om REKA" },
					{ id: "/earlier", display: "Tidligere" },
					...(hasAccess("admin") ? [{ id: "/admin", display: "Admin" }] : []),
					{ id: "auth", display: user ? "bruker" : "login / signup" },
				]}
				open={mobileDropdownOpen}
				setOpen={setMobileDropdownOpen}
				selected={-1}
				onSelect={(id, _) => {
					if (id == "auth") {
						setModalOpen(true);
						return;
					}
					navigate(id);
				}}
				anchorRef={mobileAnchor}
			/>
			<AuthModal open={modalOpen} setOpen={setModalOpen} />
		</nav>
	);
}
