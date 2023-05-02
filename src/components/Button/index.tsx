import { ReactNode } from "react";
import Spinner from "../Spinner";

enum BUTTON_VARIANT {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

enum BUTTON_SIZE {
  FULL = "full",
}

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof BUTTON_VARIANT;
  onClick?: () => void;
  disabled?: boolean;
  size?: "full";
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const BACKGROUND_MAP = {
  [BUTTON_VARIANT.PRIMARY]: `bg-blue-400 text-white primary`,
  [BUTTON_VARIANT.SECONDARY]: `bg-yellow-400 color-white secondary`,
};

const SIZE_MAP = {
  [BUTTON_SIZE.FULL]: "w-full",
};

const Button = ({
  children,
  variant = "PRIMARY",
  onClick,
  disabled,
  size = BUTTON_SIZE.FULL,
  loading,
  type = "button",
}: ButtonProps) => {
  const backgroundClass = BACKGROUND_MAP[variant];
  const sizeClass = SIZE_MAP[size];
  const disabledClass = disabled
    ? "bg-gray-200 text-black cursor-not-allowed"
    : "";
  return (
    <button
      onClick={() => {
        if (loading) return;

        if (onClick) onClick();
      }}
      type={type}
      disabled={disabled}
      className={`${backgroundClass} ${sizeClass} ${disabledClass} p-3`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
