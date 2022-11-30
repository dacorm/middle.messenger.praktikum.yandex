import { ProfileData } from '../../shared/interfaces/ProfileData';
import { Http } from '../../shared/utils/Http';
import { ChatData } from '../../shared/interfaces/ChatData';

export default class ChatAPI {
  protected http: Http;

  private baseUrl: string;

  constructor() {
    this.http = new Http();
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  getChatUsers(chatId: string): Promise<ProfileData[]> {
    return this.http.get(`${this.baseUrl}/chats/${chatId}/users`);
  }

  addUserToChat(chatId: number, userId: number): Promise<string> {
    return this.http.put(`${this.baseUrl}/chats/users`, { users: [userId], chatId });
  }

  removeUserFromChat(chatId: number, userId: number): Promise<string> {
    return this.http.delete(`${this.baseUrl}/chats/users`, { users: [userId], chatId });
  }

  create(chatTitle: string): Promise<string> {
    return this.http.post(`${this.baseUrl}/chats`, { title: chatTitle });
  }

  read(): Promise<ChatData[]> {
    return this.http.get(`${this.baseUrl}/chats`);
  }

  delete(chatId: string): Promise<string> {
    return this.http.delete(`${this.baseUrl}/chats`, { chatId });
  }
}
