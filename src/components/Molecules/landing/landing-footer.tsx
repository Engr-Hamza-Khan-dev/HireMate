import Link from "next/link";
import { BriefcaseIcon, GlobeIcon, MailIcon, LinkIcon, Share2Icon } from "lucide-react";

const FOOTER_LINKS = {
  Product: ["Features", "Templates", "Pricing", "Updates"],
  Resources: ["Blog", "Career Tips", "Resume Examples", "Help Center"],
  Company: ["About Us", "Careers", "Privacy Policy", "Terms of Service"],
  Support: ["Contact Us", "FAQ", "Feedback"],
};

const SOCIAL = [
  { icon: GlobeIcon,   href: "#", label: "Website" },
  { icon: Share2Icon,  href: "#", label: "Twitter / X" },
  { icon: LinkIcon,    href: "#", label: "LinkedIn" },
  { icon: MailIcon,    href: "#", label: "Email" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand col */}
          <div className="col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BriefcaseIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-background">
                HireMate <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-background/60">
              AI-powered tools to help you find the right jobs, build better resumes, and advance your career faster.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/10 text-background/60 no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="mb-3 text-sm font-semibold text-background">{group}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-background/60 no-underline transition-colors hover:text-background"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/40">
          © 2026 HireMate AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
