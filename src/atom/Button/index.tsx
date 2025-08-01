import './button.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick: (e: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}

const Button: React.FC<Props> = (props) => {
  const { className = '', children, ...rest } = props;
  return (
    <button className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
