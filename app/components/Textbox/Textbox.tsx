import styles from "./Textbox.module.scss";

type TextboxProps = {
	children?: React.ReactNode;
	className?: string;
};

// essantaily a simple card
export default function Textbox({
	children,
	className = "",
}: TextboxProps) {
	return (
		<div className={`${styles.textbox} ${className}`}>
			{children}
		</div>
	);
}
