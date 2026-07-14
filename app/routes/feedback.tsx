import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Route } from "./+types/admin";
import Page from "~/components/Page/Page";
import Button from "~/components/Button/Button";
import { useAuth } from "~/firebase/useAuth";
import { createFeedback } from "~/firebase/firestore";
import styles from "~/styles/feedback.module.scss"

export function meta({ }: Route.MetaArgs) {
	return [{ title: "REKA FEEDBACK WOWO" }];
}

const feedbackSchema = z.object({
	message: z
		.string()
		.trim()
		.min(5, "Kan du skrive litt mer plz :D")
		.max(2000, "Tror kanskje det er litt mye feedback"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function Feedback() {
	const { account } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<FeedbackForm>({
		resolver: zodResolver(feedbackSchema),
		defaultValues: { message: "" },
	});

	const onSubmit = async (data: FeedbackForm) => {
		await createFeedback(account ?? null, data.message);
		reset();
	};

	return (
		<Page>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1 className={styles.heading}>
					Feedback
				</h1>
				<textarea className={styles.area}
					placeholder="Write here"
					disabled={isSubmitting}
					{...register("message")}
				/>
				{errors.message && (
					<p className={styles.error}>{errors.message.message}</p>
				)}
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
				{isSubmitSuccessful && (
					<p className={styles.success}>Tusen takk :DDDDDDDD</p>
				)}
			</form>
		</Page>
	);
}
