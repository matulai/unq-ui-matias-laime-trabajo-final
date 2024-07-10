import './Button.css';

// eslint-disable-next-line react/prop-types
const Button = ({ children, type, action, key, disabled }) => {
  const styles = {
    difficulty_easy: 'button difficulty-easy',
    difficulty_normal: 'button difficulty-normal',
    difficulty_hard: 'button difficulty-hard',
    difficulty_extreme: 'button difficulty-extreme',
    correct: 'button button-style-correct w20',
    incorrect: 'button button-style-incorrect w20',
    gray_long: 'button button-style-gray w20',
    gray_short: 'button button-style-gray',
  };

  const className = styles[type] || '';

  return (
    <button
      className={className}
      onClick={action}
      key={key}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
