import { HexColorInput, HexColorPicker } from 'react-colorful';

import './ColorInput.scss';

export interface ColorInputProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

export default function ColorInput({ label, color, setColor }: ColorInputProps) {
  const handleChange = (newColor: string) => {
    if (newColor.startsWith('#NaN')) {
      return;
    }

    setColor(newColor);
  };

  return (
    <label className="color-input">
      <span>{label}</span>
      <HexColorInput placeholder="auto" className="color-input__input" color={color} onChange={handleChange} />
      <HexColorPicker className="color-input__picker" color={color} onChange={handleChange} />
    </label>
  );
}
