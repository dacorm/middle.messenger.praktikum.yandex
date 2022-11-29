type classes = Record<string, string>

type Nullable<T> = T | null;

export const checkEmail = (value: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  value,
);

export const checkPassword = (value: string) => /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);

// eslint-disable-next-line
export const checkPhone = (value: string) => /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d+)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/.test(value);

export const checkName = (value: string) => /^[A-ZА-Я]{1}[a-zа-я\-]{1,20}$/.test(value);

export const isValid = (input: HTMLInputElement) => {
  if (input.id === 'email') {
    return checkEmail(input.value);
  }
  if (input.id === 'password') {
    return checkPassword(input.value);
  }
  if (input.id === 'phone') {
    return checkPhone(input.value);
  }
  if (input.id === 'first_name' || input.id === 'second_name') {
    return checkName(input.value);
  }
  return input.validity.valid;
};

export const getValidationMsg = (input: HTMLInputElement) => {
  if (input.id === 'password' && !input.validationMessage) {
    return 'Пароль не достаточно надежный';
  }
  if (input.id === 'phone' && !input.validationMessage) {
    return 'Неверный формат';
  }
  if (input.id === 'first_name' && !input.validationMessage) {
    return 'Имя должно начинаться с буквы';
  }
  if (input.id === 'second_name' && !input.validationMessage) {
    return 'Фамилия должна начинаться с буквы';
  }
  return input.validationMessage;
};

export const addClass = (cl: string, el: Nullable<HTMLElement>): void => {
  if (el) el.classList.add(cl);
};

export const removeClass = (cl: string, el: Nullable<HTMLElement>): void => {
  if (el) el.classList.remove(cl);
};

export const setMessage = (msg: string, el?: Nullable<HTMLElement>): void => {
  if (el) el.innerText = msg;
};

export const inputHasValue = (input?: Nullable<HTMLInputElement>): boolean => {
  if (input && input.value) return true;

  return false;
};

export const validate = (classes: classes, input?: Nullable<HTMLInputElement>) => {
  if (input) {
    if (!isValid(input)) {
      addClass(classes.hasError, input);
      setMessage(getValidationMsg(input), input.closest('div')!.querySelector('span'));
    } else {
      removeClass(classes.hasError, input);
      setMessage('', input.closest('div')!.querySelector('span'));
    }
  }
};

export const validateForm = (inputs: NodeListOf<HTMLInputElement>) => {
  const validityArr: boolean[] = [];

  if (inputs) {
    inputs.forEach((input) => {
      validityArr.push(isValid(input));
    });
  }

  return !validityArr.includes(false);
};

export const handleValidation = (e: FocusEvent) => {
  validate({ hasError: 'hasError' }, e.target as HTMLInputElement);
};
