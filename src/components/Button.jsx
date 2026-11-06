import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'outline-light' | 'text'
  size = 'md',        // 'sm' | 'md' | 'lg'
  to,
  href,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}) {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classNames} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classNames} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
