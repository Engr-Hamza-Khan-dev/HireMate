import React from "react";

type UserProfileMiniProps = {
  avatar: string;
  name: string;
  email: string;
};

export default function UserProfileMini({
  avatar,
  name,
  email,
}: UserProfileMiniProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}