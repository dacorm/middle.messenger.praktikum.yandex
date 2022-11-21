import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './ChatPage.scss';
import template from './ChatPage.template';
import { Message } from '../../components/Message';
import Router from '../../shared/utils/Router';
import ChatController from '../../controllers/ChatController';
import AuthController from '../../controllers/AuthController';
import { ChatData, store } from '../../store/Store';
import { Contact } from '../../components/Contact';
import { avatarUrlGenerator } from '../../shared/utils/avatarUrlGenerator';
import { Button } from '../../components/Button';
import UserController from '../../controllers/UserController';
import { ProfileData } from '../../shared/interfaces/ProfileData';
import { ws } from '../../index';
import { scrollDown } from '../../shared/utils/scroll';
import { StoreMessageProps } from '../../shared/interfaces/MessageProps';

export default class ChatPage extends Block {
  constructor(props: ComponentProps) {
    const addButton = new Button({
      child: 'Добавить чат',
      events: {
        click: () => {
          this.addChat();
        },
      },
    });

    const deleteChat = new Button({
      child: 'Удалить чат',
      secondary: true,
      events: {
        click: () => {
          this.removeChat();
        },
      },
    });

    const addUser = new Button({
      child: 'Добавить пользователя',
      secondary: true,
      events: {
        click: () => {
          this.addUserToChat();
        },
      },
    });

    const deleteUser = new Button({
      child: 'Удалить пользователя',
      secondary: true,
      events: {
        click: () => {
          this.addChat();
        },
      },
    });

    super({
      ...props,
      children: {
        deleteChat: deleteChat.content,
        addUser: addUser.content,
        deleteUser: deleteUser.content,
        add: addButton.content,
      },
    });
  }

  componentDidMount() {
    ChatController.getChats().then(() => {
      this.getChats();
    }).catch((e) => {
      console.log(e);
    });
    AuthController.fetchUser();
  }

  checkChatsToGet() {
    if (!this.node.querySelector('div.screen__chats-messages')!.firstChild) {
      this.getChats();
    }
  }

  getChats() {
    const { chatList } = store.getState();

    if (!chatList) {
      return this.node.querySelector('div.screen__chats-messages')!.textContent = 'Чаты не найдены';
    }

    const chats = (chatList as ChatData[]).map((item) => {
      const preview = item.last_message ? item.last_message.content : null;
      const time = item.last_message ? new Date(item.last_message.time).toLocaleTimeString().split('').slice(0, 5)
        .join('') : null;
      return new Contact({
        name: item.title || 'Den',
        messagePreview: preview,
        time,
        count: item.unread_count ?? 0,
        src: avatarUrlGenerator(item.avatar),
        events: {
          click: () => {
            Router.getInstance().go(`/messenger/?chat_id=${item.id}`);
            store.set('currentChatId', item.id);
            ws.connect();
            this.getMessages();
          },
        },
      }).content;
    });
    const node = this.node.querySelector('div.screen__chats-messages');
    if (node) {
      node.textContent = '';
      chats.forEach((chat) => node.append(chat));
    }
  }

  getMessages() {
    const { messageList } = store.getState();

    if (!messageList) {
      return this.node.querySelector('div.messages-container')!.textContent = 'Выберите чат для общения';
    }

    const messages = (messageList as StoreMessageProps[]).map((item) => {
      const time = item.messageDate ? new Date(item.messageDate).toLocaleTimeString().split('').slice(0, 5)
        .join('') : '';

      return new Message({
        text: item.messageText,
        my: item.isMyMessage,
        time,
      }).content;
    });

    const node = this.node.querySelector('div.messages-container');
    if (node) {
      node.textContent = '';
      messages.forEach((message) => node.append(message));
    }
  }

  addChat() {
    const title = prompt('Введите название чата');
    if (title) {
      ChatController.createChat(title).then(() => {
        ChatController.getChats().then(() => {
          this.getChats();
        }).catch((e) => {
          alert(e.reason);
        });
      }).catch((e) => {
        alert(e.reason);
      });
    }
  }

  removeChat() {
    const { currentChatId } = store.getState();
    if (currentChatId) {
      ChatController.deleteChat(currentChatId as string).then(() => {
        ChatController.getChats().then(() => {
          this.getChats();
        }).catch((e) => {
          alert(e.reason);
        });
      }).catch((e) => {
        alert(e.reason);
      });
    }
  }

  addUserToChat() {
    const user = prompt('Введите логин пользователя');
    const { currentChatId } = store.getState();
    if (user && currentChatId) {
      UserController.findUser(user).then((res) => {
        const userData = (res as unknown as ProfileData[])[0];
        if (userData && userData.id) {
          ChatController.addUserToChat(currentChatId as number, userData.id).then(() => {
            alert('Пользователь добавлен');
          }).catch((e) => {
            alert(e.reason);
          });
        }
      });
    }
  }

  getChatTitle() {
    const { chatList, currentChatId } = store.getState();
    const node = this.node.querySelector('p.screen__chat-user-username');

    if (chatList && currentChatId && node) {
      (chatList as ChatData[]).forEach((chat) => {
        if (chat.id === currentChatId) {
          node.textContent = chat.title;
        }
      });
    }
  }

  removeUserFromChat() {
    const user = prompt('Введите логин пользователя');
    const { currentChatId } = store.getState();
    if (user && currentChatId) {
      UserController.findUser(user).then((res) => {
        const userData = (res as unknown as ProfileData[])[0];
        if (userData && userData.id) {
          ChatController.removeUserFromChat(currentChatId as number, userData.id).then(() => {
            alert('Пользователь удален');
          }).catch((e) => {
            alert(e.reason);
          });
        }
      });
    }
  }

  sendMessage(message: string) {
    ws.sendMessage(message);
    scrollDown();
  }

  render() {
    return compile(template)();
  }

  protected customiseComponent() {
    const link: HTMLLinkElement = (
            this
              .node
              .querySelector('a.screen__chats-profile-link') as HTMLLinkElement
    );

    this.getChats();
    this.getChatTitle();
    this.getMessages();

    if (link) {
      link.addEventListener('click', () => {
        Router.getInstance().go('/profile');
      });
    }

    const input = (
            this
              .node
              .querySelector('input.screen__chat-input-input') as HTMLInputElement
    );

    if (input) {
      const sendButton: HTMLImageElement = (this.node.querySelector('img.screen__chat-input-send') as HTMLImageElement);

      if (sendButton) {
        sendButton.addEventListener('click', () => {
          this.sendMessage(input.value);
          input.value = '';
        });
      }
    }

    const button: HTMLButtonElement = (
            this
              .node
              .querySelector('button.screen__chat-button') as HTMLButtonElement
    );

    if (button) {
      button.addEventListener('click', () => {
                this.node.querySelector('div.popup')!.classList.toggle('popup_active');
      });
    }
  }
}
