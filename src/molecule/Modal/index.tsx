import './modal.scss';

interface Props {
  children: React.ReactNode;
  open: boolean;
}

const Modal: React.FC<Props> = ({ children, open }) => {
  if (!open) return null;
  return (
    <div className="modal">
      <section className="modal_content">{children}</section>
    </div>
  );
};

export default Modal;
