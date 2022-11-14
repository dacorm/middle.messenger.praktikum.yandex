export default `
div.profile
        div.profile__avatar
        div.profile__container(id='userSettings')
            div.property__container
                p.property__label Почта
                p.property__text(id='email')
            div.property__container
                p.property__label Логин
                p.property__text(id='login')
            div.property__container
                p.property__label Имя
                p.property__text(id='firstName')  
            div.property__container
                p.property__label Фамилия
                p.property__text(id='secondName')
            div.property__container
                p.property__label Имя в чате
                p.property__text(id='displayName')
            div.property__container
                p.property__label Телефон
                p.property__text(id='phone')           
        button(data-props='settings')
        button(data-props='password')
        button(data-props='logout')
        div.settings__push-back
            a.settings__push-back-button`;
