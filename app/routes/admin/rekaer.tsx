import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Button from "~/components/Button/Button";
import { createReka, deleteReka, getRekaer } from "~/firebase/firestore";
import { rekaKeys } from "~/firebase/queries/rekaKeys";
import type { Reka } from "~/firebase/reka";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/rekaer.module.scss";


function RekaRow({ reka }: { reka: Reka }) {
	const queryClient = useQueryClient();
	const { mutate: deleteRekaMutate, isPending } = useMutation({
		mutationKey: rekaKeys.all,
		mutationFn: deleteReka,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: rekaKeys.all });
		},
		onError: () => {

		},
	})

	return (
		<tr>
			<td className={isPending ? styles.deleting : ""}>
				<span>
					{reka.year}
				</span>
				<button className={styles.delete} onClick={() => {
					const y = window.confirm("Vil du virkelig slette en Reka?");
					if (y) { deleteRekaMutate(reka.year) }
				}}>
					DELETE
				</button>
			</td>
		</tr>
	);
}


export default function Rekaer() {
	const { user, role } = useAuth("admin");
	const navigate = useNavigate();

	const { data: rekaer, isLoading, isError } = useQuery({
		queryKey: rekaKeys.all,
		queryFn: getRekaer,
	})

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<Button onClick={() => navigate("/admin/createReka")}>
					CreateReka
				</Button>
			</div>
			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th> Rekaer </th>
						</tr>
					</thead>
					<tbody>
						{rekaer && rekaer.map((reka) => (
							<RekaRow reka={reka} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
