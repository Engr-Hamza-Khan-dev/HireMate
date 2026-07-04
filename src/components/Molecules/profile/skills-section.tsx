"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
}

export default function SkillsSection({ items, onChange }: Props) {
  const [input, setInput]   = useState("");
  const [adding, setAdding] = useState(false);

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
    }
    setInput("");
    setAdding(false);
  };

  const removeSkill = (skill: string) => onChange(items.filter((s) => s !== skill));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground">Highlight your technical and professional skills.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Skill
          </Button>
        )}
      </div>

      {adding && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-4 bg-accent/30">
          <Input
            autoFocus
            className="w-48"
            placeholder="e.g. GraphQL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSkill();
              if (e.key === "Escape") { setAdding(false); setInput(""); }
            }}
          />
          <Button size="sm" onClick={addSkill} disabled={!input.trim()}>Add</Button>
          <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setInput(""); }}>Cancel</Button>
        </div>
      )}

      <div className="rounded-lg border border-border p-5">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet. Click "Add Skill" to get started.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {items.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm">
                {skill}
                <button
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  className="rounded-full hover:text-destructive transition"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
