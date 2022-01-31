import './Footer.scss';
import oView from 'ojs-view';
import { o } from 'ojs-core';

class Footer extends oView {
	build() {
		return o('footer').class('footer').add(
			o('p').class('footer__black').html(`&copy ${new Date().getFullYear()}`),
			o('p').class('footer__blue').text('OrangutanJS. Przykładowy Admin Panel'),
			o('p').class('footer__black').text('Zaprojektowany przez'),
			o('p').class('footer__blue').add(
				o('a').attr({ href: 'https://github.com/mswiechowicz' }).text('Maciej Świechowicz'),
			),
		).init();
	}
}

export { Footer };
