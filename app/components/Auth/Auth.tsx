import z from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { logIn, signUp } from "~/firebase/auth";

type AuthProps = {
	onSucsess: () => void
};

const authSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Enter a valid email"),
	password: z
		.string()
		.min(6, "Must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function Auth({ onSucsess }: AuthProps) {
	const [pendingAction, setPendingAction] = useState<"login" | "signup" | null>(null);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AuthFormValues>({
		resolver: zodResolver(authSchema),
		defaultValues: { email: "", password: "" },
		mode: "onChange",
	});

	const onLogin = async (data: AuthFormValues) => {
		setPendingAction("login");
		const result = await logIn(data.email, data.password);

		if (!result.success) {
			setError(result.field, { message: result.message });
		} else {
			onSucsess()
		}

		setPendingAction(null);
	};

	const onSignup = async (data: AuthFormValues) => {
		setPendingAction("signup");
		const result = await signUp(data.email, data.password);

		if (!result.success) {
			setError(result.field, { message: result.message });
		} else {
			onSucsess()
		}

		setPendingAction(null);
	};

	const isSubmitting = pendingAction !== null;

	return (
		<form className={styles.form}>
			<div className={styles.field}>
				<label htmlFor="email" className={styles.label}>
					Email
				</label>
				<input className={styles.input}
					id="email"
					type="email"
					autoComplete="email"
					placeholder="reke@rekenett.no"
					{...register("email")}
				/>
				<p className={styles.error} role={errors.email ? "alert" : undefined}>
					{errors.email?.message}
				</p>
			</div>
			<div className={styles.field}>
				<label htmlFor="password" className={styles.label}>
					Password
				</label>
				<input className={styles.input}
					id="password"
					type="password"
					autoComplete="current-password"
					placeholder="reke123"
					{...register("password")}
				/>
				<p className={styles.error} role={errors.password ? "alert" : undefined}>
					{errors.password?.message}
				</p>
			</div>
			{errors.root &&
				<p role="alert" className={styles.error}>
					{errors.root.message}
				</p>
			}
			<div className={styles.actions}>
				<button
					type="button"
					disabled={isSubmitting}
					className={styles.signup}
					onClick={handleSubmit(onSignup)}
				>
					{pendingAction === "signup" ? "Signing up..." : "Sign up"}
				</button>
				<button
					type="button"
					disabled={isSubmitting}
					className={styles.login}
					onClick={handleSubmit(onLogin)}
				>
					{pendingAction === "login" ? "Logging in..." : "Log in"}
				</button>
			</div>
		</form>
	);
}
