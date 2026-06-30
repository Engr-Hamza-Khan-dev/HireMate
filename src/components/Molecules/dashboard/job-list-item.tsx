import React from "react";

type JobListItemProps = {
  logo: React.ReactNode;
  title: string;
  company: string;
  location: string;
  match: string;
};

export default function JobListItem({
  logo,
  title,
  company,
  location,
  match,
}: JobListItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
          {logo}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="text-sm font-semibold text-green-600">{match}</div>
    </div>
  );
}