export default `
div.overlay
        form.overlay__popup(id='avatarForm')
            h2.overlay__title Загрузите файл
            label.overlay__label(for='avatar') Выбрать файл на компьютере
                input.overlay__input(type='file', name='avatar' id='avatar')
            button.overlay__button(type='submit' form='avatarForm') Поменять`