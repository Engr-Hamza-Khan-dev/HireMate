"use client";

import { useState } from "react";
import { Plus, Briefcase, Calendar, MapPin, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import type { Experience } from "@/components/Organism/profile";

interface Props {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

const EMPTY: Omit<Experience, "id"> = { position: "", company: "", location: "", duration: "", description: "" };

function ExperienceForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = "Save",
}: {
  value: Omit<Experience, "id">;
  onChange: (v: Omit<Experience, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  const field = (key: keyof typeof EMPTY) => (
    <Input
      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
      value={value[key]}
      onChange={(e) => onChange({ ...value, [key]: e.target.value })}
    />
  );
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1"><label className="text-xs font-medium text-muted-foreground">Position *</label>{field("position")}</div>
        <div className="space-y-1"><label className="text-xs font-medium text-muted-foreground">Company *</label>{field("company")}</div>
        <div className="space-y-1"><label className="text-xs font-medium text-muted-foreground">Location</label>{field("location")}</div>
        <div className="space-y-1"><label className="text-xs font-medium text-muted-foreground">Duration (e.g. 2020 - Present)</label>{field("duration")}</div>
        <div className="space-y-1 sm:col-span-2"><label className="text-xs font-medium text-muted-foreground">Description</label>{field("description")}</div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.position.trim() || !value.company.trim()} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ExperienceSection({ items, onChange }: Props) {
  const [adding, setAdding]   = useState(false);
  const [draft, setDraft]     = useState<Omit<Experience, "id">>(EMPTY);
  const [editId, setEditId]   = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Experience, "id">>(EMPTY);

  const handleAdd = () => {
    onChange([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((i) => i.id !== id));

  const startEdit = (item: Experience) => {
    setEditId(item.id);
    setEditDraft({ position: item.position, company: item.company, location: item.location, duration: item.duration, description: item.description });
  };

  const handleEditSave = () => {
    onChange(items.map((i) => i.id === editId ? { ...i, ...editDraft } : i));
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Experience</h2>
          <p className="text-sm text-muted-foreground">Manage your professional experience.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Experience
          </Button>
        )}
      </div>

      {adding && (
        <ExperienceForm value={draft} onChange={setDraft} onSave={handleAdd} onCancel={() => { setAdding(false); setDraft(EMPTY); }} saveLabel="Add" />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No experience added yet. Click "Add Experience" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item.id ? (
          <ExperienceForm key={item.id} value={editDraft} onChange={setEditDraft} onSave={handleEditSave} onCancel={() => setEditId(null)} saveLabel="Update" />
        ) : (
          <div key={item.id} className="rounded-lg border border-border p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.position}</h3>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {item.duration && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{item.duration}</span>}
                  {item.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{item.location}</span>}
                </div>
                {item.description && <p className="pt-1 text-sm text-muted-foreground">{item.description}</p>}
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="icon" variant="ghost" onClick={() => startEdit(item)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} aria-label="Delete" className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
