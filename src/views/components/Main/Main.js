import oView from 'ojs-view';
import oStore from 'ojs-store';
import { OButton } from 'ojs-components';
import { Modal } from '../../../common/components/Modal/Modal';
import { o } from 'ojs-core';
import './Main.scss';
import { UserTable } from '../UserTable/UserTable';
import { userMapper } from './services/userMapper';
import spinnerSVG from '../../../assets/images/spinner.svg';
import { UserModalBody } from '../UserModalBody/UserModalBody';

class Main extends oView {
	constructor() {
		super({ class: 'container' });
		this.addUserModal = new Modal('Dodaj użytkownika');
		this.store = oStore({
			isLoading: true,
			tableBody: null,
		}, this);

		this.fetchData('https://randomuser.me/api/?results=4')
			.then(({ results }) => {
				this.store.tableBody = userMapper(results);
			})
			.catch(() => {
				this.store.tableBody = [];
			})
			.finally(() => {
				this.store.isLoading = false;
			});
	}

	components() {
		this.newUserButton = new OButton({
			text: 'Dodaj użytkownika',
			type: 'primary-confirm',
			click: () => this.addUserModal.mount(
				new UserModalBody({}, this.store.tableBody, this.addUserModal),
			),
		});

		this.userTable = new UserTable({
			headers: [
				{ title: 'lp', displayTitle: 'Lp.' },
				{ title: 'name', displayTitle: 'Imię' },
				{ title: 'surname', displayTitle: 'Nazwisko' },
				{ title: 'email', displayTitle: 'Email' },
				{ title: 'age', displayTitle: 'Wiek' },
				{ title: 'registered', displayTitle: 'Data rejestracji' },
				{ title: 'actions', displayTitle: 'Akcje' },
			],
			body: this.store.tableBody,
		});
	}

	build() {
		const { isLoading, tableBody } = this.store;
		const showUserTable = !isLoading && Array.isArray(tableBody) && tableBody.length;
		const spinner = o('div').class('spinner').add(
			o('img').attr({ src: spinnerSVG, alt: 'spinner' }),
		).init();

		return o('div').class('userListContainer').add(
			o('div').class('userListContainer__header').add(
				o('h1').text('Lista użytkowników'),
				this.newUserButton,
			),
			isLoading && spinner,
			!showUserTable && !isLoading && o('h3').text('Brak użytkowników'),
			showUserTable && this.userTable,
		).init();
	}
}

export { Main };
