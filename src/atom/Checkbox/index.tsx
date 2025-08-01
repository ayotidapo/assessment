import './checkbox.scss';

interface Props {
  name: string;
  value?: string;
  error?: string;
  title?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<Props> = (props) => {
  const { title, ...rest } = props;
  return (
    <label className="checkbox_label">
      <input className="hidden" type="checkbox" {...rest} />{' '}
      <span className="mirror" />
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;
