import RegistrationPage from './RegistrationPage';
import '../../../pug-runtime/pug-init';

const chai = require('chai');
chai.use(require('chai-dom'));

describe('Тест компонента RegistrationPage', () => {
  const registrationPage = new RegistrationPage({});

  it('Компонент содержит элемент h2 с названием "Регистрация"', () => {
    chai.expect(registrationPage.content?.querySelector('h2')).to.have.text('Регистрация');
  });

  it('Компонент содержит элемент form с классом register-form__container', () => {
    chai.expect(registrationPage.content?.querySelector('form')).to.have.class('register-form__container');
  });
});
