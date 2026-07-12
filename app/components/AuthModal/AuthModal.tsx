import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";
import styles from "./AuthModal.module.scss";

type AuthModalProps = {
	open: boolean;
	setOpen: (v: boolean) => void;
};

export default function AuthModal({ open, setOpen }: AuthModalProps) {
	return (
		<Modal open={open} setOpen={setOpen}>
			<div className={styles.container}>
				<Auth onSucsess={() => setOpen(false)} />
			</div>
		</Modal>
	);
}
