type Props = {
  direction?: 'up' | 'right' | 'down' | 'left';
  color?: string;
};

function Caret({ direction, color }: Props) {
  let rotateValues;
  switch (direction) {
    case 'left':
      rotateValues = 'rotate(-90deg)';
      break;
    case 'right':
      rotateValues = 'rotate(90deg)';
      break;
    case 'down':
      rotateValues = 'rotate(180deg)';
      break;
    case 'up':
      rotateValues = 'rotate(0deg)';
      break;
    default:
      rotateValues = 'rotate(0deg)';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      style={{ transform: rotateValues, fill: color }}
    >
      <path d="M975.3 666.8L535.4 226.9a50.1 50.1 0 00-70.9 0L24.7 666.8a50.1 50.1 0 000 70.9l35.4 35.4a50.1 50.1 0 0070.9 0l369-369 369 369a50.1 50.1 0 0070.9 0l35.4-35.4a50.1 50.1 0 000-70.9z" />
    </svg>
  );
}

export default Caret;
