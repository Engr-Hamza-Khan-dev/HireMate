import { Globe, Plus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";

interface Language {
  name: string;
  level: string;
}

const LANGUAGES: Language[] = [
  {
    name: "English",
    level: "Fluent",
  },
  {
    name: "Urdu",
    level: "Native",
  },
  {
    name: "Pashto",
    level: "Conversational",
  },
];

export default function LanguagesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Languages
          </h2>

          <p className="text-sm text-muted-foreground">
            Languages you can communicate in.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Language
        </Button>
      </div>

      {LANGUAGES.map((language) => (
        <div
          key={language.name}
          className="flex items-center justify-between rounded-lg border p-5"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-violet-600" />

            <div>
              <h3 className="font-semibold">
                {language.name}
              </h3>

              <Badge variant="secondary">
                {language.level}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Pencil className="h-4 w-4" />
            </Button>

            <Button size="icon" variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}