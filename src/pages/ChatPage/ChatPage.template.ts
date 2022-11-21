import arrow from '../../assets/images/right_arrow.svg';
import search from '../../assets/images/search.svg';
import additional from '../../assets/images/additional.svg';
import add from '../../assets/images/add.svg';
import send from '../../assets/images/send.svg';

export default `div.screen
        div.popup
            button(data-props='deleteChat')
            button(data-props='addUser')
            button(data-props='deleteUser')
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
            button(data-props='add')    
        div.screen__chat
            div.screen__chat-user
                div.screen__chat-user-info
                    img.message__avatar(src='https://avatars.mds.yandex.net/i?id=2d9d96cf73506a0498ed3ae4f5d2da5f-4779391-images-thumbs&ref=rim&n=33&w=150&h=150', alt='Аватарка чата')
                    p.screen__chat-user-username Чат не выбран
                button.screen__chat-button
                    img.screen__chat-button-image(src='${additional}' alt='Дополнительно')
            p.screen__chat-date Чат
            div.messages-container
            div.screen__chat-input
                img.screen__chat-input-add(src='${add}' alt='Прикрепить')
                input.screen__chat-input-input(type='text' placeholder='Сообщение' id='message' name='message' required)
                span.screen__chat-input-span
                img.screen__chat-input-send(src='${send}' alt='Отправить сообщение')`;