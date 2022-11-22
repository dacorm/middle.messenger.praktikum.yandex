import ProfilePage from './ProfilePage';
import { connect } from '../../store/Store';

const profileWithStore = connect((state) => ({
  user: state.currentUser || '',
}));

export default profileWithStore(ProfilePage);
