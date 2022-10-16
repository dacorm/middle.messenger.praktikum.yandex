import RegistrationPage from "./pages/RegistrationPage";
import './main.scss';
import { renderInDom } from "./shared/utils";

const register = new RegistrationPage({})

renderInDom('#root', register);