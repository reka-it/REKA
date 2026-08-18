import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import z from "zod/v3";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import { addEventToProgram } from "~/firebase/firestore";
import { rekaKeys } from "~/firebase/queries/rekaKeys";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/createEvent.module.scss";
import type { Event, RekaDay } from "~/firebase/reka";
import Textarea from "~/components/Textarea/Textarea";

export default function Rekaer() {
	useAuth("admin");
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { year, day } = useParams();

	if (!year || !day) {
		return <p>Mangler år eller dag i URL-en.</p>;
	}

	const eventSchema = z
		.object({
			startHour: z.coerce
				.number()
				.min(0, "Vi kan ikke starte forje dag")
				.max(23, "Vis du vil høyere, kanskje gå til neste dag?"),
			startMin: z.coerce
				.number()
				.min(0, "Endre timen vis du vil lavere")
				.max(59, "Endre timer vis du vil høyere"),
			endHour: z.coerce
				.number()
				.min(0, "Vi kan ikke starte forje dag")
				.max(23, "Vis du vil høyere, kanskje gå til neste dag?"),
			endMin: z.coerce
				.number()
				.min(0, "Endre timen vis du vil lavere")
				.max(59, "Endre timer vis du vil høyere"),
			activity: z
				.string()
				.min(1, "Du kan ikke lage en ingenting activity, hver litt mer kreativ")
				.max(40, "Kanskje holde det litt kortere?"),
			description: z
				.string()
				.min(5, "Ka ska ske?")
				.max(200, "Chill vi vet ka ska ske!"),
		})
		.refine(
			(data) => {
				const start = data.startHour * 60 + data.startMin;
				const end = data.endHour * 60 + data.endMin;
				return end > start;
			},
			{
				message: "Slutt må være etter start",
				path: ["endHour"],
			}
		);

	type EventFormValues = z.infer<typeof eventSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			startMin: 0,
			endMin: 0,
		},
		mode: "onSubmit",
	});

	const {
		mutate: createEvent,
		error: createError,
		isPending,
	} = useMutation<void, Error, Event>({
		mutationFn: (event) => addEventToProgram(year, day as RekaDay, event),
		onSuccess: () => {
			navigate(-1);
			queryClient.invalidateQueries({ queryKey: rekaKeys.program(year) });
		},
	});

	// TODO: replace with your actual mapping from RekaDay -> calendar Date for this `year`.
	// This combines the picked hour/min onto the correct day's date.
	const getBaseDateForDay = (dayValue: string): Date => {
		return new Date(Number(year), 0, 1); // placeholder — swap in real day lookup
	};

	const onSubmit = (data: EventFormValues) => {
		const baseDate = getBaseDateForDay(day);

		const startTime = new Date(baseDate);
		startTime.setHours(data.startHour, data.startMin, 0, 0);

		const endTime = new Date(baseDate);
		endTime.setHours(data.endHour, data.endMin, 0, 0);

		createEvent({
			id: crypto.randomUUID(),
			startTime,
			endTime,
			activity: data.activity,
			description: data.description,
		});
	};

	return (
		<div className={styles.container}>
			<h1>Create Event</h1>
			<h2>{day}</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Input
					label="Aktivitet"
					id="activity"
					type="string"
					{...register("activity")}
					error={errors.activity}
				/>
				<Textarea
					label="Beskrivelse"
					id="description"
					{...register("description")}
					error={errors.description}
				/>
				<Input
					label="Start time (timer)"
					id="startHour"
					type="number"
					min={0}
					max={23}
					{...register("startHour")}
					error={errors.startHour}
				/>
				<Input
					label="Start (minutter)"
					id="startMin"
					type="number"
					min={0}
					max={59}
					{...register("startMin")}
					error={errors.startMin}
				/>
				<Input
					label="Slutt (timer)"
					id="endHour"
					type="number"
					min={0}
					max={23}
					{...register("endHour")}
					error={errors.endHour}
				/>
				<Input
					label="Slutt (minutter)"
					id="endMin"
					type="number"
					min={0}
					max={59}
					{...register("endMin")}
					error={errors.endMin}
				/>
				<p role="alert" className={styles.error}>
					{createError && createError.message}
				</p>
				<Button disabled={isPending} type="submit" className={styles.submit}>
					{isPending ? "Creating Event..." : "Create Event"}
				</Button>
			</form>
		</div>
	);
}
