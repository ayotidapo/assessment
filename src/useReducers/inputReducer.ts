interface IAction {
  type: string;
  [key: string]: any;
}

export interface IField {
  name: string;
  value: string;
  placeholder: string;
  required: boolean;
  error: string;
  type: string;
  [key: string]: any;
}

export type IFieldState = Record<string, IField | any>;

const inputReducer = (state: IFieldState, action: IAction) => {
  switch (action.type) {
    case 'ON_INPUT_CHANGE':
      return { ...onInputChangeFunc(state, action) };
    case 'ON_INPUT_BLUR':
      return { ...onValidateInputFunc(state, action.name) };
    case 'VALIDATE_STATE':
      return { ...action.validatedInput };
    case 'RESET_STATE':
      return { ...onResetData(state) };
    default:
      return state;
  }
};

export default inputReducer;

const onInputChangeFunc = (state: IFieldState, action: IAction) => {
  const { name, value } = action;
  const validatedState = onValidateInputFunc(state, name);
  validatedState[name].isTouched = true;
  validatedState[name].value = value;

  return validatedState;
};

const onResetData = (state: IFieldState) => {
  const State = { ...state };

  Object.keys(state).forEach((field) => {
    State[field].value = '';
    State[field].error = '';
  });

  return State;
};

export const onValidateInputFunc = (state: IFieldState, name: string) => {
  const State = { ...state };

  const field = State[name];
  const { required, type, value } = field;

  if (required && !value) {
    State[name].error = `Field is required`;
  } else if (
    type === 'email' &&
    !/^[a-zA-Z_0-9][-_a-zA-Z0-9.]*@[a-zA-Z]+\.[a-zA-Z]+/.test(value)
  ) {
    State[name].error = `Invalid email address`;
  } else if (type === 'password' && value.length < 6) {
    State[name].error = `Minimum of 6 characters is required`;
  } else if (type === 'text' && value.length < 3) {
    State[name].error = `Minimum of 3 characters is required`;
  } else {
    State[name].error = '';
  }

  return State;
};
