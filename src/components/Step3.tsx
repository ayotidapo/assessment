import Select from '../atom/Select';
import Checkbox from '../atom/Checkbox';
import type { IFieldState } from '../useReducers/inputReducer';

interface Props {
  inputs: IFieldState;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onInputBlur: (e: React.ChangeEvent<any>) => void;
  onSubscribe: (e: React.ChangeEvent<any>) => void;
  checked: boolean;
}

const Step3: React.FC<Props> = (props) => {
  const { inputs, checked, onInputChange, onSubscribe, onInputBlur } = props;
  return (
    <>
      <Select
        field={inputs.theme}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <Checkbox
        name="subscribe"
        title="Subscribe to newsletter? "
        onChange={onSubscribe}
        checked={checked}
      />
    </>
  );
};

export default Step3;
