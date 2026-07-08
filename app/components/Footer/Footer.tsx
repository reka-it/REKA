import styles from "./Footer.module.scss";

type FooterProps = {
    className?: string;
};

export default function Footer({ className }: FooterProps) {
    return (
        <footer className={[styles.footer, className].filter(Boolean).join(" ")}>
            <div className={styles.footerContent}>
                <h3 className={styles.weeb}>REKA WEEBS</h3>
                <p className={styles.weeb}><a href="mailto:sigurd.thornes@gmail.com">Sigurd Thornes</a></p>
                <p className={styles.weeb}><a href="mailto:brage.sebastian.brevik@gmail.com">Brage Sebastian Brevik</a></p>
            </div>
            <div className={styles.footerContent}>
                <h3>E-post</h3>
                <p><a href="mailto:reka.festivalen@gmail.com">reka.festivalen@gmail.com</a></p>
            </div>
            <div className={styles.footerContent}>
                <h3>Org.nummer</h3>
                <p>932 912 627</p>
            </div>
            <div className={styles.footerContent}>
                <h3><a href='https://www.instagram.com/reka_offisiell/'>Instagram</a></h3>
            </div>
        </footer>
    );
}