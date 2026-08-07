import type { TextareaHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import styles from "./Textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: FieldError;
	minHeight?: string;
	minWidth?: string;
	maxHeight?: string;
	maxWidth?: string;

}

export default function Textarea({ label, error, id, minHeight = "3rem", minWidth = "12rem", maxHeight = "50vh", maxWidth = "50vw", ...props }: TextareaProps) {
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.field}`}>
				{label &&
					<label htmlFor={id} className={`${styles.label}`}>
						{label}
					</label>
				}
				<textarea id={id} className={styles.area}
					style={{ minHeight, minWidth, maxHeight, maxWidth }}
					{...props}
				/>
			</div>
			<p className={styles.error} role={error ? "alert" : undefined}>
				{error?.message}
			</p>
		</div>
	);
}
