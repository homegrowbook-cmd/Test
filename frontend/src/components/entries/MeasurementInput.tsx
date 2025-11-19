interface MeasurementInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  type?: 'number' | 'text';
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  help?: string;
}

export default function MeasurementInput({
  label,
  name,
  value,
  onChange,
  unit,
  type = 'number',
  placeholder,
  required = false,
  min,
  max,
  step,
  help,
}: MeasurementInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-600">*</span>}
        {unit && <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">({unit})</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
      />
      {help && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{help}</p>
      )}
    </div>
  );
}
