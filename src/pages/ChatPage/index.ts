import ChatPage from './ChatPage';
import { connect } from '../../store/Store';

const chatWithStore = connect((state) => ({
  user: state.currentUser || '',
  chats: state.chatList,
}));

export default chatWithStore(ChatPage);
