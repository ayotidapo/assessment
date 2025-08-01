import React from 'react';
import Input from '../atom/Input';
import type { IFieldState } from '../useReducers/inputReducer';

interface Props {
  inputs: IFieldState;
  onInputChange: (e: React.ChangeEvent<any>) => void;
  onInputBlur: (e: React.ChangeEvent<any>) => void;
}

const Step1: React.FC<Props> = (props) => {
  const { inputs, onInputChange, onInputBlur } = props;
  return (
    <>
      <Input
        field={inputs.fullName}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      <Input
        field={inputs.email}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
    </>
  );
};

export default Step1;
