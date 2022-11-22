import UserSettingsPage from './UserSettingsPage';
import { connect } from '../../store/Store';

const userSettingsWithStore = connect((state) => ({
  user: state.currentUser || '',
}));

export default userSettingsWithStore(UserSettingsPage);
