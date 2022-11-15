import ChangePasswordPage from './ChangePasswordPage';
import {connect} from "../../store/Store";

const passwordWithStore = connect((state) => ({
  user: state.currentUser || '',
}));

export default passwordWithStore(ChangePasswordPage);
