import React from "react";

type JobListItemProps = {
  logo: React.ReactNode;
  title: string;
  company: string;
  location: string;
  match: string;
};

export default function JobListItem({ logo, title, company, location, match }: JobListItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
          {logo}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{company}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <div className="text-sm font-semibold text-success">{match}</div>
    </div>
  );
}
