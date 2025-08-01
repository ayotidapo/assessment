import { useReducer } from 'react';
import inputReducer, {
  onValidateInputFunc,
  type IFieldState,
} from '../useReducers/inputReducer';

const useFormHook = (fields: IFieldState, step = 1) => {
  const [inputs, inputDispatch] = useReducer(inputReducer, fields);

  const ifError = () => {
    let validatedInput = { ...inputs };

    Object.keys(inputs).forEach((field) => {
      if (validatedInput[field].step === step) {
        validatedInput = onValidateInputFunc(inputs, field);
      }
    });

    const isError = Object.keys(inputs).some(
      (field) => validatedInput[field].error,
    );

    if (isError)
      inputDispatch({
        type: 'VALIDATE_STATE',
        validatedInput,
      });

    return isError;
  };

  const getValues = (): Record<string, any> => {
    return Object.keys(inputs).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: inputs[cur]?.value,
      };
    }, {});
  };

  const resetData = () => {
    inputDispatch({
      type: 'RESET_STATE',
    });
  };

  const onInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e?.target;
    inputDispatch({
      type: 'ON_INPUT_CHANGE',
      name,
      value,
    });
  };

  const onInputBlur = (e: React.ChangeEvent<any>) => {
    const { name } = e?.target;
    inputDispatch({
      type: 'ON_INPUT_BLUR',
      name,
    });
  };

  return { ifError, resetData, getValues, onInputChange, onInputBlur, inputs };
};
export default useFormHook;
