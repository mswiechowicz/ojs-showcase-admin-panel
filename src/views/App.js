import oView from 'ojs-view';
import { oFragment } from 'ojs-core';
import { Navbar } from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import './App.scss';

class App extends oView {
	build() {
		return oFragment(
			new Navbar(),
			new Main(),
			new Footer(),
		).init();
	}
}

export { App };

