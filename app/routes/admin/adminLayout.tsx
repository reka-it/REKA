import { Outlet, useLocation, useNavigate } from "react-router";
import Button from "~/components/Button/Button";
import styles from "~/styles/admin/adminLayout.module.scss";
import GrainOverlay from "~/components/GrainOverlay/GrainOverlay";

export default function AdminPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const isActive = (path: string) => location.pathname === path;

	return (
		<main className={styles.page}>
			<GrainOverlay />
			<div className={styles.nav}>
				<span className={styles.return} onClick={() => navigate("/")}>
					back
				</span>
				<h1 className={styles.header} onClick={() => navigate("/admin")}>
					ADMIN
				</h1>
				<div className={styles.pages}>
					<Button
						className={`${styles.pageButton} ${isActive("/admin/users") ? styles.selected : ""}`}
						onClick={() => navigate("/admin/users")}
					>
						Users
					</Button>
					<Button
						className={`${styles.pageButton} ${isActive("/admin/styling") ? styles.selected : ""}`}
						onClick={() => navigate("/admin/styling")}
					>
						Styling
					</Button>
					<Button
						className={`${styles.pageButton} ${isActive("/admin/rekaer") ? styles.selected : ""}`}
						onClick={() => navigate("/admin/rekaer")}
					>
						Rekaer
					</Button>
				</div>
				<h1 className={styles.reka}>
					REKA
				</h1>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</main>
	);
}
