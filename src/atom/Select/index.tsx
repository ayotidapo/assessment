interface Props {
  field: {
    name: string;
    value: string;
    placeholder?: string;
    id?: string;
    options?: { label: string; value: string }[];
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  className?: string;
  title?: string;
}

const Select: React.FC<Props> = (props) => {
  const { title, field, className = '', ...rest } = props;
  const { options, ...restField } = field;
  return (
    <label className={`input_wrapper ${className}`}>
      {title}
      <select className={`input`} {...restField} {...rest}>
        {field.placeholder && <option value="">{field.placeholder}</option>}
        {options?.map((option: { label: string; value: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
