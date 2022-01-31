import './UserTable.scss';
import { Table } from '../../../common/components/Table/Table';
import { OButton } from 'ojs-components';
import { Modal } from '../../../common/components/Modal/Modal';
import { UserModalBody } from '../UserModalBody/UserModalBody';

class UserTable extends Table {
	constructor(props) {
		super(props);
		this.editUserModal = new Modal('Edytuj użytkownika');
	}

	additionalButtons(body, index) {
		const removeRowButton = new OButton({
			text: 'Edytuj',
			type: 'primary',
			click: () => this.editUserModal.mount(new UserModalBody(body[index], body, this.editUserModal, true)),
		});
		return [removeRowButton];
	}
}

export { UserTable };
