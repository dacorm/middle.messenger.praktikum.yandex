import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './ChatPage.scss';
import template from './ChatPage.template';
import {Contact} from '../../components/Contact';
import avatar from '../../assets/images/Ellipse.png';
import {Message} from '../../components/Message';
import camera from '../../assets/images/camera.png';
import {handleValidation} from '../../shared/utils/validation';
import Router from "../../shared/utils/Router";

export default class ChatPage extends Block {
  constructor(props: ComponentProps) {
    const andrew = new Contact({
      src: avatar,
      alt: 'Аватарка',
      name: 'Андрей',
      messagePreview: 'Изображение',
      time: '10:49',
      count: 2,
    });

    const club = new Contact({
      src: avatar,
      alt: 'Аватарка',
      name: 'Киноклуб',
      messagePreview: 'стикер',
      time: '12:00',
      yours: true,
    });

    const ilya = new Contact({
      src: avatar,
      alt: 'Аватарка',
      name: 'Илья',
      messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...',
      time: '15:12',
      count: 4,
    });

    const vadim = new Contact({
      src: avatar,
      alt: 'Аватарка',
      name: 'Вадим',
      messagePreview: 'Круто!',
      time: 'Пт',
      yours: true,
      active: true,
    });

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
        andrewMessage: andrew.content,
        clubMy: club.content,
        ilyaNews: ilya.content,
        vadimActive: vadim.content,
        helloMsg: hello.content,
        imageMsg: image.content,
        myMsg: my.content,
      },
    });
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
        Router.getInstance().go('/settings');
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
