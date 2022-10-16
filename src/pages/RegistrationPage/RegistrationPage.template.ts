export default `
div.register-form
        form.register-form__container(id='registerForm')
            h2.register-form__title Регистрация
            input(data-props="emailInput")
            input(data-props="loginInput")
            input(data-props="firstNameInput")
            input(data-props="secondNameInput")
            input(data-props="phoneInput")
            input(data-props="passwordInput")
            input(data-props="passwordConfirmInput")
        div.buttons
            button.register-form__submit-button(type='submit' form='registerForm') Зарегистрироваться
            a.register-form__link(href='~static/pages/login/login.pug') Войти`;
