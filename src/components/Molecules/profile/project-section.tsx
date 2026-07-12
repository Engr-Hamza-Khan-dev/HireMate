"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FolderOpen, Plus, Pencil, Trash2, ExternalLink, GitBranch, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PROJECTS_QUERY_KEY, fetchProjects, addProject, updateProject, deleteProject,
  type Project,
} from "@/lib/profile-api";

type DraftFields = Omit<Project, "_id">;

const EMPTY: DraftFields = { title: "", description: "", githubUrl: "", liveUrl: "" };

function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (err && typeof err === "object") {
    const data = (err as { response?: { data?: unknown } })?.response?.data;
    if (data && typeof data === "object") {
      const msg = (data as { message?: string }).message;
      if (msg) return msg;
    }
    if (data && typeof data === "string") {
      const match = data.match(/Error:\s*([^\n<]+)/);
      if (match?.[1]) return match[1].trim();
    }
    const msg = (err as { message?: string }).message;
    if (msg && !msg.startsWith("Request failed")) return msg;
  }
  return fallback;
}

function ProjectForm({
  value, onChange, onSave, onCancel, saveLabel = "Save", saving = false,
}: {
  value: DraftFields; onChange: (v: DraftFields) => void;
  onSave: () => void; onCancel: () => void; saveLabel?: string; saving?: boolean;
}) {
  const canSave = value.title.trim() && value.description.trim() && value.githubUrl.trim() && value.liveUrl.trim();

  return (
    <div className="rounded-lg border border-border p-5 space-y-4 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Project Title *</Label>
          <Input placeholder="e.g. HireMate" value={value.title}
            onChange={(e) => onChange({ ...value, title: e.target.value })} />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">Description *</Label>
          <Input placeholder="What does this project do?" value={value.description}
            onChange={(e) => onChange({ ...value, description: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">GitHub URL *</Label>
          <Input placeholder="https://github.com/..." value={value.githubUrl}
            onChange={(e) => onChange({ ...value, githubUrl: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">Live Demo URL *</Label>
          <Input placeholder="https://..." value={value.liveUrl}
            onChange={(e) => onChange({ ...value, liveUrl: e.target.value })} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!canSave || saving} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saving ? "Saving…" : saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5" disabled={saving}>
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<DraftFields>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<DraftFields>(EMPTY);

  const { data: items = [], isLoading } = useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: fetchProjects,
  });

  const inv = () => queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });

  const addMut = useMutation({
    mutationFn: addProject,
    onSuccess: () => { inv(); setAdding(false); setDraft(EMPTY); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const updateMut = useMutation({
    mutationFn: updateProject,
    onSuccess: () => { inv(); setEditId(null); },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
  const deleteMut = useMutation({
    mutationFn: deleteProject,
    onSuccess: inv,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  if (isLoading) return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">Showcase your best work.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Project
          </Button>
        )}
      </div>

      {adding && (
        <ProjectForm value={draft} onChange={setDraft}
          onSave={() => addMut.mutate(draft)}
          onCancel={() => { setAdding(false); setDraft(EMPTY); }}
          saveLabel="Add" saving={addMut.isPending}
        />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No projects added yet. Click "Add Project" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item._id ? (
          <ProjectForm
            key={item._id} value={editDraft} onChange={setEditDraft}
            onSave={() => updateMut.mutate({ _id: item._id, ...editDraft })}
            onCancel={() => setEditId(null)}
            saveLabel="Update" saving={updateMut.isPending}
          />
        ) : (
          <div key={item._id} className="rounded-lg border border-border p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen className="h-5 w-5 shrink-0 text-primary" />
                <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" aria-label="Edit"
                  onClick={() => {
                    setEditId(item._id);
                    setEditDraft({ title: item.title, description: item.description, githubUrl: item.githubUrl, liveUrl: item.liveUrl });
                  }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete"
                  className="hover:text-destructive"
                  disabled={deleteMut.isPending}
                  onClick={() => deleteMut.mutate(item._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
            {(item.githubUrl || item.liveUrl) && (
              <div className="flex flex-wrap gap-3">
                {item.githubUrl && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="h-4 w-4" />GitHub
                    </a>
                  </Button>
                )}
                {item.liveUrl && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />Live Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
