import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: FieldError;
}

export default function Input({ label, error, id, ...props }: InputProps) {
	return (
		<div className={styles.container}>
			<div className={styles.field}>
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
				<input id={id} className={styles.input} {...props} />
			</div>
			<p className={styles.error} role={error ? "alert" : undefined}>
				{error?.message}
			</p>
		</div>
	);
}
