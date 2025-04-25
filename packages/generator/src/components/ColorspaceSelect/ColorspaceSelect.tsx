import './ColorspaceSelect.scss';

const COLORSPACE_OPTIONS = [
  { label: 'Oklch', value: 'oklch' },
  { label: 'RGB', value: 'rgb' },
  { label: 'P3', value: 'display-p3' },
  { label: 'HSL', value: 'hsl' },
  { label: 'XYZ', value: 'xyz' },
  { label: 'HWB', value: 'hwb' },
  { label: 'Lab', value: 'lab' },
  { label: 'LCH', value: 'lch' },
];

export interface ColorspaceSelect {
  label: string;
  space: string;
  setSpace: (color: string) => void;
}

export default function ColorspaceSelect({ label, space, setSpace }: ColorspaceSelect) {
  return (
    <label className="colorspace-select">
      <span>{label}</span>
      <select
        name="colorspace"
        id="select-colorspace"
        className="colorspace-select__select"
        value={space}
        onChange={e => {
          setSpace(e.target.value);
        }}
      >
        {COLORSPACE_OPTIONS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
