type classes = Record<string, string>

export const isValid = (input: HTMLInputElement) => input.validity.valid;

export const getValidationMsg = (input: HTMLInputElement) => input.validationMessage;

export const addClass = (cl: string, el: HTMLElement | null): void => {
  if (el) el.classList.add(cl);
};

export const removeClass = (cl: string, el: HTMLElement | null): void => {
  if (el) el.classList.remove(cl);
};

export const setMessage = (msg: string, el?: HTMLElement | null): void => {
  if (el) el.innerText = msg;
};

export const inputHasValue = (input?: HTMLInputElement | null): boolean => {
  if (input && input.value) return true;

  return false;
};

export const validate = (classes: classes, input?: HTMLInputElement | null) => {
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
