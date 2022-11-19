import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './ChatPage.scss';
import template from './ChatPage.template';
import {Message} from '../../components/Message';
import camera from '../../assets/images/camera.png';
import {handleValidation} from '../../shared/utils/validation';
import Router from "../../shared/utils/Router";
import ChatController from "../../controllers/ChatController";
import AuthController from "../../controllers/AuthController";
import {ChatData, store} from "../../store/Store";
import {Contact} from "../../components/Contact";
import {avatarUrlGenerator} from "../../shared/utils/avatarUrlGenerator";

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

        const my = new Message({
            text: 'Круто!',
            my: true,
            time: '12:00',
        });

        super({
            ...props,
            children: {
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
    }

    getChats() {
        const { chatList } = store.getState();
        const chats = (chatList as ChatData[]).map((item) => {
            return new Contact({
                name: item.title || 'Den',
                text: '...',
                time: '12:00',
                count: item.unread_count ?? 0,
                src: avatarUrlGenerator(item.avatar),
                events: {
                    click: () => {
                        Router.getInstance().go(`/messenger/?chat_id=${item.id}`);
                    }
                }
            }).content
        })
        const node = this.node.querySelector('div.screen__chats-messages')
        if (node) {
            chats.forEach(chat => node.append(chat))
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
            input.addEventListener('blur', handleValidation);
        }
    }
}