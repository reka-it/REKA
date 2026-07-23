import { useEffect, useRef, useState } from "react";
import { useAuth, roleLevel } from "~/firebase/useAuth";
import { getDbUsers, updateUserRole } from "~/firebase/firestore";
import type { DbUser, Role } from "~/firebase/user";
import styles from "~/styles/admin/users.module.scss";
import DropDown from "~/components/DropDown/DropDown";

type Row = DbUser & { id: string };

function formatDate(value: DbUser["createdAt"]) {
	const date: Date = typeof (value as any)?.toDate === "function" ? (value as any).toDate() : new Date(value);
	return date.toLocaleDateString();
}

function truncate(text: string, max: number) {
	return (text.length > max ? `${text.slice(0, max).trim()}…` : text);
}

const NAME_MAX = 16;
const EMAIL_MAX = 20;

const ROLE_OPTIONS: Role[] = ["user", "admin", "dev"];

function UserRow({ user: u, onRoleChange }: { user: Row; onRoleChange: (id: string, role: Role) => void }) {
	const { getAccessLevel } = useAuth("admin");
	const [open, setOpen] = useState(false);
	const anchor = useRef(null)

	const canEdit = getAccessLevel() >= roleLevel[u.role];

	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}

	return (
		<tr>
			<td className={styles.name} title={u.name} onClick={() => copy(u.name)}> {truncate(u.name, NAME_MAX)} </td>
			<td className={styles.email} title={u.email} onClick={() => copy(u.name)}> {truncate(u.email, EMAIL_MAX)} </td>
			<td className={`${styles.role} ${!canEdit && styles.disabled}`} title={u.role} onClick={() => canEdit && setOpen(v => !v)} ref={anchor}>
				{u.role}
				<DropDown
					anchorRef={anchor}
					open={open}
					setOpen={setOpen}
					items={ROLE_OPTIONS.slice(0, getAccessLevel())}
					selected={ROLE_OPTIONS.indexOf(u.role)}
					onSelect={(item) => onRoleChange(u.id, item as Role)}
				/>
			</td>
			<td className={styles.hype} title={u.hype.toString()}> {u.hype} </td>
			<td className={styles.date} title={formatDate(u.createdAt)} onClick={() => copy(u.name)}> {formatDate(u.createdAt)} </td>
		</tr>
	);
}

export default function Users() {
	const { user, role } = useAuth("admin");
	const [users, setUsers] = useState<Row[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getDbUsers().then((rows) => {
			setUsers(rows);
			setLoading(false);
		});
	}, []);

	const handleRoleChange = (id: string, role: Role) => {
		setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
		updateUserRole(id, role).catch(console.error);
	};

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<p> loading... </p>
			) : (
				<div className={styles.tableWrapper}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th> Navn </th>
								<th> Email </th>
								<th> Rolle </th>
								<th> Hype </th>
								<th> Dato </th>
							</tr>
						</thead>
						<tbody>
							{users.map((u) => (
								<UserRow key={u.id} user={u} onRoleChange={handleRoleChange} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
