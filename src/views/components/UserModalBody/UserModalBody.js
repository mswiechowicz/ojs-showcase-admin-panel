import './UserModalBody.scss';
import oView from 'ojs-view';
import oStore from 'ojs-store';
import { o } from 'ojs-core';
import { OButton, OInput } from 'ojs-components';

const LABEL_MAP = {
	lp: 'Lp.',
	name: 'Imię',
	surname: 'Nazwisko',
	email: 'Email',
	age: 'Wiek',
	registered: 'Data rejestracji',
	actions: 'Akcje',
};

const DEFAULT_USER_DATA = {
	name: '',
	surname: '',
	email: '',
	age: '',
	registered: new Date(Date.now()).toISOString().split('T')[0],
};

class UserModalBody extends oView {
	constructor(userData, mainStore, modalInstance, isEdit = false) {
		super(userData);
		this.modalInstance = modalInstance;
		this.mainStore = mainStore;
		this.isEdit = isEdit;
		this.userData = userData;
		this.store = oStore(
			{ ...DEFAULT_USER_DATA, ...this.userData }, this, {
				unobservedFields: Object.keys(DEFAULT_USER_DATA).map(key => key),
			});
	}

	components() {
		this.inputList = Object.keys(this.store).map(key => {
			if (key === 'lp') {
				return;
			}

			const type = key === 'registered' ? 'date' : 'text';

			return new OInput({
				type,
				label: LABEL_MAP[key],
				db: this.store,
				name: key,
			});
		});

		this.saveButton = new OButton({
			type: 'primary-confirm',
			text: 'Zapisz',
			click: () => {
				if (this.isEdit) {
					Object.assign(this.userData, this.store);
				} else {
					const lp = `${this.mainStore.length + 1}.`;
					this.mainStore.push({ lp, ...this.store });
				}

				this.modalInstance.unmount();
			},
		});
		this.cancelButton = new OButton({
			type: 'primary-cancel',
			text: 'Anuluj',
			click: () => this.modalInstance.unmount(),
		});
	}

	build() {
		return o('div').class('form').add(
			this.inputList,
			o('div').class('form__buttons').add(
				this.cancelButton,
				this.saveButton,
			),
		).init();
	}
}

export { UserModalBody };
