import styles from "./Button.module.scss";

type ButtonProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
	styling?: "standard" | "centralized";
	disabled?: boolean;
	ref?: React.RefObject<HTMLElement | null>
};

export default function Button({ onClick, children, type = "button", className = "", styling = "standard", ref, disabled }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`${styling === 'centralized' ? styles.centralized : styles.standard} ${className}`}
			ref={ref as React.RefObject<HTMLButtonElement>}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
