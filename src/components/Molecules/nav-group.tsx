import { NavItem } from "../Atoms/nav-item";
import { NAV_LINKS } from "@/lib/nav-config";

interface NavGroupProps {
  collapsed?: boolean;
}

export function NavGroup({ collapsed = false }: NavGroupProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-1" role="list">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavItem 
              href={link.href} 
              label={link.label} 
              icon={link.icon} 
              collapsed={collapsed}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
