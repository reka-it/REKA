import styles from "./Title.module.scss"

type TitleProps = {
	children?: React.ReactNode,
	className?: string,
}

export default function Title({ children, className }: TitleProps) {
	return (
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<h1 className={styles.title}>
				{children}
			</h1>
		</div>
	)
}
