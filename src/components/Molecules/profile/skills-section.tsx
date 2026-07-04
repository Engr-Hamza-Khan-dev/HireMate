"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const INITIAL_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "REST APIs",
  "Git",
  "Prisma",
];

export default function SkillsSection() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setInput("");
    setAdding(false);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Skills</h2>
          <p className="text-sm text-muted-foreground">
            Highlight your technical and professional skills.
          </p>
        </div>

        <Button className="gap-2" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {adding && (
        <div className="flex flex-wrap gap-2 items-center rounded-lg border p-4">
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
          <Button onClick={addSkill} size="sm">Add</Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setAdding(false); setInput(""); }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="rounded-lg border p-5">
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1.5 py-1.5 px-3 text-sm"
              >
                {skill}
                <button
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  className="rounded-full hover:text-red-500 transition"
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
