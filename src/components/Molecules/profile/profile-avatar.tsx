"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface ProfileAvatarProps {
  name: string;
  role: string;
  /** Current avatar URL (Cloudinary) or a local object URL for preview */
  image?: string;
  /** Called with the selected File when user picks a new photo */
  onFileSelect?: (file: File) => void;
}

export default function ProfileAvatar({ name, role, image, onFileSelect }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-28 w-28 rounded-full object-cover border-4 border-card shadow"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && onFileSelect) onFileSelect(file);
            // Reset so same file can be re-selected
            e.target.value = "";
          }}
        />

        <Button
          type="button"
          size="icon"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 right-0 rounded-full"
          aria-label="Change profile photo"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
