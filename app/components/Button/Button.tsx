import styles from "./Button.module.scss";

type ButtonProps = {
	onClick?: () => void;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
	styling?: string;
};

export default function Button({ onClick, children, type = "button", className = "", styling = "standard" }: ButtonProps) {
	return (
		<button onClick={onClick} type={type} className={`${styling === 'standard' ? styles.standard : styles.centralized} ${className}`}>
			{children}
		</button>
	);
}
