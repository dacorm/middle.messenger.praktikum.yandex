export default `
div.change
        div.change__avatar
        form.change__form(id='changePassword')
            input(data-props='oldPassword')
            input(data-props='newPassword')
            input(data-props='repeatPassword')
        button.change__button(type='submit' form='changePassword') Сохранить
        div.change__push-back
            a.change__push-back-button(href='~static/index.pug')`;
