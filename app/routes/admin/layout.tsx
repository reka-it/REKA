import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import Button from "~/components/Button/Button";
import styles from "~/styles/admin/layout.module.scss";
import Page from "~/components/Page/Page";

type Crumb = {
	crumb: string,
	nav: () => void,
}

export default function AdminPage() {
	const [crumbs, setCrumbs] = useState<Crumb[]>([]);
	const location = useLocation();
	const navigate = useNavigate();
	const { year } = useParams();

	function isActive(paths: string[]) {
		return paths.some(
			(path) =>
				location.pathname === path || location.pathname.startsWith(path + "/")
		);
	}

	useEffect(() => {
		const c = location.pathname.split("/").filter(e => e.length > 0);
		const a = [];
		for (let i = 0; i < c.length; i++) {
			a.push({ crumb: c[i], nav: () => navigate(`/${c.slice(0, i + 1).join("/")}`) })
		}
		setCrumbs(a);
	}, [location.pathname])

	return (
		<Page className="style-default">
			<div className={styles.page}>
				<div className={styles.nav}>
					<span className={styles.return} onClick={() => navigate("/")}>
						Tilbake
					</span>
					<h1 className={styles.header} onClick={() => navigate("/admin")}>
						ADMIN
					</h1>
					<div className={styles.pages}>
						<Button
							className={`${styles.pageButton} ${isActive(["/admin/users"]) ? styles.selected : ""}`}
							onClick={() => navigate("/admin/users")}
						>
							Brukere
						</Button>
						<Button
							className={`${styles.pageButton} ${isActive(["/admin/styling"]) ? styles.selected : ""}`}
							onClick={() => navigate("/admin/styling")}
						>
							Styling
						</Button>
						<Button
							className={`${styles.pageButton} ${isActive(["/admin/rekaer"]) ? styles.selected : ""}`}
							onClick={() => navigate("/admin/rekaer")}
						>
							Rekaer {isActive(["/admin/rekaer/create"]) ? "-> create" : !!year ? `-> ${year}` : ""}
						</Button>
					</div>
					<h1 className={styles.reka}>
						REKA
					</h1>
				</div>
				<div className={styles.contentWrapper}>
					<nav className={styles.crumbs}>
						<ol>
							{crumbs && crumbs.map(({ crumb, nav }) => (
								<>
									/
									<li onClick={nav}>
										{crumb}
									</li>
								</>
							))}
						</ol>
					</nav>
					<div
						className={styles.content}
					>
						<Outlet />
					</div>
				</div>
			</div>
		</Page>
	);
}
