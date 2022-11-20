import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './ChatPage.scss';
import template from './ChatPage.template';
import {Message} from '../../components/Message';
import camera from '../../assets/images/camera.png';
import Router from "../../shared/utils/Router";
import ChatController from "../../controllers/ChatController";
import AuthController from "../../controllers/AuthController";
import {ChatData, store} from "../../store/Store";
import {Contact} from "../../components/Contact";
import {avatarUrlGenerator} from "../../shared/utils/avatarUrlGenerator";
import {Button} from "../../components/Button";
import UserController from "../../controllers/UserController";
import {ProfileData} from "../../shared/interfaces/ProfileData";
import {ws} from "../../index";
import {scrollDown} from "../../shared/utils/scroll";

export default class ChatPage extends Block {
    constructor(props: ComponentProps) {

        const hello = new Message({
            text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила 
            Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL
             — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали
              только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
               никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            time: '11:56',
        });

        const image = new Message({
            image: camera,
            img: true,
            time: '11:56',
        });

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

        const my = new Message({
            text: 'Круто!',
            my: true,
            time: '12:00',
        });

        super({
            ...props,
            children: {
                deleteChat: deleteChat.content,
                addUser: addUser.content,
                deleteUser: deleteUser.content,
                add: addButton.content,
                helloMsg: hello.content,
                imageMsg: image.content,
                myMsg: my.content,
            },
        });

    }

    componentDidMount() {
        ChatController.getChats().then(() => {
            this.getChats();
        }).catch((e) => {
            console.log(e);
        })
        AuthController.fetchUser()
        console.log(store.getState());
    }

    getChats() {
        const { chatList } = store.getState();

        if (!chatList) {
            return this.node.querySelector('div.screen__chats-messages')!.textContent = 'Чаты не найдены';
        }

        const chats = (chatList as ChatData[]).map((item) => {
            const preview = item.last_message !== null ? item.last_message.content : null
            const time = item.last_message !== null ? new Date(item.last_message.time).toLocaleTimeString() : null
            return new Contact({
                name: item.title || 'Den',
                text: preview,
                time: time,
                count: item.unread_count ?? 0,
                src: avatarUrlGenerator(item.avatar),
                events: {
                    click: () => {
                        Router.getInstance().go(`/messenger/?chat_id=${item.id}`);
                        store.set('currentChatId', item.id);
                        ws.connect()
                    }
                }
            }).content
        })
        const node = this.node.querySelector('div.screen__chats-messages')
        if (node) {
            this.node.querySelector('div.screen__chats-messages')!.textContent = '';
            console.log('tut', chats);
            chats.forEach(chat => node.append(chat))
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
                })
            }).catch((e) => {
                alert(e.reason);
            })
        }
    }

    removeChat() {
        const { currentChatId } = store.getState()
        if (currentChatId) {
            ChatController.deleteChat(currentChatId as string).then(() => {
                ChatController.getChats().then(() => {
                    this.getChats();
                }).catch((e) => {
                    alert(e.reason);
                })
            }).catch((e) => {
                alert(e.reason);
            })
        }
    }

    addUserToChat() {
        const user = prompt('Введите логин пользователя');
        const { currentChatId } = store.getState();
        if (user && currentChatId) {
            UserController.findUser(user).then((res) => {
                const userData = (res as unknown as ProfileData[])[0]
                if (userData && userData.id) {
                    ChatController.addUserToChat(currentChatId as number, userData.id).then(() => {
                        alert('Пользователь добавлен');
                    }).catch((e) => {
                        alert(e.reason);
                    })
                }
            })
        }
    }

    removeUserFromChat() {
        const user = prompt('Введите логин пользователя');
        const { currentChatId } = store.getState();
        if (user && currentChatId) {
            UserController.findUser(user).then((res) => {
                const userData = (res as unknown as ProfileData[])[0]
                if (userData && userData.id) {
                    ChatController.removeUserFromChat(currentChatId as number, userData.id).then(() => {
                        alert('Пользователь удален');
                    }).catch((e) => {
                        alert(e.reason);
                    })
                }
            })
        }
    }

    sendMessage(message: string) {
        ws.sendMessage(message);
        console.log('сообщенгие должно отправиться')
        scrollDown();
    }

    checkChatsToGet() {
        if (!this.node.querySelector('div.screen__chats-messages')!.firstChild) {
            this.getChats();
        }
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
            const sendButton: HTMLImageElement = (this.node.querySelector('img.screen__chat-input-send') as HTMLImageElement)

            if (sendButton) {
                sendButton.addEventListener('click', () => {
                    this.sendMessage(input.value);
                    input.value = '';
                    console.log(store.getState());
                })
            }
        }

        const button: HTMLButtonElement = (
            this
                .node
                .querySelector('button.screen__chat-button') as HTMLButtonElement
        )

        if (button) {
            button.addEventListener('click', () => {
                this.node.querySelector('div.popup')!.classList.toggle('popup_active')
            })
        }
    }
}