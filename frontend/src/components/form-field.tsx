import { Label } from "./ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  id,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
