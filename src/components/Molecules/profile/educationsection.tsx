"use client";

import { useState } from "react";
import { Plus, GraduationCap, Calendar, MapPin, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";
import type { Education } from "@/components/Organism/profile";

interface Props {
  items: Education[];
  onChange: (items: Education[]) => void;
}

const EMPTY: Omit<Education, "id"> = { degree: "", institution: "", location: "", duration: "", description: "" };

function EducationForm({
  value,
  onChange,
  onSave,
  onCancel,
  saveLabel = "Save",
}: {
  value: Omit<Education, "id">;
  onChange: (v: Omit<Education, "id">) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  const field = (key: keyof typeof EMPTY, label: string) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input value={value[key]} onChange={(e) => onChange({ ...value, [key]: e.target.value })} placeholder={label} />
    </div>
  );
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 bg-accent/30">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {field("degree",      "Degree / Qualification *")}
        {field("institution", "Institution *")}
        {field("location",    "Location")}
        {field("duration",    "Duration (e.g. 2016 - 2020)")}
        <div className="space-y-1 sm:col-span-2">{field("description", "Description")}</div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={onSave} disabled={!value.degree.trim() || !value.institution.trim()} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />{saveLabel}
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel} className="gap-1.5">
          <X className="h-3.5 w-3.5" />Cancel
        </Button>
      </div>
    </div>
  );
}

export default function EducationSection({ items, onChange }: Props) {
  const [adding, setAdding]       = useState(false);
  const [draft, setDraft]         = useState<Omit<Education, "id">>(EMPTY);
  const [editId, setEditId]       = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Omit<Education, "id">>(EMPTY);

  const handleAdd = () => {
    onChange([...items, { ...draft, id: crypto.randomUUID() }]);
    setDraft(EMPTY);
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((i) => i.id !== id));

  const startEdit = (item: Education) => {
    setEditId(item.id);
    setEditDraft({ degree: item.degree, institution: item.institution, location: item.location, duration: item.duration, description: item.description });
  };

  const handleEditSave = () => {
    onChange(items.map((i) => i.id === editId ? { ...i, ...editDraft } : i));
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Education</h2>
          <p className="text-sm text-muted-foreground">Manage your educational background.</p>
        </div>
        {!adding && (
          <Button className="gap-2 self-start sm:self-auto" onClick={() => setAdding(true)}>
            <Plus className="h-4 w-4" />Add Education
          </Button>
        )}
      </div>

      {adding && (
        <EducationForm value={draft} onChange={setDraft} onSave={handleAdd} onCancel={() => { setAdding(false); setDraft(EMPTY); }} saveLabel="Add" />
      )}

      {items.length === 0 && !adding && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No education added yet. Click "Add Education" to get started.
        </p>
      )}

      {items.map((item) =>
        editId === item.id ? (
          <EducationForm key={item.id} value={editDraft} onChange={setEditDraft} onSave={handleEditSave} onCancel={() => setEditId(null)} saveLabel="Update" />
        ) : (
          <div key={item.id} className="rounded-lg border border-border p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
                  <h3 className="font-semibold text-foreground">{item.degree}</h3>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{item.institution}</p>
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
