import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod/v3";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import { createReka } from "~/firebase/firestore";
import { rekaKeys } from "~/firebase/queries/rekaKeys";
import { useAuth } from "~/firebase/useAuth";
import styles from "~/styles/admin/createReka.module.scss";

const rekaSchema = z.object({
	year: z
		.number()
		.int('Det er ingen reka .5')
		.min(1912, 'Du kan ikke lage en reka som er før den første rekaen')
		.max(9999, 'Usikker på om du kan se så langt i framtiden'),
});
type RekaFormValues = z.infer<typeof rekaSchema>;

export default function Rekaer() {
	useAuth("admin");
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RekaFormValues>({
		resolver: zodResolver(rekaSchema),
		defaultValues: { year: new Date().getFullYear() },
		mode: "onSubmit",
	});


	const createRekaMutation = useMutation<{ year: string }, Error, string>({
		mutationFn: createReka,
		onSuccess: (_) => {
			navigate(-1);
			queryClient.invalidateQueries({ queryKey: rekaKeys.all });
		},
	});

	const onSubmit = (data: RekaFormValues) => {
		createRekaMutation.mutate(data.year.toString());
	};

	return (
		<div className={styles.container}>
			<h1>Create Reka</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Input
					label="Year"
					id="year"
					type="number"
					{...register("year", { valueAsNumber: true })}
					error={errors.year}
				/>
				<p role="alert" className={styles.error}>
					{createRekaMutation.error && createRekaMutation.error.message}
				</p>
				<Button disabled={createRekaMutation.isPending} type="submit" className={styles.submit}>
					{createRekaMutation.isPending ? "Creating Reka..." : "Create Reka"}
				</Button>
			</form>
		</div>
	);
}
