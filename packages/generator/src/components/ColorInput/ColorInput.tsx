import { HexColorInput, HexColorPicker } from 'react-colorful';

import './ColorInput.scss';

export interface ColorInputProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

export default function ColorInput({ label, color, setColor }: ColorInputProps) {
  return (
    <label className="color-input">
      <span>{label}</span>
      <HexColorInput placeholder="auto" className="color-input__input" color={color} onChange={setColor} />
      <HexColorPicker className="color-input__picker" color={color} onChange={setColor} />
    </label>
  );
}
