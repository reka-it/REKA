import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getProgram } from "~/firebase/firestore";
import { rekaKeys } from "~/firebase/queries/rekaKeys";
import type { Event } from "~/firebase/reka";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/program.module.scss";

function Row({ event }: { event: Event }) {
	return (
		<tr>
			<td>
				{event.activity}
			</td>
		</tr>
	)
}

function AddEvent({ day }: { day: string }) {
	return (
		<tr>
			<td>
				{day}
			</td>
		</tr>
	)
}

export default function Program() {
	useAuth("admin");
	const { year } = useParams();
	const navigate = useNavigate();

	const { data: program, isLoading, isError } = useQuery({
		queryKey: rekaKeys.program(year as string),
		queryFn: () => getProgram(year as string),
		enabled: !!year,
	})

	return (
		<div className={styles.container}>
			<h1>Reka: {year}</h1>
			program
			<h1 onClick={() => navigate(-1)}>Back</h1>
			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th> Fredag </th>
						</tr>
					</thead>
					<tbody>
						{program && program.friday.map((event) => (
							<Row event={event} />
						))}
						<AddEvent day={"friday"} />
					</tbody>
				</table>
				<table className={styles.table}>
					<thead>
						<tr>
							<th> Lørdag </th>
						</tr>
					</thead>
					<tbody>
						{program && program.saturday.map((event) => (
							<Row event={event} />
						))}
						<AddEvent day={"saturday"} />
					</tbody>
				</table>
				<table className={styles.table}>
					<thead>
						<tr>
							<th> Søndag </th>
						</tr>
					</thead>
					<tbody>
						{program && program.sunday.map((event) => (
							<Row event={event} />
						))}
						<AddEvent day={"sunday"} />
					</tbody>
				</table>
			</div>
		</div>
	);
}
