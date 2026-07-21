import styles from "./Title.module.scss"

type TitleProps = {
	children?: React.ReactNode,
	className?: string,
}

export default function Title({ children, className }: TitleProps) {
	return (
		<div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
			<div className={styles.card}>
				<h5 className={styles.reka}>REKA <span>{new Date().getFullYear()}</span></h5>
				<h1 className={styles.title}>
					{children}
				</h1>
				<h6>MG's årlige festival!</h6>
				
			</div>
		</div>
	)
}
