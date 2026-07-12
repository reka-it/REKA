import z from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../Modal/Modal";
import styles from "./AuthModal.module.scss";
import { useState } from "react";
import { logIn, signUp } from "~/firebase/auth";

type AuthModalProps = {
	open: boolean;
	setOpen: (v: boolean) => void;
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

export default function AuthModal({ open, setOpen }: AuthModalProps) {
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
			console.log("Logged in:", result.user);
			setOpen(false);
		}

		setPendingAction(null);
	};

	const onSignup = async (data: AuthFormValues) => {
		setPendingAction("signup");
		const result = await signUp(data.email, data.password);

		if (!result.success) {
			setError(result.field, { message: result.message });
		} else {
			console.log("Signed up:", result.user);
			setOpen(false);
		}

		setPendingAction(null);
	};

	const isSubmitting = pendingAction !== null;

	return (
		<Modal open={open} setOpen={setOpen}>
			<div className={styles.container}>
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
			</div>
		</Modal>
	);
}
