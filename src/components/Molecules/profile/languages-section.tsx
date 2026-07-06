"use client";

import { useState } from "react";
import { Globe, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Language } from "@/components/Organism/profile";

interface Props {
  items: Language[];
  onChange: (items: Language[]) => void;
}

const EMPTY: Omit<Language, "id"> = { name: "", level: "" };

const LEVEL_OPTIONS = ["Native", "Fluent", "Advanced", "Intermediate", "Conversational", "Basic"];

function LanguageForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = "Save",
}: {
  value: Omit<Language, "id">;
  onChange: (v: Omit<Language, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Language *</label>
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} placeholder="e.g. Spanish" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Proficiency Level</label>
          <select
            value={value.level}
            onChange={(e) => onChange({ ...value, level: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select level</option>
            {LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.name.trim()} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function LanguagesSection({ items, onChange }: Props) {
  const [adding, setAdding]       = useState(false);
  const [draft, setDraft]         = useState<Omit<Language, "id">>(EMPTY);
  const [editId, setEditId]       = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Language, "id">>(EMPTY);

  const handleAdd = () => {
    onChange([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((i) => i.id !== id));

  const startEdit = (item: Language) => {
    setEditId(item.id);
    setEditDraft({ name: item.name, level: item.level });
  };

  const handleEditSave = () => {
    onChange(items.map((i) => i.id === editId ? { ...i, ...editDraft } : i));
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Languages</h2>
          <p className="text-sm text-muted-foreground">Languages you can communicate in.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Language
          </Button>
        )}
      </div>

      {adding && (
        <LanguageForm value={draft} onChange={setDraft} onSave={handleAdd} onCancel={() => { setAdding(false); setDraft(EMPTY); }} saveLabel="Add" />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No languages added yet. Click "Add Language" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item.id ? (
          <LanguageForm key={item.id} value={editDraft} onChange={setEditDraft} onSave={handleEditSave} onCancel={() => setEditId(null)} saveLabel="Update" />
        ) : (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-5">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                {item.level && <Badge variant="secondary">{item.level}</Badge>}
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => startEdit(item)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)} aria-label="Delete" className="hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
