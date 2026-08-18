import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { deleteEventFromProgram, getProgram } from "~/firebase/firestore";
import { rekaKeys } from "~/firebase/queries/rekaKeys";
import type { Event, RekaDay } from "~/firebase/reka";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/program.module.scss";

function Row({ event, year, day }: { event: Event, year: string, day: RekaDay }) {
	const queryClient = useQueryClient();

	const { mutate: deleteEvent } = useMutation({
		mutationFn: () => deleteEventFromProgram(year, day, event),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: rekaKeys.program(year) })
		}
	})

	// temp mulighet for å slette events
	return (
		<tr>
			<td className={styles.row} onClick={() => {
				const c = window.confirm("Vil du slette?");
				c && deleteEvent();
			}}>
				<span>
					{event.activity}
				</span>
				<span>
					{event.startTime.getHours()} : {event.startTime.getMinutes()}
					<br />
					<span>
						{event.endTime.getHours()} : {event.endTime.getMinutes()}
					</span>
				</span>
			</td>
		</tr>
	)
}

function AddEvent({ day }: { day: string }) {
	const nav = useNavigate()
	return (
		<tr>
			<td>
				<Button className={styles.addEvent} onClick={() => nav(day)}>
					add event
				</Button>
			</td>
		</tr>
	)
}

export default function Program() {
	useAuth("admin");
	const { year } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const { data: program, isLoading, isError } = useQuery({
		queryKey: rekaKeys.program(year as string),
		queryFn: () => getProgram(year as string),
		enabled: !!year,
	})

	return (
		<div className={styles.container}>
			<h1> Program </h1>
			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th> Fredag </th>
						</tr>
					</thead>
					<tbody>
						{program && program.friday.sort((a, b) => a.startTime.getTime() - b.startTime.getTime()).map((event) => (
							<Row event={event} day="friday" year={year as string} />
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
						{program && program.saturday.sort((a, b) => a.startTime.getTime() - b.startTime.getTime()).map((event) => (
							<Row event={event} day="saturday" year={year as string} />
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
						{program && program.sunday.sort((a, b) => a.startTime.getTime() - b.startTime.getTime()).map((event) => (
							<Row event={event} day="sunday" year={year as string} />
						))}
						<AddEvent day={"sunday"} />
					</tbody>
				</table>
			</div>
		</div>
	);
}
