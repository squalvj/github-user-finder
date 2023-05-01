import React, { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const TextInput: React.FC<Props> = ({
  placeholder = "Enter value...",
  value,
  onChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="p-3 bg-[#f2f2f2] border-black-500 border-2 text-xl w-full"
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
