import arrow from '../../assets/images/right_arrow.svg';
import search from '../../assets/images/search.svg';
import additional from '../../assets/images/additional.svg';
import add from '../../assets/images/add.svg';
import send from '../../assets/images/send.svg';
import avatar from '../../assets/images/Ellipse.png';

export default `div.screen
        div.screen__chats
            div.screen__chats-top
                div.screen__chats-link
                    a.screen__chats-profile-link Профиль
                    img.screen__chats-profile-link-image(src='${arrow}' alt='Стрелка вправо')
                input.screen__chats-input(type='text')
                div.input-placeholder
                    img.input-placeholder__placeholder(src='${search}')
                    p.input-placeholder__text Поиск
                div.screen__chats-messages
                    div(data-props='andrewMessage')
                    div(data-props='clubMy')
                    div(data-props='ilyaNews')
                    div(data-props='vadimActive')
        div.screen__chat
            div.screen__chat-user
                div.screen__chat-user-info
                    img.message__avatar(src='${avatar}', alt='Аватарка пользователя')
                    p.screen__chat-user-username Вадим
                button.screen__chat-button
                    img.screen__chat-button-image(src='${additional}' alt='Дополнительно')
            p.screen__chat-date 19 июня
            div(data-props='helloMsg')
            div(data-props='imageMsg')
            div(data-props='myMsg')
            div.screen__chat-input
                img.screen__chat-input-add(src='${add}' alt='Прикрепить')
                input.screen__chat-input-input(type='text' placeholder='Сообщение' id='message' name='message')
                img.screen__chat-input-send(src='${send}' alt='Отправить сообщение')`