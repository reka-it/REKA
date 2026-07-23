import Modal, { type ModalProps } from "../Modal/Modal";
import Auth from "../Auth/Auth";
import styles from "./AuthModal.module.scss";

export interface AuthModalProps extends Omit<ModalProps, "children"> { };

export default function AuthModal({ ...modalProps }: AuthModalProps) {
	return (
		<Modal {...modalProps}>
			<div className={styles.container}>
				<Auth onSucsess={() => modalProps.setOpen(false)} className="style-2026" />
			</div>
		</Modal>
	);
}
