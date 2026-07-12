"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SKILLS_QUERY_KEY, fetchSkills, addSkill, deleteSkill } from "@/lib/profile-api";

/** Pull the readable message out of an axios error response */
function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (err && typeof err === "object") {
    // Axios error — try the JSON body first
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    if (data && typeof data === "object") {
      const msg = (data as { message?: string }).message;
      if (msg) return msg;
    }
    // If backend returned HTML (no error middleware), parse the <pre> text
    if (data && typeof data === "string") {
      const match = data.match(/Error:\s*([^\n<]+)/);
      if (match?.[1]) return match[1].trim();
    }
    // Fallback to the JS error message
    const msg = (err as { message?: string }).message;
    if (msg && !msg.startsWith("Request failed")) return msg;
  }
  return fallback;
}

export default function SkillsSection() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);

  const { data: skills = [], isLoading } = useQuery({ queryKey: SKILLS_QUERY_KEY, queryFn: fetchSkills });

  const inv = () => queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });

  const addMut = useMutation({
    mutationFn: (name: string) => addSkill(name),
    onSuccess: () => { inv(); setInput(""); setAdding(false); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const deleteMut = useMutation({
    mutationFn: deleteSkill,
    onSuccess: inv,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) return;
    addMut.mutate(trimmed);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground">Highlight your technical and professional skills.</p>
        </div>
        {!adding && <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Add Skill</Button>}
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
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") { setAdding(false); setInput(""); }
            }}
          />
          <Button size="sm" onClick={handleAdd} disabled={!input.trim() || addMut.isPending}>
            {addMut.isPending ? "Adding…" : "Add"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setInput(""); }}>Cancel</Button>
        </div>
      )}

      <div className="rounded-lg border border-border p-5">
        {isLoading ? (
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-muted animate-pulse" />
            ))}
          </div>
        ) : skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet. Click "Add Skill" to get started.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Badge key={skill._id} variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm">
                {skill.name}
                <button
                  aria-label={`Remove ${skill.name}`}
                  onClick={() => deleteMut.mutate(skill._id)}
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
