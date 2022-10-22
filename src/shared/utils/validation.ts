type classes = Record<string, string>

type Nullable<T> = T | null;

export const checkEmail = (value: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  value,
);

export const isValid = (input: HTMLInputElement) => {
  if (input.id === 'email') {
    return checkEmail(input.value);
  }
  return input.validity.valid;
};

export const getValidationMsg = (input: HTMLInputElement) => input.validationMessage;

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
