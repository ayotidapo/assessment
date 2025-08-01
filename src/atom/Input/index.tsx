interface Props {
  field: {
    error?: string;
    name: string;
    value: string;
    type: string;
    placeholder?: string;
    isTouched?: boolean;
    id?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  title?: string;
}

const Input: React.FC<Props> = (props) => {
  const { field, title, className = '', ...rest } = props;
  const { error = '', ...restField } = field;

  return (
    <label className={`input_wrapper ${className}`}>
      {title}
      <input
        className={`input ${error ? 'error' : ''}`}
        {...restField}
        {...rest}
      />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </label>
  );
};

export default Input;
