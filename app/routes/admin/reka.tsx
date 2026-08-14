import { useNavigate, useParams } from "react-router";
import Card from "~/components/Card/Card";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/reka.module.scss";

export default function Reka() {
	useAuth("admin");
	const { year } = useParams();
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<h1>Reka: {year}</h1>
			<div className={styles.cards}>
				<Card className={styles.card} onClick={() => navigate("program")}>
					<h1 className={styles.header}>
						Program
					</h1>
					<span className={styles.description}>
						Her kan du redigere reka {year} sitt program
					</span>
				</Card >
				<Card className={styles.card} onClick={() => navigate("program")}>
					<h1 className={styles.header}>
						Program
					</h1>
					<span className={styles.description}>
						Her kan du redigere reka {year} sitt program
					</span>
				</Card >
				<Card className={styles.card} onClick={() => navigate("program")}>
					<h1 className={styles.header}>
						Program
					</h1>
					<span className={styles.description}>
						Her kan du redigere reka {year} sitt program
					</span>
				</Card >
				<Card className={styles.card} onClick={() => navigate("program")}>
					<h1 className={styles.header}>
						Program
					</h1>
					<span className={styles.description}>
						Her kan du redigere reka {year} sitt program
					</span>
				</Card >
			</div>
		</div>
	);
}
