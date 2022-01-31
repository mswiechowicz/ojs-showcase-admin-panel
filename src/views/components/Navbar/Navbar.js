import oView from 'ojs-view';
import { o } from 'ojs-core';
import './Navbar.scss';

class Navbar extends oView {
	build() {
		return o('header').class('nav')
			.add([
				o('div').class('nav__logo'),
				o('div').class('nav__operator')
					.add([
						o('span').text('Witaj, '),
						o('span').text('Maciej Świechowicz'),
					]),
				o('nav').class('nav__menu')
					.add(
						o('div').class('nav-option').add(
							o('p').class('nav-option__name').text('Strona główna'),
						),
						o('div').class('nav-option').add(
							o('p').class('nav-option__name').text('Użytkownicy'),
						),
						o('div').class('nav-option nav-option--logout').add(
							o('p').class('nav-option__name').text('Wyloguj'),
						),
					),
			]).init();
	}
}

export { Navbar };
