import { ReactNode } from "react";

const Spinner = () => (
  <svg
    className="spinner"
    width="65px"
    height="65px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="path"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    ></circle>
  </svg>
);

enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

enum BUTTON_SIZE {
  FULL = 'full'
}

type ButtonProps = {
  children: ReactNode;
  variant?: BUTTON_VARIANT;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'full';
  loading?: boolean;
};

const BACKGROUND_MAP = {
  [BUTTON_VARIANT.PRIMARY]: `bg-blue-400 text-white`,
  [BUTTON_VARIANT.SECONDARY]: `bg-yellow-400 color-white`,
};

const SIZE_MAP = {
  [BUTTON_SIZE.FULL]: "w-full",
};

const Button = ({
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  onClick,
  disabled,
  size = BUTTON_SIZE.FULL,
  loading,
}: ButtonProps) => {
  const backgroundClass = BACKGROUND_MAP[variant];
  const sizeClass = SIZE_MAP[size];
  const disabledClass = disabled ? "bg-gray-200 text-black cursor-not-allowed" : ""
  return (
    <button
      onClick={() => {
        if (loading) return;

        if (onClick)
          onClick();
      }}
      disabled={disabled}
      className={`${backgroundClass} ${sizeClass} ${disabledClass} p-3`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
