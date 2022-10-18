export default `
div.settings
        div.settings__avatar
        form.settings__form(id='userSettings')
            input(data-props='email')
            input(data-props='login')
            input(data-props='firstName')
            input(data-props='secondName')
            input(data-props='displayName')
            input(data-props='phone')
        button.settings__button(type='submit' form='userSettings') Сохранить
        div.settings__push-back
            a.settings__push-back-button`