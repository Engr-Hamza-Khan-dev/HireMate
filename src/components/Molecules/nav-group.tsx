import { NavItem } from "../Atoms/nav-item";
import { NAV_LINKS } from "@/lib/nav-config";

export function NavGroup() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-1" role="list">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavItem href={link.href} label={link.label} icon={link.icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
