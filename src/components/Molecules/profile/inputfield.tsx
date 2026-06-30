import { Input } from "@/components/ui/input";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  label,
  placeholder,
  value,
  type = "text",
  disabled = false,
  required = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}