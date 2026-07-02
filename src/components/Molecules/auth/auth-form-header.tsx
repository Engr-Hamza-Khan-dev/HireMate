type AuthFormHeaderProps = {
  title: string;
  subtitle: string;
};

/**
 * Molecule: page-level heading + subtitle for auth forms.
 */
export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
