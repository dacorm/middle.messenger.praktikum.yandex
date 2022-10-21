import './main.scss';
import { renderInDom } from './shared/utils';
import { MainPage } from './pages/MainPage';

const mainPage = new MainPage({});

renderInDom('#root', mainPage);
