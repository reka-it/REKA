import styles from "./Button.module.scss";

type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
};

export default function Button({ onClick, children, type, className }: ButtonProps) {
    return (
        <button onClick={onClick} type={type} className={[styles.button, className].filter(Boolean).join(" ")}>
            {children}
        </button>
    );
}