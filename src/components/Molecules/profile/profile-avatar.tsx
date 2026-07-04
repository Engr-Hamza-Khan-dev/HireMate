import { Camera } from "lucide-react";
import { Button } from "@/components/Atoms/button";

interface ProfileAvatarProps {
  name: string;
  role: string;
  image?: string;
  onChangePhoto?: () => void;
}

export default function ProfileAvatar({ name, role, image, onChangePhoto }: ProfileAvatarProps) {
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
            {name.charAt(0)}
          </div>
        )}
        <Button
          type="button"
          size="icon"
          onClick={onChangePhoto}
          className="absolute bottom-0 right-0 rounded-full"
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
