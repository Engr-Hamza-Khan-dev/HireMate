"use client";

import { useState } from "react";
import { FolderOpen, Plus, Pencil, Trash2, ExternalLink, GitBranch, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/components/Organism/profile";

interface Props {
  items: Project[];
  onChange: (items: Project[]) => void;
}

const EMPTY: Omit<Project, "id"> = { title: "", description: "", technologies: "", github: "", demo: "" };

function ProjectForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = "Save",
}: {
  value: Omit<Project, "id">;
  onChange: (v: Omit<Project, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  const field = (key: keyof typeof EMPTY, label: string, placeholder?: string) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input value={value[key]} onChange={(e) => onChange({ ...value, [key]: e.target.value })} placeholder={placeholder ?? label} />
    </div>
  );
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {field("title",        "Project Title *")}
        {field("technologies", "Technologies", "e.g. React • TypeScript")}
        <div className="space-y-1 sm:col-span-2">{field("description", "Description")}</div>
        {field("github",       "GitHub URL",  "https://github.com/...")}
        {field("demo",         "Live Demo URL", "https://...")}
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.title.trim()} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ProjectsSection({ items, onChange }: Props) {
  const [adding, setAdding]       = useState(false);
  const [draft, setDraft]         = useState<Omit<Project, "id">>(EMPTY);
  const [editId, setEditId]       = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Project, "id">>(EMPTY);

  const handleAdd = () => {
    onChange([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((i) => i.id !== id));

  const startEdit = (item: Project) => {
    setEditId(item.id);
    setEditDraft({ title: item.title, description: item.description, technologies: item.technologies, github: item.github, demo: item.demo });
  };

  const handleEditSave = () => {
    onChange(items.map((i) => i.id === editId ? { ...i, ...editDraft } : i));
    setEditId(null);
  };

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
        <ProjectForm value={draft} onChange={setDraft} onSave={handleAdd} onCancel={() => { setAdding(false); setDraft(EMPTY); }} saveLabel="Add" />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No projects added yet. Click "Add Project" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item.id ? (
          <ProjectForm key={item.id} value={editDraft} onChange={setEditDraft} onSave={handleEditSave} onCancel={() => setEditId(null)} saveLabel="Update" />
        ) : (
          <div key={item.id} className="rounded-lg border border-border p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen className="h-5 w-5 shrink-0 text-primary" />
                <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(item)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} aria-label="Delete" className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            {item.description   && <p className="text-sm text-muted-foreground">{item.description}</p>}
            {item.technologies  && <p className="text-sm font-medium text-foreground">{item.technologies}</p>}
            {(item.github || item.demo) && (
              <div className="flex flex-wrap gap-3">
                {item.github && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={item.github} target="_blank" rel="noopener noreferrer"><GitBranch className="h-4 w-4" />GitHub</a>
                  </Button>
                )}
                {item.demo && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={item.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" />Live Demo</a>
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
