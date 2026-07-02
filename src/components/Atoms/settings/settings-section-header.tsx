type SettingsSectionHeaderProps = {
  title: string;
  description: string;
};

/**
 * Atom: title + description block used at the top of every settings section card.
 */
export function SettingsSectionHeader({
  title,
  description,
}: SettingsSectionHeaderProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
