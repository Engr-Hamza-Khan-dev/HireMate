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
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}