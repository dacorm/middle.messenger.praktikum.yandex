import ChangeAvatarPage from './ChangeAvatarPage';
import {connect} from "../../store/Store";

const avatarWithStore = connect((state) => ({
  user: state.currentUser || '',
}));

export default avatarWithStore(ChangeAvatarPage);
