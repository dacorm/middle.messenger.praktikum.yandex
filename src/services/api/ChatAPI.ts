import { ProfileData } from '../../shared/interfaces/ProfileData';
import { Http } from '../../shared/utils/Http';
import { ChatData } from '../../shared/interfaces/ChatData';

export default class ChatAPI {
  protected http: Http;

  constructor() {
    this.http = new Http();
  }

  getChatUsers(chatId: string): Promise<ProfileData[]> {
    return this.http.get(`/chats/${chatId}/users`);
  }

  addUserToChat(chatId: number, userId: number): Promise<string> {
    return this.http.put('/chats/users', { users: [userId], chatId });
  }

  removeUserFromChat(chatId: number, userId: number): Promise<string> {
    return this.http.delete('/chats/users', { users: [userId], chatId });
  }

  create(chatTitle: string): Promise<string> {
    return this.http.post('/chats', { title: chatTitle });
  }

  read(): Promise<ChatData[]> {
    return this.http.get('/chats');
  }

  delete(chatId: string): Promise<string> {
    return this.http.delete('/chats', { chatId });
  }
}
