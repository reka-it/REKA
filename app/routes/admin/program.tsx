import { useNavigate, useParams } from "react-router";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/createReka.module.scss";

export default function Program() {
	useAuth("admin");
	const { year } = useParams();
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<h1>Reka: {year}</h1>
			progrma
			<h1 onClick={() => navigate(-1)}>Back</h1>
		</div>
	);
}
