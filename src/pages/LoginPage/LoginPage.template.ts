export default `
div.login-form
        form.login-form__container(id='loginForm')
            h2.login-form__title Вход
            input(data-props='loginInput')
            input(data-props='passwordInput')
        div.buttons
            button.form__submit-button(type='submit' form='loginForm') Авторизоваться
            a.login-form__link Нет аккаунта?
`;
